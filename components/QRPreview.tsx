import React, { useRef, useState } from 'react';
import { QRCodeCanvas } from 'qrcode.react';
import { FrameConfig } from '../types';
import { toPng } from 'html-to-image';
import { Download, Loader2 } from 'lucide-react';

interface QRPreviewProps {
  value: string;
  frameConfig: FrameConfig;
  onFrameChange: (config: FrameConfig) => void;
}

export const QRPreview: React.FC<QRPreviewProps> = ({ value, frameConfig, onFrameChange }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [downloading, setDownloading] = useState(false);

  const handleDownload = async () => {
    if (ref.current === null) return;
    setDownloading(true);

    try {
        // Double rendering often fixes glitchy fonts or missing layout in some browsers
        await toPng(ref.current, { cacheBust: true, pixelRatio: 3 });
        const dataUrl = await toPng(ref.current, { cacheBust: true, pixelRatio: 3 });
        
        const link = document.createElement('a');
        link.download = 'qrcode.png';
        link.href = dataUrl;
        link.click();
    } catch (err) {
      console.error('Erro ao baixar QR code', err);
      alert('Erro ao gerar imagem. Tente novamente.');
    } finally {
        setDownloading(false);
    }
  };

  const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onFrameChange({ ...frameConfig, [e.target.name]: e.target.value });
  };

  const handleFrameSelect = (style: FrameConfig['style']) => {
    onFrameChange({ 
        ...frameConfig, 
        enabled: style !== 'simple',
        style,
        text: style === 'scanme' ? 'SCAN ME' : (frameConfig.text || 'ESCANEAR')
    });
  };

  return (
    <div className="flex flex-col items-center gap-6 w-full">
      
      {/* Preview Area - This is what gets downloaded */}
      <div className="p-4 bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
        <div 
          ref={ref} 
          className="p-8 flex flex-col items-center justify-center transition-colors duration-300"
          style={{ backgroundColor: frameConfig.enabled ? frameConfig.bgColor : 'white' }}
        >
          {/* Top Frame Text (Future feature, keeping simple for now) */}
          
          {/* QR Code */}
          <div className="bg-white p-2 rounded-lg">
             <QRCodeCanvas
                value={value || 'https://example.com'}
                size={200}
                fgColor={frameConfig.color}
                bgColor="#ffffff"
                level="H"
             />
          </div>

          {/* Bottom Frame Text */}
          {frameConfig.enabled && (
             <div 
               className="mt-4 font-bold text-xl uppercase tracking-wider text-center max-w-[200px] break-words"
               style={{ color: frameConfig.color === '#000000' && frameConfig.bgColor === '#000000' ? 'white' : (frameConfig.bgColor === '#ffffff' ? frameConfig.color : 'white') }}
             >
                {frameConfig.text}
             </div>
          )}
        </div>
      </div>

      {/* Controls */}
      <div className="w-full space-y-4">
        
        {/* Frame Selection */}
        <div className="grid grid-cols-3 gap-2">
            <button 
                onClick={() => handleFrameSelect('simple')}
                className={`p-2 text-sm rounded-lg border ${frameConfig.style === 'simple' ? 'bg-indigo-50 border-indigo-500 text-indigo-700' : 'bg-white border-slate-200'}`}
            >
                Sem Moldura
            </button>
            <button 
                onClick={() => handleFrameSelect('scanme')}
                className={`p-2 text-sm rounded-lg border ${frameConfig.style === 'scanme' ? 'bg-indigo-50 border-indigo-500 text-indigo-700' : 'bg-white border-slate-200'}`}
            >
                Scan Me
            </button>
            <button 
                onClick={() => handleFrameSelect('custom')}
                className={`p-2 text-sm rounded-lg border ${frameConfig.style === 'custom' ? 'bg-indigo-50 border-indigo-500 text-indigo-700' : 'bg-white border-slate-200'}`}
            >
                Personalizado
            </button>
        </div>

        {/* Custom Text Input */}
        {frameConfig.style === 'custom' && (
            <div>
                <label className="text-xs text-slate-500">Texto da Moldura</label>
                <input 
                    type="text" 
                    value={frameConfig.text} 
                    onChange={(e) => onFrameChange({...frameConfig, text: e.target.value})}
                    maxLength={20}
                    className="w-full p-2 border rounded-md text-sm"
                />
            </div>
        )}

        {/* Colors */}
        <div className="grid grid-cols-2 gap-4">
             <div>
                <label className="text-xs text-slate-500 block mb-1">Cor do QR</label>
                <div className="flex items-center gap-2">
                    <input 
                        type="color" 
                        name="color" 
                        value={frameConfig.color}
                        onChange={handleColorChange}
                        className="h-8 w-12 cursor-pointer border rounded"
                    />
                    <span className="text-xs font-mono">{frameConfig.color}</span>
                </div>
             </div>
             {frameConfig.enabled && (
                <div>
                    <label className="text-xs text-slate-500 block mb-1">Cor da Moldura</label>
                    <div className="flex items-center gap-2">
                        <input 
                            type="color" 
                            name="bgColor" 
                            value={frameConfig.bgColor}
                            onChange={handleColorChange}
                            className="h-8 w-12 cursor-pointer border rounded"
                        />
                         <span className="text-xs font-mono">{frameConfig.bgColor}</span>
                    </div>
                </div>
             )}
        </div>

        <button
          onClick={handleDownload}
          disabled={!value || downloading}
          className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {downloading ? <Loader2 className="animate-spin w-5 h-5" /> : <Download className="w-5 h-5" />}
          Baixar QR Code (PNG)
        </button>
      </div>
    </div>
  );
};