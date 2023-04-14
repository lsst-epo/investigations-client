export default interface BaseContentBlockProps {
  title?: string;
  pageId: string;
  hasModal?: boolean;
  isOpen?: boolean;
  openModal?: () => void;
  closeModal?: () => void;
}
