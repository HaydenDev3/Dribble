import { MessageEmbed } from "./embeds/MessageEmbed";

export interface MessageOptions {
  content?: string;
  tts?: boolean;
  embeds?: APIEmbed[] | MessageEmbed[];
  components?: APIComponentRow[];
}

export class APIComponentRow {
  type: number = 1;
  components: Component[] = [];
};

export interface Component {
  type: ComponentType;
  style?: ButtonStyle;
  custom_id?: string;
  options?: SelectMenuOption[];
  placeholder?: string;
  label?: string;
}

export interface SelectMenuOption {
  value: string;
  label: string;
  description?: string;
  emoji?: string | any;
}

export interface APIEmbed {
  title: string;
  description: string;
  color: number;
  thumbnail: string | null;
  image: string | null;
  author: APIEmbedAuthorData | null;
  footer: APIEmbedFooterData | null;
  type: "rich";
  timestamp: Date;
  url: string;
};

export interface APIEmbedAuthorData {
  name: string | null;
  icon_url?: string | null;
  proxy_icon_url?: string | null;
}

export interface APIEmbedFooterData {
  text: string;
  icon_url?: string | null;
  proxy_icon_url?: string | null;
}

export enum ButtonStyle {
  Primary = 1,
  Secondary = 2,
  Success = 3,
  Danger = 4
}

export enum ComponentType {
  Button = 1,
  SelectMenu = 3
}
export interface MessageDeleteOptions {
  timeout?: number;
  reason?: string;
}
