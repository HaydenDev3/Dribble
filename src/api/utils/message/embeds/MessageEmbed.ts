import {
  APIEmbed,
  APIEmbedAuthorData,
  APIEmbedFooterData,
  APIEmbedImageData,
  APIEmbedThumbnailData,
  APIEmbedType
} from "../MessageOptions";
import { Color } from "../../Constants";

export class MessageEmbed implements Partial<APIEmbed> {
  public title?: string;
  public description?: string;
  public color?: Color | number | string;
  public thumbnail?: APIEmbedThumbnailData | null;
  public image?: APIEmbedImageData | null;
  public author?: APIEmbedAuthorData | null;
  public footer?: APIEmbedFooterData | null;
  public type?: "rich" | APIEmbedType | string;
  public timestamp?: Date | string;
  public url?: string;

  constructor(
    title?: string,
    description?: string,
    color?: Color | number | string,
    thumbnail?: APIEmbedThumbnailData | null,
    image?: APIEmbedImageData | null,
    author?: APIEmbedAuthorData | null,
    footer?: APIEmbedFooterData | null,
    type?: "rich" | APIEmbedType | string,
    timestamp?: Date | string,
    url?: string

  ) {
    this.title = title;
    this.description = description;
    this.color = color;
    this.thumbnail = thumbnail;
    this.image = image;
    this.author = author;
    this.footer = footer;
    this.type = type;
    this.timestamp = timestamp;
    this.url = url;
  }

  getTitle(): string | undefined {
    return this.title;
  }
  setTitle(title: string | undefined): MessageEmbed {
    this.title = title;
    return this;
  }

  getType(): string | undefined {
    return this.type;
  }
  setType(type: APIEmbedType | string): MessageEmbed {
    this.type = type;
    return this;
  }

  getDescription(): string | undefined {
    return this.description;
  }
  setDescription(description: string) {
    this.description = description;
    return this;
  }

  getColor(): number | string | undefined {
    return this.color;
  }
  setColor(color: Color | number | undefined) {
    this.color = color;
    return this;
  }

  getThumbnail(): APIEmbedThumbnailData | null | void {
    return this.thumbnail;
  }
  setThumbnail(options: APIEmbedThumbnailData | string) {
    if (typeof options === "string") {
      options = { url: options, proxy_url: undefined, height: undefined, width: undefined };
    };
    this.thumbnail = options;
    return this;
  }

  getImage(): APIEmbedImageData | null | void {
    return this.image;
  }
  setImage(options: APIEmbedImageData | string) {
    if (typeof options === "string") {
      options = { url: options, proxy_url: undefined, height: undefined, width: undefined };
    };
    this.image = options;
    return this;
  }

  getAuthor(): APIEmbedAuthorData | null | void {
    return this.author;
  }
  setAuthor(options: APIEmbedAuthorData | string) {
    if (typeof options === "string") {
      options = { name: options, icon_url: undefined, proxy_icon_url: undefined};
    };
    this.author = options;
    return this;
  }

  getFooter(): APIEmbedFooterData | null | void {
    return this.footer;
  }
  setFooter(options: APIEmbedFooterData | string) {
    if (typeof options === "string") {
      options = { text: options, icon_url: undefined, proxy_icon_url: undefined };
    };
    this.footer;
    return this;
  }

  getTimestamp(): Date | undefined | string {
    this.timestamp = Date.now().toLocaleString();
    return this.timestamp;
  }
  setTimestamp(timestamp?: Date | undefined) {
    this.timestamp = new Date(timestamp ?? Date.now()).toISOString();
    return this;
  }

  getUrl(): string | undefined {
    return this.url;
  }
  setUrl(url: string | undefined) {
    this.url = url;
    return this;
  }
  protected static toJSON() {
    return JSON.stringify({ ...this });
  }
}
