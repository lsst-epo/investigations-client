import PropTypes from "prop-types";
import styled from "styled-components";
import GlobalDataContext from "@/contexts/GlobalData";
import HtmlHead from "@/global/HtmlHead";

export default function Body({ children, title }) {
  return (
    <GlobalDataContext.Consumer>
      {({ siteInfo, headerNavItems }) => {
        const { siteTitle, siteDescription, handle, language, name } = siteInfo;

        return (
          <>
            <HtmlHead title={title} siteInfo={siteInfo} />
            <WideWidthContainer>
              <main id="page-content">{children}</main>
            </WideWidthContainer>
          </>
        );
      }}
    </GlobalDataContext.Consumer>
  );
}

const WideWidthContainer = styled.div`
  max-width: 2000px;
  width: 100%;
  margin-left: auto;
  margin-right: auto;
`;
Body.displayName = "Global.Body";

Body.propTypes = {
  children: PropTypes.node,
  title: PropTypes.string.isRequired,
};
