type FormatOptions = {
  prefix?: string
  decimals?: number
  suffix?: string
  isPercentage?: boolean
  isPercentagePoint?: boolean
  useThousandSeparator?: boolean
}

/** 数字格式化正则 */
export const FormatNumberReg = /^(?<prefix>[^,.\d]*)(?<integer>,)?(?<decimals>\.\df)?(?<suffix>[^,.\d]*)$/

function parseTemplate(template: string): FormatOptions {
  const options: FormatOptions = {}
  const match = template.match(FormatNumberReg)

  if (match && match.groups) {
    options.prefix = match.groups.prefix || ''
    options.decimals = match.groups.decimals !== undefined ? parseInt(match.groups.decimals[1]) : undefined
    options.suffix = match.groups.suffix || ''
    options.isPercentage = options.suffix === '%'
    options.isPercentagePoint = options.suffix.toLowerCase() === 'pp'
    options.useThousandSeparator = !!match.groups.integer
  }

  return options
}

export const IS_VALID_STRING2NUMBER_REGEXP = /^[+-]?(\d+(\.\d*)?|\.\d+)([eE][+-]?\d+)?$/

/**
 * 按模板格式化数字，支持前后缀、小数位、千分位、百分比和中文量级。
 * @param number 待格式化的数字或数字字符串
 * @param template 格式模板，例如 `,.2f元`、`.1f%`
 * @param skipChineseTransform 是否跳过“万/亿”等中文量级转换
 */
export function formatNumber(
  number: number | string,
  template: string | undefined,
  skipChineseTransform: boolean = false,
): string {
  if (number == null || number === '' || Number.isNaN(number)) {
    return '-'
  }
  if ((typeof number === 'string' && !IS_VALID_STRING2NUMBER_REGEXP.test(number)) || !template) {
    return number.toString()
  }

  const { prefix, decimals, suffix, useThousandSeparator, isPercentage, isPercentagePoint } = parseTemplate(template)

  // If formatting as percentage, multiply the number by 100.
  const formattedNumber = isPercentage || isPercentagePoint ? +number * 100 : +number

  let result = formatNumberWithChineseUnit({
    originNum: formattedNumber,
    decimals,
    suffix,
    useThousandSeparator,
    skipChineseTransform,
  })

  if (useThousandSeparator) {
    result = thousandSeparateNum(result)
  }

  return `${prefix || ''}${result}`
}

/**
 * 将数字格式化为带中文量级的字符串。
 * @param originNum number 类型的数值
 * @param decimals 保留小数位数
 * @param suffix 单位后缀
 * @param useSignificantDigits decimals 存在时，保留 decimals 位有效数字
 * @param useThousandSeparator 是否使用千分位分隔符
 * @param skipChineseTransform 是否跳过中文量级转换
 * @returns 带有单位的数值 万 千万 亿
 */
export function formatNumberWithChineseUnit({
  originNum,
  decimals,
  suffix,
  useSignificantDigits = false,
  useThousandSeparator = false,
  skipChineseTransform = false,
}: {
  originNum: number
  decimals?: number
  suffix?: string
  useSignificantDigits?: boolean
  useThousandSeparator?: boolean
  skipChineseTransform?: boolean
}): string {
  if (typeof originNum !== 'number' || Number.isNaN(originNum)) {
    return originNum + ''
  }
  const flag = originNum >= 0 ? 1 : -1
  const num = Math.abs(originNum)
  const newSuffix = suffix || ''
  const magnitude = ['十', '百', '千', '万', '亿']

  const format = (num: number): string => {
    if (Number.isInteger(num)) {
      return (flag * num).toString()
    }
    if (decimals !== undefined) {
      if (useSignificantDigits) {
        return roundToSignificantDigits(flag * num, decimals ?? 2)
      } else {
        return roundToFixed(flag * num, decimals ?? 2)
      }
    }
    return flag * num + ''
  }

  const isMagnitudeSuffix = newSuffix && magnitude.some((item) => newSuffix.indexOf(item) > -1)
  // 增加带千分位、后缀有百分号，带skipChineseTransform参数时都不加中文量级
  if (isMagnitudeSuffix || skipChineseTransform || newSuffix.includes('%') || useThousandSeparator) {
    // 如果有量级,或者是百分比, 或者有千分位分隔符则直接带上后缀返回
    return format(num) + newSuffix
  }

  const units = [
    { value: 1e8, unit: '亿' + newSuffix },
    { value: 1e4, unit: '万' + newSuffix },
  ]

  for (const { value, unit } of units) {
    if (num >= value && suffix !== '% ') {
      return roundToFixed(flag * (num / value), decimals ?? 2) + unit
    }
  }
  return format(num) + newSuffix
}

/** 将数字或可转数字的值格式化为最多两位小数的千分位字符串。 */
export const formatThousands = (value: unknown) => {
  if (value == null || value === '') return '-'

  const formatNumberValue = (num: number) =>
    num.toLocaleString('en-US', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    })

  if (typeof value === 'number') {
    return formatNumberValue(value)
  }

  if (typeof value === 'string') {
    const trimmed = value.trim()
    if (!trimmed) return '-'

    const numericLike = /^-?\d+(?:\.\d+)?$/.test(trimmed)
    const hasLeadingZero = trimmed.startsWith('0') && !trimmed.startsWith('0.') && trimmed.length > 1

    if (numericLike && !hasLeadingZero) {
      const parsed = Number(trimmed)
      if (Number.isFinite(parsed)) {
        return formatNumberValue(parsed)
      }
    }
    return value
  }

  const num = Number(value)
  if (!Number.isFinite(num)) return String(value)

  return formatNumberValue(num)
}

function thousandSeparateNum(num: string) {
  const parts = num.split('.')
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  return parts.join('.')
}

/**
 * 四舍五入指定小数位数，并返回格式化字符串[标准四舍五入，非银行家舍入法]
 *
 * @param value - 需要进行四舍五入的数值
 * @param decimalPlaces - 需要保留的小数位数
 * @returns 格式化后的字符串，保留指定小数位数
 */
function roundToFixed(value: number, decimalPlaces: number): string {
  const factor = 10 ** decimalPlaces
  return (Math.round(value * factor) / factor).toFixed(decimalPlaces)
}

function roundToSignificantDigits(value: number, decimalPlaces: number): string {
  const result = Number(value.toPrecision(decimalPlaces))
  return result.toLocaleString('en-US', {
    useGrouping: false,
    maximumSignificantDigits: decimalPlaces,
  })
}

/** 判断数字格式模板是否符合当前 formatter 支持的语法。 */
export function isValidFormatTemplate(formatTemplate: string): boolean {
  if (formatTemplate === '%') {
    return false
  }
  const regex = /^[^\d]*(,?)(\.\df)?(%.*)?$/
  return regex.test(formatTemplate)
}
