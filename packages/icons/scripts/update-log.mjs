import 'zx/globals'
import url from 'node:url'
import path from 'node:path'
import dayjs from 'dayjs'
import consola from 'consola'

export const resolve = (...p) => path.resolve(path.dirname(url.fileURLToPath(import.meta.url)), '..', ...p)

const MD_PATH = resolve('README.md')
const today = dayjs().format('YYYY.MM.DD')
const SORT_KEY_LIST = ['D', 'M', 'A']

async function gitDiff() {
  const arr = (await $`git status -s`)
    .toString()
    .split('\n')
    .filter(Boolean)
    .map((line) =>
      line
        .split(' ')
        .filter(Boolean)
        .map((v) => v.replace('??', 'A')),
    )
    .filter(([, file]) => !(file == 'package.json' || file.includes('index.tsx')))
    .sort((l1, l2) => {
      return SORT_KEY_LIST.indexOf(l1[0]) - SORT_KEY_LIST.indexOf(l2[0])
    })
  return arr.map((item) => `- ${item[0]} ${item[1]}`).join('\n')
}

async function main() {
  const diffLog = await gitDiff()
  const mdContent = await fs.readFile(MD_PATH, 'utf8')
  consola.log('==> Update')
  consola.log(diffLog)
  await fs.writeFile(MD_PATH, mdContent.replace(`## Timeline`, `## Timeline\n\n### ${today}\n\n${diffLog}`))
  consola.success('update success.')
}

main().catch((err) => {
  console.error(err)
})
