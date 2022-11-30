export default class Log {
  private static getSource(src?: string) {
    return src?.toUpperCase() || "LAUNCHER";
  }

  static info(message: string, src?: string) {
    console.log(
      `[${this.getTime(new Date())}] INFO [${this.getSource(src)}] ${message}`.green.bold
    );
  }

  static error(err: any, src?: string) {
    const message = err.stack || err || "Unknown Error";
    console.log(
      `[${this.getTime(new Date())}] FAILED LAUNCH [${this.getSource(
        src
      )}] ${message}`.bgRed.grey
    );
  }

  static warn(err: any, src?: string) {
    const message = err.stack || err || "Unknown Error";
    console.log(
      `[${this.getTime(new Date())}] WARNING [${this.getSource(
        src
      )}] ${message}`.yellow.dim
    );
  }

  private static getTime(date: Date) {
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();
    return `${hours}:${minutes}:${seconds}`;
  }
}
