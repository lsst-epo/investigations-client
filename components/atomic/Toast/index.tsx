import { FunctionComponent } from "react";
import { ToastContentProps } from "react-toastify";

interface GenericToastProps {
  title: string;
  body: string;
  icon?: string;
}

const Toast: FunctionComponent<ToastContentProps<GenericToastProps>> = ({
  closeToast,
  toastProps,
  data,
}) => {
  return (
    <>
      <h3>{data?.title}</h3>
      <p>{data?.body}</p>
    </>
  );
};

Toast.displayName = "Atomic.Toast";

export default Toast;
