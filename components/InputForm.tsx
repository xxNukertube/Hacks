import React from 'react';
import { QRType, QRData } from '../types';

interface InputFormProps {
  type: QRType;
  data: QRData['details'];
  onChange: (details: QRData['details']) => void;
}

export const InputForm: React.FC<InputFormProps> = ({ type, data, onChange }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    onChange({ ...data, [name]: value });
  };

  const inputClass = "w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all";
  const labelClass = "block text-sm font-medium text-slate-700 mb-1";

  // Shared inputs for URL-based types
  if ([QRType.LINK, QRType.PDF, QRType.APP, QRType.IMAGE, QRType.VIDEO, QRType.SOCIAL].includes(type)) {
    let placeholder = "https://www.exemplo.com";
    let label = "URL do Site";
    
    if (type === QRType.PDF) { label = "Link do Arquivo PDF"; placeholder = "https://..."; }
    if (type === QRType.APP) { label = "Link da App Store / Play Store"; placeholder = "https://..."; }
    if (type === QRType.IMAGE) { label = "Link da Imagem"; placeholder = "https://..."; }
    if (type === QRType.VIDEO) { label = "Link do Vídeo (YouTube, etc)"; placeholder = "https://..."; }
    if (type === QRType.SOCIAL) { label = "Link da Rede Social"; placeholder = "https://instagram.com/seu_perfil"; }

    return (
      <div>
        <label className={labelClass}>{label}</label>
        <input
          type="url"
          name="url"
          value={data.url || ''}
          onChange={handleChange}
          placeholder={placeholder}
          className={inputClass}
        />
        {[QRType.PDF, QRType.IMAGE, QRType.VIDEO].includes(type) && (
          <p className="text-xs text-slate-500 mt-2">
            * Nota: O QR Code armazena o link onde seu arquivo está hospedado.
          </p>
        )}
      </div>
    );
  }

  switch (type) {
    case QRType.TEXT:
      return (
        <div>
          <label className={labelClass}>Texto</label>
          <textarea
            name="text"
            value={data.text || ''}
            onChange={handleChange}
            placeholder="Digite seu texto aqui..."
            rows={4}
            className={inputClass}
          />
        </div>
      );

    case QRType.EMAIL:
      return (
        <div className="space-y-4">
          <div>
            <label className={labelClass}>E-mail de Destino</label>
            <input type="email" name="email" value={data.email || ''} onChange={handleChange} className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>Assunto</label>
            <input type="text" name="subject" value={data.subject || ''} onChange={handleChange} className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>Mensagem</label>
            <textarea name="body" value={data.body || ''} onChange={handleChange} rows={3} className={inputClass} />
          </div>
        </div>
      );

    case QRType.PHONE:
      return (
        <div>
          <label className={labelClass}>Número de Telefone</label>
          <input type="tel" name="phone" value={data.phone || ''} onChange={handleChange} placeholder="+55 11 99999-9999" className={inputClass} />
        </div>
      );

    case QRType.SMS:
      return (
        <div className="space-y-4">
          <div>
            <label className={labelClass}>Número de Telefone</label>
            <input type="tel" name="phone" value={data.phone || ''} onChange={handleChange} placeholder="+55..." className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>Mensagem SMS</label>
            <textarea name="text" value={data.text || ''} onChange={handleChange} className={inputClass} />
          </div>
        </div>
      );

    case QRType.WHATSAPP:
      return (
        <div className="space-y-4">
          <div>
            <label className={labelClass}>Número de WhatsApp</label>
            <input type="tel" name="phone" value={data.phone || ''} onChange={handleChange} placeholder="+55..." className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>Mensagem Inicial (Opcional)</label>
            <textarea name="text" value={data.text || ''} onChange={handleChange} className={inputClass} />
          </div>
        </div>
      );

    case QRType.WIFI:
      return (
        <div className="space-y-4">
          <div>
            <label className={labelClass}>Nome da Rede (SSID)</label>
            <input type="text" name="ssid" value={data.ssid || ''} onChange={handleChange} className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>Senha</label>
            <input type="text" name="password" value={data.password || ''} onChange={handleChange} className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>Tipo de Segurança</label>
            <select name="encryption" value={data.encryption || 'WPA'} onChange={handleChange} className={inputClass}>
              <option value="WPA">WPA/WPA2</option>
              <option value="WEP">WEP</option>
              <option value="nopass">Sem Senha</option>
            </select>
          </div>
        </div>
      );

    case QRType.VCARD:
      return (
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Nome</label>
              <input type="text" name="firstName" value={data.firstName || ''} onChange={handleChange} className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>Sobrenome</label>
              <input type="text" name="lastName" value={data.lastName || ''} onChange={handleChange} className={inputClass} />
            </div>
          </div>
          <div>
            <label className={labelClass}>Telefone</label>
            <input type="tel" name="phone" value={data.phone || ''} onChange={handleChange} className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>E-mail</label>
            <input type="email" name="email" value={data.email || ''} onChange={handleChange} className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>Empresa/Organização</label>
            <input type="text" name="organization" value={data.organization || ''} onChange={handleChange} className={inputClass} />
          </div>
        </div>
      );
    
    case QRType.EVENT:
      return (
        <div className="space-y-4">
          <div>
            <label className={labelClass}>Título do Evento</label>
            <input type="text" name="eventTitle" value={data.eventTitle || ''} onChange={handleChange} className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>Local</label>
            <input type="text" name="eventLocation" value={data.eventLocation || ''} onChange={handleChange} className={inputClass} />
          </div>
          <div className="grid grid-cols-2 gap-4">
             <div>
               <label className={labelClass}>Início (ex: 20231231T190000)</label>
               <input type="text" name="eventStart" placeholder="YYYYMMDDTHHmmSS" value={data.eventStart || ''} onChange={handleChange} className={inputClass} />
             </div>
             <div>
               <label className={labelClass}>Fim</label>
               <input type="text" name="eventEnd" placeholder="YYYYMMDDTHHmmSS" value={data.eventEnd || ''} onChange={handleChange} className={inputClass} />
             </div>
          </div>
        </div>
      );

    default:
      return <div className="text-slate-500">Selecione um tipo para começar.</div>;
  }
};