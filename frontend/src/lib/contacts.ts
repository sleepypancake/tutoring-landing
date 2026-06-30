export type ContactType = 'telegram' | 'whatsapp' | 'max' | 'phone' | 'email';

export interface ContactLink {
  id: number;
  type: ContactType;
  value: string;
  label?: string;
}

export interface ContactStyle {
  bg: string;
  border: string;
  iconBg: string;
  icon: string;
  textColor: string;
  subColor: string;
  defaultLabel: string;
  defaultSub: string;
  href: (value: string) => string;
}

export const CONTACT_STYLES: Record<ContactType, ContactStyle> = {
  telegram: {
    bg: '#E8F4FE',
    border: '#229ED9',
    iconBg: '#BDE4F7',
    icon: '✈️',
    textColor: '#1155A0',
    subColor: '#3a8fd9',
    defaultLabel: 'Написать в Telegram',
    defaultSub: 'Быстрый ответ',
    href: (v) => v.startsWith('http') ? v : `https://t.me/${v.replace('@', '')}`,
  },
  whatsapp: {
    bg: '#E9FBF0',
    border: '#25D366',
    iconBg: '#B8F0D0',
    icon: '💬',
    textColor: '#1a7a52',
    subColor: '#4aab7a',
    defaultLabel: 'Написать в WhatsApp',
    defaultSub: 'Отвечу в течение часа',
    href: (v) => v.startsWith('http') ? v : `https://wa.me/${v.replace(/\D/g, '')}`,
  },
  max: {
    bg: '#F0EAFF',
    border: '#7B61FF',
    iconBg: '#D4CAFF',
    icon: '💜',
    textColor: '#4a2db0',
    subColor: '#8b6fd9',
    defaultLabel: 'Написать в Max',
    defaultSub: 'Быстрый ответ',
    href: (v) => v.startsWith('http') ? v : `https://max.ru/${v.replace('@', '')}`,
  },
  phone: {
    bg: 'var(--purple-light)',
    border: 'var(--purple)',
    iconBg: '#D8CAFF',
    icon: '📞',
    textColor: 'var(--purple)',
    subColor: 'var(--muted)',
    defaultLabel: '',
    defaultSub: '',
    href: (v) => `tel:${v.replace(/\s/g, '')}`,
  },
  email: {
    bg: '#F5F5F5',
    border: '#888',
    iconBg: '#E0E0E0',
    icon: '✉️',
    textColor: '#333',
    subColor: '#888',
    defaultLabel: 'Написать на почту',
    defaultSub: '',
    href: (v) => `mailto:${v}`,
  },
};
