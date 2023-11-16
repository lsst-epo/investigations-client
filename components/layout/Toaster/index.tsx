import {
  FunctionComponent,
  PropsWithChildren,
  ReactNode,
  useEffect,
  useRef,
  useState,
} from "react";
import IconComposer from "@rubin-epo/epo-react-lib/IconComposer";
import * as Styled from "./styles";

interface Message {
  icon?: string;
  title: string;
  text: string;
  additionalContent?: ReactNode;
}

interface ToasterProps {
  forIds: string[];
  isVisible: boolean;
  message?: Message;
  onCloseCallback: () => void;
}

const Toaster: FunctionComponent<ToasterProps> = ({
  forIds,
  isVisible = false,
  message,
  onCloseCallback,
}) => {
  const [toastVisible, setToastVisible] = useState(false);
  const timers = useRef<Array<ReturnType<typeof setTimeout>>>([]);
  const toastDelay = 300;
  const toastTime = 6000;

  const clearTimers = () => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
  };

  useEffect(() => {
    if (isVisible) {
      setToastVisible(true);

      timers.current.push(
        setTimeout(() => {
          setToastVisible(false);
        }, toastTime)
      );
      timers.current.push(
        setTimeout(() => {
          onCloseCallback && onCloseCallback();
        }, toastTime + toastDelay * 2)
      );
    }

    return () => clearTimers();
  }, [isVisible]);

  const handleCloseToast = () => {
    if (isVisible) {
      setToastVisible(false);

      clearTimers();

      setTimeout(() => onCloseCallback && onCloseCallback(), toastDelay);
    }
  };

  const { title, icon, text, additionalContent } = message || {};

  return (
    <Styled.Toaster
      data-visible={toastVisible}
      style={{
        "--toast-time": `${toastTime}ms`,
        "--toast-delay": `${toastDelay}ms`,
      }}
    >
      <Styled.Toast forIds={forIds}>
        <Styled.ToastContent>
          {icon && (
            <Styled.ToastIcon>
              <IconComposer size="1em" icon={icon} />
            </Styled.ToastIcon>
          )}
          <Styled.ToastText>
            <h3>{title}</h3>
            <p>{text}</p>
            {additionalContent}
          </Styled.ToastText>
        </Styled.ToastContent>
        <Styled.CloseToast onClick={() => handleCloseToast()} type="button">
          <IconComposer size="1em" icon="close" />
        </Styled.CloseToast>
      </Styled.Toast>
    </Styled.Toaster>
  );
};

Toaster.displayName = "Layout.Toaster";

export default Toaster;
