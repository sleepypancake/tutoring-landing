export interface StrapiImage {
  url: string;
  alternativeText?: string;
  width?: number;
  height?: number;
}

export interface HeroData {
  headline: string;
  subheadline: string;
  whatsappLink: string;
  beforeImage: StrapiImage;
  afterImage: StrapiImage;
  badge1: string;
  badge2: string;
  badge3: string;
}

export interface ProblemItem {
  id: number;
  icon: string;
  text: string;
}

export interface Program {
  id: number;
  title: string;
  description: string;
  icon: string;
  color: string;
}

export interface Review {
  id: number;
  parentName: string;
  childAge: string;
  text: string;
  rating: number;
  photo?: StrapiImage;
}

export interface VideoLesson {
  id: number;
  title: string;
  youtubeUrl: string;
  thumbnail?: StrapiImage;
}

export interface ResultData {
  beforeImage: StrapiImage;
  afterImage: StrapiImage;
  description: string;
  timeframe: string;
}

export interface SiteSettings {
  siteName: string;
  siteDescription: string;
  phone: string;
  whatsapp: string;
  telegram: string;
  address: string;
  mapEmbedUrl: string;
  telegramBotToken: string;
  telegramChatId: string;
}
