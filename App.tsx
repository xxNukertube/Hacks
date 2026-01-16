import React, { useState, useEffect } from 'react';
import { 
  Link as LinkIcon, Type, Mail, Phone, MessageSquare, 
  Contact, Wifi, Calendar, FileText, Smartphone, Image as ImageIcon, 
  Video, Share2, QrCode
} from 'lucide-react';

import { QRType, QRData, FrameConfig } from './types';
import { generateQRString } from './utils/qrHelpers';
import { InputForm } from './components/InputForm';
import { QRPreview } from './components/QRPreview';

const App: React.FC = () => {
  const [selectedType, setSelectedType] = useState<QRType>(QRType.LINK);
  const [details, setDetails] = useState<QRData['details']>({});
  const [qrValue, setQrValue] = useState<string>('');
  
  const [frameConfig, setFrameConfig] = useState<FrameConfig>({
    enabled: true,
    text: 'SCAN ME',
    style: 'scanme',
    color: '#000000',
    bgColor: '#000000'
  });

  // Update QR string whenever details or type changes
  useEffect(() => {
    const newVal = generateQRString(selectedType, details);
    setQrValue(newVal);
  }, [selectedType, details]);

  // Reset details when type changes to avoid confusion
  const handleTypeChange = (type: QRType) => {
    setSelectedType(type);
    setDetails({});
  };

  const navItems = [
    { type: QRType.LINK, label: 'Link', icon: LinkIcon },
    { type: QRType.TEXT, label: 'Texto', icon: Type },
    { type: QRType.EMAIL, label: 'E-mail', icon: Mail },
    { type: QRType.PHONE, label: 'Chamada', icon: Phone },
    { type: QRType.SMS, label: 'SMS', icon: MessageSquare },
    { type: QRType.WHATSAPP, label: 'WhatsApp', icon: MessageSquare }, // Reusing icon for simplicity
    { type: QRType.WIFI, label: 'WI-FI', icon: Wifi },
    { type: QRType.VCARD, label: 'V-Card', icon: Contact },
    { type: QRType.EVENT, label: 'Evento', icon: Calendar },
    { type: QRType.PDF, label: 'PDF', icon: FileText },
    { type: QRType.APP, label: 'App', icon: Smartphone },
    { type: QRType.IMAGE, label: 'Imagens', icon: ImageIcon },
    { type: QRType.VIDEO, label: 'Vídeo', icon: Video },
    { type: QRType.SOCIAL, label: 'Social', icon: Share2 },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 to-indigo-50 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <header className="mb-8 text-center md:text-left flex items-center gap-3 justify-center md:justify-start">
          <div className="bg-indigo-600 p-2 rounded-lg text-white">
            <QrCode size={32} />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-800">Gerador de QR Code</h1>
            <p className="text-slate-500 text-sm">Crie, personalize e baixe seus códigos gratuitamente.</p>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Navigation / Sidebar */}
          <div className="lg:col-span-3 bg-white rounded-xl shadow-sm border border-slate-200 p-4 h-fit">
            <h2 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-4 px-2">Tipo de Conteúdo</h2>
            <nav className="grid grid-cols-2 lg:grid-cols-1 gap-2">
              {navItems.map((item) => (
                <button
                  key={item.type}
                  onClick={() => handleTypeChange(item.type)}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                    selectedType === item.type 
                      ? 'bg-indigo-600 text-white shadow-md' 
                      : 'text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  <item.icon size={18} />
                  {item.label}
                </button>
              ))}
            </nav>
          </div>

          {/* Main Content Area */}
          <div className="lg:col-span-9 grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* Input Form */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 h-fit">
              <h2 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-indigo-100 text-indigo-600 text-xs font-bold">1</span>
                Insira o Conteúdo
              </h2>
              
              <InputForm 
                type={selectedType} 
                data={details} 
                onChange={setDetails} 
              />
            </div>

            {/* Preview & Customization */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 h-fit lg:sticky lg:top-8">
               <h2 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-indigo-100 text-indigo-600 text-xs font-bold">2</span>
                Personalize & Baixe
              </h2>

              <QRPreview 
                value={qrValue} 
                frameConfig={frameConfig}
                onFrameChange={setFrameConfig}
              />
            </div>

          </div>
        </div>
        
        <footer className="mt-12 text-center text-slate-400 text-sm">
          &copy; {new Date().getFullYear()} Gerador Simples. Todos os direitos reservados.
        </footer>
      </div>
    </div>
  );
};

export default App;