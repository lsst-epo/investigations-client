export interface RawImage {
  url: {
    directUrlPreview: string;
    directUrlOriginal: string;
    preview: string;
  };
  width: number;
  height: number;
  metadata: Record<string, string>;
}

export interface Image {
  altText?: string;
  caption?: string;
  credit?: string;
  width?: number;
  height?: number;
  url: string;
  url2x?: string;
  url3x?: string;
  thumb?: string;
  thumb2x?: string;
  className?: string;
  focalPointX?: number;
  focalPointY?: number;
}
