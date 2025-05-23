import { jsPDF } from "jspdf";

export async function generateMoodBoardPDF(clientName, imageElements) {
  const pdfContainer = document.createElement("div");
  pdfContainer.style.position = "absolute";
  pdfContainer.style.left = "-9999px";
  pdfContainer.style.width = "800px";
  pdfContainer.style.padding = "30px";
  pdfContainer.style.fontFamily = "'Playfair Display', serif";
  pdfContainer.style.background = "#fff";
  pdfContainer.style.border = "2px solid #f0e6d2";
  pdfContainer.style.borderRadius = "20px";
  pdfContainer.style.boxShadow = "0 8px 15px rgba(199, 166, 98, 0.3)";
  pdfContainer.style.color = "#1C1C1C";
  pdfContainer.style.textAlign = "center";

  // Logo
  const logo = document.createElement("img");
  logo.src = "images/logo.jpg";
  logo.style.width = "120px";
  logo.style.height = "auto";
  logo.style.position = "absolute";
  logo.style.top = "30px";
  logo.style.left = "30px";
  pdfContainer.appendChild(logo);

  // Title
  const title = document.createElement("h2");
  title.textContent = clientName;
  title.style.fontSize = "2.5rem";
  title.style.marginBottom = "40px";
  title.style.color = "#C7A662";
  title.style.fontWeight = "700";
  pdfContainer.appendChild(title);

  // Image grid
  const grid = document.createElement("div");
  grid.style.display = "grid";
  grid.style.gridTemplateColumns = "repeat(3, 1fr)";
  grid.style.gap = "20px";

  for (let img of imageElements) {
    const clone = img.cloneNode();
    clone.style.width = "100%";
    clone.style.borderRadius = "15px";
    clone.style.boxShadow = "0 4px 10px rgba(0,0,0,0.1)";
    clone.style.objectFit = "cover";
    grid.appendChild(clone);
  }

  pdfContainer.appendChild(grid);
  document.body.appendChild(pdfContainer);

  // Generate canvas
  const canvas = await html2canvas(pdfContainer, { scale: 3, useCORS: true });
  const imgData = canvas.toDataURL("image/png");

  // Create PDF
  const pdf = new jsPDF("p", "pt", "a4");
  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();

  const ratio = canvas.width / canvas.height;
  let pdfWidth = pageWidth - 60;
  let pdfHeight = pdfWidth / ratio;

  if (pdfHeight > pageHeight - 60) {
    pdfHeight = pageHeight - 60;
    pdfWidth = pdfHeight * ratio;
  }

  const xOffset = (pageWidth - pdfWidth) / 2;
  const yOffset = 30;

  pdf.addImage(imgData, "PNG", xOffset, yOffset, pdfWidth, pdfHeight);
  pdf.save(`${clientName.replace(/\s+/g, "_")}_MoodBoard.pdf`);

  document.body.removeChild(pdfContainer);
}
