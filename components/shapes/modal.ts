export default interface ModalProps {
  title?: string;
  isOpen?: boolean;
  hasModal?: boolean;
  openModal?: () => void;
  closeModal?: () => void;
}
