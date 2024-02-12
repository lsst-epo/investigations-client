import ModalProps from "./modal";

export default interface BaseContentBlockProps<T = any> extends ModalProps {
  data: T;
  pageId?: string;
  locale: string;
  site: string;
  isInteraction?: boolean;
}
