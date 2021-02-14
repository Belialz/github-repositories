export class ItemEntity {
  title: string;
  avatar: string;
  language: string;
  description: string;
  url: string;
  isFavorite: boolean;

  constructor(data?) {
    if(data) {
      this.title = data.title;
      this.avatar = data.avatar;
      this.language = data.language;
      this.description = data.description;
      this.url = data.url;
      this.isFavorite = data.isFavorite;
    }
  }

  isContain(value: string): boolean {
    let titleInclude, descriptionInclude = true;

    if (this.title)
    {
      titleInclude = this.title.includes(value);
    }
    if (this.description) {
      descriptionInclude = this.description.includes(value);
    }
    return titleInclude || descriptionInclude;
  }
}
