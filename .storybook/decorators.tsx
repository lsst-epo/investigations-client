import React from "react";
import { Decorator } from "@storybook/react";
import { GlobalStyles } from "@rubin-epo/epo-react-lib";

const withTheme: Decorator = (StoryFn) => {
  return (
    <>
      <GlobalStyles />
      {StoryFn()}
    </>
  );
};

// export all decorators that should be globally applied in an array
export default [withTheme];
