const fs = require("fs-extra");
const format = require("xml-formatter");

function readFile() {
  const rawString = fs.readFileSync("./xmlSamples/fuzzyXML.txt", "utf8");
  let ltXML = rawString.replaceAll("&lt;", "<");
  ltXML = ltXML.substring(ltXML.indexOf("<") + 1);
  const gtXML = ltXML.replaceAll("&gt;", ">");

  //what comes after <xml tag is root
  let frmtStr = gtXML.split("<");
  if (frmtStr[0].indexOf("xml version") != -1) {
    frmtStr = frmtStr.slice(1);
  }
  frmtStr = frmtStr
    .map((x) => "<" + x)
    .map((x) => x.substring(x.indexOf("<") - 1, x.lastIndexOf(">") + 1));
  let rootTag = frmtStr.join("");
  try {
    const formattedXml = format("<root>" + rootTag + "</root>");
    console.log(formattedXml);
  } catch (error) {
    console.log(error);
  }
}
readFile();
