export default interface BaseContentBlockProps<T = any> {
  data: T;
  title?: string;
  pageId?: string;
  hasModal?: boolean;
  isOpen?: boolean;
  locale: string;
  site: string;
  isInteraction?: boolean;
  openModal?: () => void;
  closeModal?: () => void;
}
