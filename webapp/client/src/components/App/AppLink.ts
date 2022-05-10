export class AppLink {
  title: string;
  url: string;
  icon: any; //TODO: set to JSX element
  type: string;

  constructor(title: string, url: string, icon: any = undefined, type = 'app') {
    this.title = title;
    this.url = url;
    this.icon = icon;
    this.type = type;
  }
}
