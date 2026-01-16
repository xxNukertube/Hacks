export enum QRType {
  LINK = 'link',
  TEXT = 'text',
  EMAIL = 'email',
  PHONE = 'phone',
  SMS = 'sms',
  VCARD = 'vcard',
  WHATSAPP = 'whatsapp',
  WIFI = 'wifi',
  EVENT = 'event',
  // Types that are essentially links but user perceives as files/media
  PDF = 'pdf',
  APP = 'app',
  IMAGE = 'image',
  VIDEO = 'video',
  SOCIAL = 'social',
}

export interface QRData {
  type: QRType;
  value: string; // The raw string to encode
  // Detailed fields for form state reconstruction
  details: {
    url?: string;
    text?: string;
    email?: string;
    subject?: string;
    body?: string;
    phone?: string;
    firstName?: string;
    lastName?: string;
    organization?: string;
    ssid?: string;
    password?: string;
    encryption?: 'WPA' | 'WEP' | 'nopass';
    eventTitle?: string;
    eventLocation?: string;
    eventStart?: string;
    eventEnd?: string;
  };
}

export interface FrameConfig {
  enabled: boolean;
  text: string;
  style: 'simple' | 'scanme' | 'custom';
  color: string;
  bgColor: string;
}