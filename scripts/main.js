 import { generateMoodBoardPDF } from "./pdf-generator.js";

// DOM Elements
const fileInput = document.getElementById("imageUpload");
const previewContainer = document.getElementById("imagePreview");
const generateBtn = document.getElementById("generateBtn");

// Preview Uploaded Images
fileInput.addEventListener("change", () => {
  previewContainer.innerHTML = "";
  const files = fileInput.files;

  for (let file of files) {
    const reader = new FileReader();
    reader.onload = function (e) {
      const img = document.createElement("img");
      img.src = e.target.result;
      img.style.width = "120px";
      img.style.height = "auto";
      img.style.margin = "8px";
      img.style.borderRadius = "12px";
      img.style.objectFit = "cover";
      previewContainer.appendChild(img);
    };
    reader.readAsDataURL(file);
  }
});

// Generate PDF button handler
generateBtn.addEventListener("click", async () => {
  const clientName = document.getElementById("nameInput").value.trim();

  if (!clientName) {
    alert("Please enter the couple's or client's name.");
    return;
  }

  const images = previewContainer.querySelectorAll("img");
  if (images.length < 4) {
    alert("Please upload at least 4 inspiration photos.");
    return;
  }
  if (images.length > 8) {
    alert("Please upload no more than 8 inspiration photos.");
    return;
  }

  try {
    // Call the improved PDF generation function from pdf-generator.js
    await generateMoodBoardPDF(clientName, images);
  } catch (error) {
    console.error("Error generating PDF:", error);
    alert("Something went wrong while generating the PDF. Please try again.");
  }
});
