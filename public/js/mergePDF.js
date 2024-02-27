const mergePDF = async (docOne, docTwo) => {
  const PDFMerger = await import("pdf-merger-js");
  var merger = new PDFMerger.default();
  await merger.add(docOne);
  await merger.add(docTwo);
  let time = new Date().getTime();
  await merger.save(`generatedPDFs/${time}.pdf`);
  return time;
};

module.exports = { mergePDF };
