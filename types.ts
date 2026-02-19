
export interface BlogMeta {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  author: string;
  slug: string;
  content: string;
}

export interface ImageFile {
  id: string;
  file: File;
  preview: string;
}
