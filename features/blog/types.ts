export interface Author {
  name: string;
  picture: string;
}

export interface OGImage {
  url: string;
}

export interface Post {
  slug: string;
  title: string;
  author: Author;
  date: string;
  content: string;
  excerpt: string;
  ogImage: OGImage;
  draft?: boolean;
}
