import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Link from "next/link";
import { usePathData } from "@/hooks";
import { normalizePathData } from "@/lib/utils";
import * as Styled from "./styles";

const NavButtons = ({
  hasDefault = true,
  linkLeft,
  linkRight,
  textLeft,
  textRight,
}) => {
  const { asPath, query } = usePathData();
  const { pathname, pathParams } = normalizePathData(asPath);
  const [activeType, setActiveType] = useState();

  useEffect(() => {
    setActiveType(query.type);
  }, [query]);

  return (
    <Styled.Nav>
      <Link
        href={{
          pathname,
          query: { ...pathParams, page: 1, type: linkLeft },
        }}
        passHref={true}
      >
        <Styled.NavButton
          active={
            hasDefault ? activeType !== linkRight : activeType === linkLeft
          }
          onClick={() => setActiveType(linkLeft)}
        >
          {textLeft}
        </Styled.NavButton>
      </Link>
      <Link
        href={{
          pathname,
          query: { ...pathParams, page: 1, type: linkRight },
        }}
        passHref={true}
      >
        <Styled.NavButton
          active={activeType === linkRight}
          onClick={() => setActiveType(linkRight)}
        >
          {textRight}
        </Styled.NavButton>
      </Link>
    </Styled.Nav>
  );
};

NavButtons.propTypes = {
  hasDefault: PropTypes.bool,
  linkLeft: PropTypes.string,
  linkRight: PropTypes.string,
  textLeft: PropTypes.string,
  textRight: PropTypes.string,
};

export default NavButtons;
