export interface CantoVideo {
  url: {
    directUrlPreview: string;
    directUrlPreviewPlay: string;
  };
  width: string;
  height: string;
  metadata: Record<string, string>;
}

export interface Video {
  altText?: string;
  caption?: string;
  credit?: string;
  width?: number;
  height?: number;
  url: string;
  thumbnail?: string;
}
