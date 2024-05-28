import docxtemplater from "docxtemplater";
import PizZip from "pizzip";
import fs from "node:fs";
import path from "node:path";
import { $ } from "zx";

export function main() {
  const content = fs.readFileSync(
    path.resolve(__dirname, "../..", "template.docx"),
    "binary"
  );
  // 创建一个docxtemplater实例
  const doc = new docxtemplater(new PizZip(content));

  // 对文档模板中的占位符进行替换
  doc.setData({
    code: "a".repeat(10 ** 4),
  });

  // 生成新的文档
  doc.render();

  // 将文档输出为新的docx文件
  const buf = doc.getZip().generate({
    type: "nodebuffer",
    compression: "DEFLATE",
  });

  fs.writeFileSync(path.resolve(__dirname, "output.docx"), buf);

  console.log("新的docx文件已经创建成功！");
}

main();
