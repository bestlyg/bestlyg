/** 正则 手机号 */
export const REG_PHONE = /^1([358][0-9]|4[579]|66|7[0135678]|9[189])\d{8}$/;
export const isPhoneNumber = (str: string) => REG_PHONE.test(str);

/** 正则 身份证 */
export const REG_IDCARD =
  /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/;
export const isIdCard = (idcard: string) => REG_IDCARD.test(idcard);
