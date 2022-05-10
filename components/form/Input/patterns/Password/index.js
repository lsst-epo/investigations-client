import { forwardRef, useState } from "react";
import { useTranslation } from "react-i18next";
import IconComposer from "@/components/svg/IconComposer";
import * as Styled from "./styles";

function Password(inputProps, ref) {
  const [show, setShow] = useState(false);

  const { t } = useTranslation();

  return (
    <Styled.Wrapper>
      <Styled.Input
        ref={ref}
        type={show ? "text" : "password"}
        {...inputProps}
      />
      <Styled.Toggle
        type="button"
        aria-controls={inputProps.id}
        aria-selected={show}
        onClick={() => setShow(!show)}
      >
        <span className="a-hidden">
          {show ? t("form.hide_password") : t("form.show_password")}
        </span>
        <IconComposer icon="eye" />
      </Styled.Toggle>
    </Styled.Wrapper>
  );
}

export default forwardRef(Password);
