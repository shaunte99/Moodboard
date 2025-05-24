document.addEventListener('DOMContentLoaded', () => {
  const imageBlocks = document.querySelectorAll('.image-block');
  const downloadBtn = document.getElementById('downloadBtn');
  const nameInput = document.getElementById('nameInput');

  // Preview images on upload
  imageBlocks.forEach(block => {
    const input = block.querySelector('.image-upload');
    const img = block.querySelector('.image-preview');
    const placeholder = block.querySelector('.placeholder');

    input.addEventListener('change', () => {
      const file = input.files[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onload = e => {
        img.src = e.target.result;
        img.style.display = 'block';
        placeholder.style.display = 'none';
      };
      reader.readAsDataURL(file);
    });
  });

  // Download brochure as PNG
  downloadBtn.addEventListener('click', () => {
    // Disable button during processing
    downloadBtn.disabled = true;
    downloadBtn.textContent = 'Preparing...';

    // Use html2canvas to capture .container
    const container = document.querySelector('.container');

    html2canvas(container, {
      scale: 2, // better resolution
      useCORS: true,
    }).then(canvas => {
      // Create a link and download the image
      const link = document.createElement('a');
      link.download = `MoodBoard_${nameInput.value.trim().replace(/\s+/g, '_') || 'client'}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();

      // Restore button
      downloadBtn.disabled = false;
      downloadBtn.textContent = 'Download Brochure';
    }).catch(() => {
      alert('Oops! Something went wrong during download.');
      downloadBtn.disabled = false;
      downloadBtn.textContent = 'Download Brochure';
    });
  });
});
