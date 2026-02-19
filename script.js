// <!-- Replace SmartLink URL Here -->
const SMARTLINK_URL = 'https://your-smartlink-url.com';

const dropZone = document.getElementById('dropZone');
const fileInput = document.getElementById('fileInput');
const imageList = document.getElementById('imageList');
const imageListContainer = document.getElementById('imageListContainer');
const imageCount = document.getElementById('imageCount');
const convertBtn = document.getElementById('convertBtn');
const addMoreBtn = document.getElementById('addMoreBtn');
const clearAllBtn = document.getElementById('clearAllBtn');
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');

let selectedFiles = [];

// Navigation Toggle
menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// Click to Upload
dropZone.addEventListener('click', () => fileInput.click());

// File Selection
fileInput.addEventListener('change', (e) => handleFiles(e.target.files));

// Drag & Drop
dropZone.addEventListener('dragover', (e) => {
    e.preventDefault();
    dropZone.classList.add('drag-over');
});

dropZone.addEventListener('dragleave', () => dropZone.classList.remove('drag-over'));

dropZone.addEventListener('drop', (e) => {
    e.preventDefault();
    dropZone.classList.remove('drag-over');
    handleFiles(e.dataTransfer.files);
});

addMoreBtn.addEventListener('click', () => fileInput.click());
clearAllBtn.addEventListener('click', () => {
    selectedFiles = [];
    renderList();
});

function handleFiles(files) {
    const arr = Array.from(files);
    arr.forEach(file => {
        if (!file.type.startsWith('image/')) return;
        const reader = new FileReader();
        reader.onload = (e) => {
            selectedFiles.push({
                id: Math.random().toString(36).substr(2, 9),
                file: file,
                preview: e.target.result
            });
            renderList();
        };
        reader.readAsDataURL(file);
    });
}

function renderList() {
    if (selectedFiles.length === 0) {
        imageListContainer.classList.add('hidden');
        dropZone.classList.remove('hidden');
        return;
    }

    dropZone.classList.add('hidden');
    imageListContainer.classList.remove('hidden');
    imageCount.textContent = `${selectedFiles.length} Images Selected`;
    
    imageList.innerHTML = '';
    selectedFiles.forEach((item, index) => {
        const row = document.createElement('div');
        row.className = 'image-item';
        row.innerHTML = `
            <span>${index + 1}</span>
            <img src="${item.preview}" alt="Preview">
            <div class="image-item-info">
                <p>${item.file.name}</p>
                <span>${(item.file.size / 1024).toFixed(1)} KB</span>
            </div>
            <div class="item-actions">
                <button onclick="moveItem(${index}, -1)" ${index === 0 ? 'disabled' : ''}>↑</button>
                <button onclick="moveItem(${index}, 1)" ${index === selectedFiles.length - 1 ? 'disabled' : ''}>↓</button>
                <button onclick="removeItem('${item.id}')" class="text-red">✕</button>
            </div>
        `;
        imageList.appendChild(row);
    });
}

window.moveItem = (index, direction) => {
    const target = index + direction;
    if (target < 0 || target >= selectedFiles.length) return;
    const temp = selectedFiles[index];
    selectedFiles[index] = selectedFiles[target];
    selectedFiles[target] = temp;
    renderList();
};

window.removeItem = (id) => {
    selectedFiles = selectedFiles.filter(i => i.id !== id);
    renderList();
};

// Monetization & Conversion
function triggerSmartLink() {
    if (!sessionStorage.getItem('smartlink_triggered')) {
        window.open(SMARTLINK_URL, '_blank');
        sessionStorage.setItem('smartlink_triggered', 'true');
    }
}

convertBtn.addEventListener('click', async () => {
    if (selectedFiles.length === 0) return;
    
    triggerSmartLink();
    
    const btnText = document.getElementById('btnText');
    const btnLoader = document.getElementById('btnLoader');
    
    btnText.textContent = 'Processing...';
    btnLoader.classList.remove('hidden');
    convertBtn.disabled = true;

    try {
        const { jsPDF } = window.jspdf;
        const pdf = new jsPDF('p', 'mm', 'a4');
        const pageWidth = pdf.internal.pageSize.getWidth();
        const pageHeight = pdf.internal.pageSize.getHeight();

        for (let i = 0; i < selectedFiles.length; i++) {
            const item = selectedFiles[i];
            if (i > 0) pdf.addPage();
            
            // Draw image
            const img = new Image();
            img.src = item.preview;
            await new Promise(resolve => img.onload = resolve);
            
            const ratio = img.width / img.height;
            let finalWidth = pageWidth - 20;
            let finalHeight = finalWidth / ratio;

            if (finalHeight > (pageHeight - 20)) {
                finalHeight = pageHeight - 20;
                finalWidth = finalHeight * ratio;
            }

            const x = (pageWidth - finalWidth) / 2;
            const y = (pageHeight - finalHeight) / 2;

            pdf.addImage(item.preview, 'JPEG', x, y, finalWidth, finalHeight);
        }

        pdf.save(`Img2PDF_${Date.now()}.pdf`);
    } catch (err) {
        console.error(err);
        alert('Conversion failed. Please try again.');
    } finally {
        btnText.textContent = 'Convert & Download PDF';
        btnLoader.classList.add('hidden');
        convertBtn.disabled = false;
    }
});