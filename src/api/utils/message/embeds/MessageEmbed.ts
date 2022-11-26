export class MessageEmbed {
  private title?: string;
  private type?: string;
  private description?: string;
  private url?: string;
  private timestamp?: Date;
  private color?: number | string;

  constructor(
    title?: string,
    type?: string,
    description?: string,
    url?: string,
    timestamp?: Date,
    color?: number
  ) {
    this.title = title;
    this.type = type;
    this.description = description;
    this.url = url;
    this.timestamp = timestamp;
    this.color = color;
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
  setType(type: string | undefined): MessageEmbed {
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

  getUrl(): string | undefined {
    return this.url;
  }
  setUrl(url: string | undefined) {
    this.url = url;
    return this;
  }

  getTimestamp(): Date | undefined {
    return this.timestamp;
  }
  setTimestamp(timestamp?: Date | undefined) {
    if (timestamp) this.timestamp = timestamp;
    else this.timestamp = new Date();
    return this;
  }

  getColor(): number | string | undefined {
    return this.color;
  }
  setColor(color: number | undefined) {
    this.color = color;
    return this;
  }
}
