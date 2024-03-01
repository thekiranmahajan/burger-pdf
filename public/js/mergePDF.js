const mergePDF = async (docOne, docTwo) => {
  const PDFMerger = await import("pdf-merger-js");
  var merger = new PDFMerger.default();
  await merger.add(docOne);
  await merger.add(docTwo);
  let timestamp = new Date().getTime();
  await merger.save(`public/generatedPDFs/${timestamp}.pdf`);
  return timestamp;
};

module.exports = { mergePDF };
