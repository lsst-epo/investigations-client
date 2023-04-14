import { Meta, StoryObj } from "@storybook/react";

import Modal from ".";

const meta: Meta<typeof Modal> = {
  component: Modal,
  argTypes: {},
};
export default meta;

const data = {
  image: {
    altText:
      "Wide view of Rubin Observatory with the telescope mount visible through the open dome",
    url: "https://rubin.canto.com/direct/image/o7j607sgdt6690c5rpken97r6n/NAvYOhoG30hYEfRUDUJYPKcz2q8/original?content-type=image%2Fjpeg&name=Rubin+December+2022.jpg",
  },
  caption:
    "A view of Rubin Observatory in December 2022. A view of Rubin Observatory at twilight with the telescope mount visible through the open dome",
};

export const Primary: StoryObj<typeof Modal> = {
  args: {
    buttonText: "These types of buttons launch pages",
    childBlock: { type: "image", data },
    pageId: "testPage",
  },
};
