import { FunctionComponent } from "react";
import LanguageSelect from "./LanguageSelect";

const Header: FunctionComponent = () => {
  return <LanguageSelect id="langSelect" />;
};

Header.displayName = "Global.Header";

export default Header;
