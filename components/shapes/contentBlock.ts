export default interface BaseContentBlockProps {
  title?: string;
  pageId?: string;
  hasModal?: boolean;
  isOpen?: boolean;
  locale: string;
  openModal?: () => void;
  closeModal?: () => void;
}
