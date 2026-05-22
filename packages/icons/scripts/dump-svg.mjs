import 'zx/globals'
import url from 'node:url'
import path from 'node:path'
import consola from 'consola'
import * as changeCase from 'change-case'

export const resolve = (...p) => path.resolve(path.dirname(url.fileURLToPath(import.meta.url)), '..', ...p)

const SVG_DIR = argv.p ?? resolve('svg')
const DUMP_DIR = resolve('src', 'svg')
function createExportContent(name) {
  return `export * from './${name}'`
}
const indexFileList = [createExportContent('svg-icon.js')]

async function dumpSvg(name) {
  const svgFilePath = resolve(SVG_DIR, name)
  const suffix = path.extname(name)
  const basename = changeCase.kebabCase(path.basename(name, suffix))
  try {
    consola.log(`Start to dump svg from ${svgFilePath}`)
    const rawSvg = await fs.readFile(svgFilePath, 'utf8')
    const svgData = rawSvg.replace(/fill="[^"]*"/g, 'fill="currentColor"')
    const dumpPath = resolve(DUMP_DIR, basename + '.tsx')
    await fs.writeFile(
      dumpPath,
      `
export const ${changeCase.camelCase(basename)}Icon = \`${svgData}\`.trim();
        `.trim(),
    )
    indexFileList.push(createExportContent(path.basename(DUMP_DIR) + '/' + basename + '.js'))
    consola.success(`Dumping svg from ${svgFilePath} success`)
  } catch (err) {
    consola.error(`Dumping svg from ${svgFilePath} failed cause ${err?.message ?? err?.toString() ?? 'Unknown'}`)
  }
}

async function main() {
  await fs.ensureDir(DUMP_DIR)
  await fs.emptyDir(DUMP_DIR)
  const files = await fs.readdir(SVG_DIR)
  await Promise.all(files.sort((a, b) => a.localeCompare(b)).map((name) => dumpSvg(name)))
  await fs.writeFile(resolve('src', 'index.tsx'), indexFileList.join('\n'))
}

main().catch((err) => {
  console.error(err)
})
