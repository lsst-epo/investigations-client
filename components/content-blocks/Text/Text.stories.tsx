import { Meta, StoryObj } from "@storybook/react";

import Text from ".";

const meta: Meta<typeof Text> = {
  component: Text,
  argTypes: {
    text: {
      description:
        "Plaintext or HTML to be displayed within the content block.",
      table: {
        type: {
          summary: "ReactNode",
        },
      },
    },
  },
};
export default meta;

export const Primary: StoryObj<typeof Text> = {
  args: {
    text: `<h1>Header 1</h1>
    <p>
      Cosmic ipsum elliptical orbit red dwarf white giant minor planet cislunar
      telemetry syzygy limb rings gamma ray outer planets hydrogen local group
      binary star H-R diagram planetary nebula perturbation revolve supernova solar
      escape velocity apogee scintillation partial eclipse star crescent moon
      geosynchronous gibbous moon planetoid terrestrial full moon celestial equator
      perigee occultation gas giant planisphere universe crater seeing equinox
      totality astronomer helium inertia apastron starlight ionosphere constellation
    </p>
    <h2>Paragraph</h2>
    <p>
      Limb vernal equinox meridian celestial coordinates north star synodic Uranus
      Kuiper belt observatory nadir shooting star planisphere cluster eclipse
      geosynchronous waxing big bang theory Doppler shift new moon Hubble's law
      spectrum aperature white dwarf Oort cloud Milky Way corona wavelength parsec
      astronomical unit parallax outer planets gegenschein planetary nebula quarter
      moon half moon minor planet translunar ionosphere lens declination Deneb red
      giant star probe phase gravitational lens constellation mass retrograde
    </p>
    <h3>Links</h3>
    <p>Some sample content <a href="https://rubinobs.org/">with a link</a></p>
    <h4>Lists</h4>
    <ul>
      <li>Limb</li>
      <li>vernal</li>
      <li>equinox</li>
    </ul>
    <ol>
      <li>celestial</li>
      <li>coordinates</li>
      <li>north</li>
    </ol>`,
  },
};
