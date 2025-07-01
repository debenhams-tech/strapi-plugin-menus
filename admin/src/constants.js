import pluginId from './utils/plugin-id';

export const ACTION_RESOLVE_CONFIG = `${pluginId}/resolve-config`;

export const DRAG_ITEM_TYPES = {
  RELATION: 'relation',
};

export const STRAPI_HEADER_HEIGHT = 96;

export const UID_MENU = 'plugin::menus.menu';
export const UID_MENU_ITEM = 'plugin::menus.menu-item';

// eslint-disable-next-line prefer-regex-literals
export const URL_ABSOLUTE_REGEX =
  /^https?:\/\/(www\.)?[-\p{L}0-9@:%._\+~#=]{1,256}\.[\p{L}0-9()]{1,6}\b([-\p{L}0-9()@:%_\+.~#?&//=]*)$/u;

// eslint-disable-next-line prefer-regex-literals
export const URL_RELATIVE_REGEX = /^([-\p{L}0-9()@:%_\+.~#?&//=]*)$/u;

// eslint-disable-next-line prefer-regex-literals
export const URL_MAILTO_REGEX = new RegExp('^mailto:(.*)@(.*)\\.(.*)$', 'i');

// eslint-disable-next-line prefer-regex-literals
export const URL_TEL_REGEX = new RegExp('^tel:(\\+|\\d)[\\d\\-]+$', 'i');
