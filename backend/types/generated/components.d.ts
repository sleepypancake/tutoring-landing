import type { Schema, Struct } from '@strapi/strapi';

export interface ContactLink extends Struct.ComponentSchema {
  collectionName: 'components_contact_links';
  info: {
    displayName: '\u0421\u0441\u044B\u043B\u043A\u0430';
    icon: 'link';
  };
  attributes: {
    label: Schema.Attribute.String;
    type: Schema.Attribute.Enumeration<
      ['telegram', 'whatsapp', 'max', 'phone', 'email']
    > &
      Schema.Attribute.Required;
    value: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface ContentBeforeAfterPair extends Struct.ComponentSchema {
  collectionName: 'components_content_before_after_pairs';
  info: {
    displayName: '\u041F\u0430\u0440\u0430 \u0434\u043E/\u043F\u043E\u0441\u043B\u0435';
    icon: 'image';
  };
  attributes: {
    afterImage: Schema.Attribute.Media<'images'>;
    beforeImage: Schema.Attribute.Media<'images'>;
    label: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'\u0440\u0435\u0430\u043B\u044C\u043D\u044B\u0439 \u0440\u0435\u0437\u0443\u043B\u044C\u0442\u0430\u0442 \u0443\u0447\u0435\u043D\u0438\u043A\u0430'>;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'contact.link': ContactLink;
      'content.before-after-pair': ContentBeforeAfterPair;
    }
  }
}
