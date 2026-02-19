import React, { useState, useRef } from 'react';
import { jsPDF } from 'jspdf';
import { Upload, X, FileDown, Plus, Trash2, ArrowUp, ArrowDown } from 'lucide-react';
import { ImageFile } from '../types';
import { AdPlaceholder } from '../components/AdPlaceholder';

// <!-- Replace SmartLink URL Here -->
const SMARTLINK_URL = 'https://your-smartlink-url.com';

export const ConverterPage: React.FC = () => {
  const [images, setImages] = useState<ImageFile[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []) as File[];
    if (files.length === 0) return;

    files.forEach(file => {
      const reader = new FileReader();
      reader.onload = (event) => {
        const id = Math.random().toString(36).substr(2, 9);
        setImages(prev => [...prev, {
          id,
          file,
          preview: event.target?.result as string
        }]);
      };
      reader.readAsDataURL(file);
    });
    
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const removeImage = (id: string) => {
    setImages(prev => prev.filter(img => img.id !== id));
  };

  const moveImage = (index: number, direction: 'up' | 'down') => {
    const newImages = [...images];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= images.length) return;
    
    const temp = newImages[index];
    newImages[index] = newImages[targetIndex];
    newImages[targetIndex] = temp;
    setImages(newImages);
  };

  /**
   * Helper to trigger the SmartLink once per session.
   * Opens in a new tab without blocking the main thread.
   */
  const triggerSmartLinkOnce = () => {
    const hasTriggered = sessionStorage.getItem('smartlink_triggered');
    if (!hasTriggered) {
      window.open(SMARTLINK_URL, '_blank');
      sessionStorage.setItem('smartlink_triggered', 'true');
    }
  };

  const generatePDF = async () => {
    if (images.length === 0) return;
    
    // Trigger ad (SmartLink) logic
    triggerSmartLinkOnce();
    
    setIsProcessing(true);

    try {
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();

      for (let i = 0; i < images.length; i++) {
        const img = images[i];
        
        const imgElement = new Image();
        imgElement.src = img.preview;
        
        await new Promise((resolve) => {
          imgElement.onload = resolve;
        });

        const imgWidth = imgElement.width;
        const imgHeight = imgElement.height;
        const ratio = imgWidth / imgHeight;

        let finalWidth = pageWidth - 20; 
        let finalHeight = finalWidth / ratio;

        if (finalHeight > (pageHeight - 20)) {
          finalHeight = pageHeight - 20;
          finalWidth = finalHeight * ratio;
        }

        const x = (pageWidth - finalWidth) / 2;
        const y = (pageHeight - finalHeight) / 2;

        if (i > 0) pdf.addPage();
        pdf.addImage(img.preview, 'JPEG', x, y, finalWidth, finalHeight);
      }

      // Automatically triggers PDF download in the same tab
      pdf.save(`Img2PDF_${Date.now()}.pdf`);
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('An error occurred during PDF generation.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Image to PDF Converter</h1>
        <p className="text-gray-600">Select images, arrange them, and convert to a single PDF instantly.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="hidden lg:block">
          <AdPlaceholder type="sidebar" />
          <div className="mt-8 p-6 bg-blue-50 rounded-xl border border-blue-100">
            <h3 className="font-bold text-blue-800 mb-3">Pro Tip</h3>
            <p className="text-sm text-blue-700">You can upload multiple files at once. Drag and drop works too!</p>
          </div>
        </div>

        <div className="lg:col-span-2">
          {images.length === 0 ? (
            <div 
              onClick={() => fileInputRef.current?.click()}
              className="border-4 border-dashed border-gray-200 rounded-2xl p-20 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50 hover:border-blue-400 transition-all group"
            >
              <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Upload className="w-10 h-10 text-blue-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Upload Images</h2>
              <p className="text-gray-500 mb-6">Click to browse or drag & drop files</p>
              <p className="text-xs text-gray-400 font-mono">JPG, PNG, WebP supported</p>
            </div>
          ) : (
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
              <div className="p-4 bg-gray-50 border-b border-gray-200 flex justify-between items-center">
                <span className="font-bold text-gray-700">{images.length} Images Selected</span>
                <div className="flex gap-2">
                  <button 
                    onClick={() => fileInputRef.current?.click()}
                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors flex items-center gap-1 font-medium"
                  >
                    <Plus className="w-4 h-4" /> Add More
                  </button>
                  <button 
                    onClick={() => setImages([])}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors flex items-center gap-1 font-medium"
                  >
                    <Trash2 className="w-4 h-4" /> Clear All
                  </button>
                </div>
              </div>

              <div className="divide-y divide-gray-100 max-h-[600px] overflow-y-auto">
                {images.map((img, index) => (
                  <div key={img.id} className="p-4 flex items-center gap-4 hover:bg-gray-50 group">
                    <span className="text-gray-300 font-bold w-4">{index + 1}</span>
                    <img src={img.preview} alt="Preview" className="w-16 h-16 object-cover rounded-lg border border-gray-200" />
                    <div className="flex-grow min-w-0">
                      <p className="text-sm font-medium text-gray-800 truncate">{img.file.name}</p>
                      <p className="text-xs text-gray-400">{(img.file.size / 1024).toFixed(1)} KB</p>
                    </div>
                    <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button 
                        onClick={() => moveImage(index, 'up')}
                        disabled={index === 0}
                        className="p-2 text-gray-400 hover:text-blue-600 disabled:opacity-30"
                      >
                        <ArrowUp className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => moveImage(index, 'down')}
                        disabled={index === images.length - 1}
                        className="p-2 text-gray-400 hover:text-blue-600 disabled:opacity-30"
                      >
                        <ArrowDown className="w-4 h-4" />
                      </button>
                    </div>
                    <button 
                      onClick={() => removeImage(img.id)}
                      className="p-2 text-gray-400 hover:text-red-600"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                ))}
              </div>

              <div className="p-6 bg-gray-50 border-t border-gray-200">
                <button
                  onClick={generatePDF}
                  disabled={isProcessing}
                  className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-blue-700 transition-all flex items-center justify-center gap-3 disabled:bg-blue-300 shadow-lg shadow-blue-100"
                >
                  {isProcessing ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                      Processing PDF...
                    </>
                  ) : (
                    <>
                      <FileDown className="w-6 h-6" />
                      Convert & Download PDF
                    </>
                  )}
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="hidden lg:block">
          <AdPlaceholder type="sidebar" />
          <div className="mt-8 p-6 bg-gray-50 rounded-xl border border-gray-200">
            <h3 className="font-bold text-gray-800 mb-3">Why PDF?</h3>
            <ul className="text-sm text-gray-600 space-y-2">
              <li className="flex gap-2">✅ Universally compatible</li>
              <li className="flex gap-2">✅ Keeps formatting intact</li>
              <li className="flex gap-2">✅ Searchable content</li>
              <li className="flex gap-2">✅ Secured with encryption</li>
            </ul>
          </div>
        </div>
      </div>

      <input 
        type="file" 
        ref={fileInputRef} 
        onChange={handleFileChange} 
        multiple 
        accept="image/*" 
        className="hidden" 
      />

      <div className="mt-16">
        <AdPlaceholder type="footer" />
      </div>

      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "SoftwareApplication",
          "name": "Img2PDF",
          "operatingSystem": "Web",
          "applicationCategory": "UtilityApplication",
          "offers": {
            "@type": "Offer",
            "price": "0.00",
            "priceCurrency": "USD"
          }
        })}
      </script>
    </div>
  );
};