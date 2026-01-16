import { QRData, QRType } from '../types';

export const generateQRString = (type: QRType, details: QRData['details']): string => {
  switch (type) {
    case QRType.LINK:
    case QRType.PDF:
    case QRType.APP:
    case QRType.IMAGE:
    case QRType.VIDEO:
    case QRType.SOCIAL:
      return details.url || '';

    case QRType.TEXT:
      return details.text || '';

    case QRType.EMAIL:
      return `mailto:${details.email || ''}?subject=${encodeURIComponent(details.subject || '')}&body=${encodeURIComponent(details.body || '')}`;

    case QRType.PHONE:
      return `tel:${details.phone || ''}`;

    case QRType.SMS:
      return `SMSTO:${details.phone || ''}:${details.text || ''}`;

    case QRType.WHATSAPP:
      // Removing non-numeric chars from phone
      const cleanPhone = (details.phone || '').replace(/\D/g, '');
      return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(details.text || '')}`;

    case QRType.WIFI:
      return `WIFI:T:${details.encryption || 'WPA'};S:${details.ssid || ''};P:${details.password || ''};;`;

    case QRType.VCARD:
      return `BEGIN:VCARD
VERSION:3.0
N:${details.lastName || ''};${details.firstName || ''}
FN:${details.firstName || ''} ${details.lastName || ''}
ORG:${details.organization || ''}
TEL:${details.phone || ''}
EMAIL:${details.email || ''}
END:VCARD`;

    case QRType.EVENT:
      // Basic formatting, handling ISO dates would be more robust in a huge app, keeping simple here
      return `BEGIN:VEVENT
SUMMARY:${details.eventTitle || ''}
LOCATION:${details.eventLocation || ''}
DTSTART:${(details.eventStart || '').replace(/[-:]/g, '')}
DTEND:${(details.eventEnd || '').replace(/[-:]/g, '')}
END:VEVENT`;

    default:
      return '';
  }
};