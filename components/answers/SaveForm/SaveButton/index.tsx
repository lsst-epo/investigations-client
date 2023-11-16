import { FunctionComponent } from "react";
import { useFormStatus } from "react-dom";
import { useTranslation } from "react-i18next";
import IconComposer from "@rubin-epo/epo-react-lib/IconComposer";
import * as Styled from "./styles";

const SaveButton: FunctionComponent = () => {
  const { pending } = useFormStatus();
  const { t } = useTranslation();

  return (
    <Styled.SaveButton disabled={pending} type="submit">
      <Styled.SaveIcon>
        <IconComposer icon="FloppyDisk" size="1.5em" />
      </Styled.SaveIcon>
      {t("answers.save_form.submit")}
    </Styled.SaveButton>
  );
};

SaveButton.displayName = "Answers.Save.Button";

export default SaveButton;
