/* eslint-disable */
import styled from "styled-components";
import MixedLink from "@/atomic/MixedLink";
import {
  BREAK_PHABLET,
  BREAK_PHABLET_MIN,
  BREAK_TABLET,
  BREAK_TABLET_MIN,
  respond,
} from "@/styles/globalStyles";

/*
Media queries are done this way for special treatment at tablet level vs phone level...
@media (max-width: ${BREAK_PHABLET}) {}
@media (min-width: ${BREAK_PHABLET_MIN}) and (max-width: ${BREAK_TABLET}) {}
*/

export const StyledMixedLink = styled(MixedLink)`
  position: relative;
  display: grid;
  grid-template-columns: 1fr;
  text-decoration: none;
  grid-gap: 10px;

  padding: 0;
  align-content: start;

  // set the grid areas for various bits
  .image {
    grid-area: image;
  }
  .pretitle {
    grid-area: pretitle;
  }
  .title {
    grid-area: title;
  }
  .subtitle {
    grid-area: subtitle;
  }
  .text {
    grid-area: text;
  }
  .footer {
    grid-area: footer;
  }

  /* FEATURED, only different for desktop */
  &.featured {
    ${respond(
      `
      grid-template-areas:
        "image pretitle"
        "image title"
        "image subtitle"
        "image text"
        "image footer";
      grid-template-columns: 1fr 1fr;
      grid-template-rows: repeat(3, auto) 1fr auto;
      grid-column-gap: 30px;

      .image {
        overflow: hidden;
        min-height: 300px;
      }

      img {
        position: absolute;
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
`,
      BREAK_TABLET_MIN,
      "min"
    )}
  }

  /* CTA */
  &.cta {
    grid-template-areas:
      "image"
      "title";
    grid-row-gap: 0;
    justify-items: center;
    border-radius: 16px;
    background-color: var(--turquoise55);
    color: var(--white);

    .image {
      overflow: hidden;
      border-top-left-radius: 16px;
      border-top-right-radius: 16px;
      transition: opacity 0.2s;
    }

    .title {
      padding: 20px 0;
      font-size: 16px;
      font-weight: 700;
      text-align: center;
    }

    .text {
      display: none;
    }

    @media (max-width: ${BREAK_PHABLET}) {
      grid-template: auto / 100px 2fr;
      grid-template-areas: "image title title";
      color: var(--turquoise55);
      background-color: var(--white);

      .image {
        height: 100px;
        border-radius: 16px;

        img {
          width: 100px;
          height: 100px;
        }
      }

      .title {
        text-align: left;
        align-self: center;
        justify-self: left;
      }
    }
    @media (min-width: ${BREAK_PHABLET_MIN}) and (max-width: ${BREAK_TABLET}) {
    }
  }

  /* darkSlides */
  &.darkSlideStaff,
  &.darkSlide {
    padding: 30px;

    .image {
      position: relative;
      opacity: 1;
      transition: filter 0.2s, opacity 0.2s;
    }

    .pretitle {
      font-size: 16px;
      font-weight: 700;
    }

    .title {
      font-size: 24px;
      font-weight: 800;
      line-height: 1.2;
    }

    .subtitle {
      font-size: 16px;
      font-weight: 700;
    }

    .text {
      font-size: 18px;
    }

    @media (max-width: ${BREAK_TABLET}) {
      grid-template-areas:
        "image"
        "pretitle"
        "title"
        "text";
      grid-template-columns: 1fr;
      grid-row-gap: 0px;
      padding: 0px;

      && .image > div {
        padding-top: 50%;
      }

      .pretitle {
        padding: 0.5rem 0;
        font-weight: normal;
      }

      .title {
        padding: 0 0 1rem;
        font-size: 20px;
      }

      .subtitle {
        display: none;
      }
      && .footer {
        display: none;
      }
    }
    @media (max-width: ${BREAK_PHABLET}) {
      .text {
        display: none;
      }
    }
  }

  /* slideshows and news */
  &.slideshows:not(.featured),
  &.news:not(.featured) {
    grid-template-areas:
      "image"
      "pretitle"
      "title"
      "subtitle"
      "text"
      "footer";
    grid-template-rows: repeat(4, auto) 1fr auto;
  }

  /* note the extra specificity below */
  &&.slideshows,
  &&.news {
    padding: 30px;

    .image {
      position: relative;
      opacity: 1;
      transition: filter 0.2s, opacity 0.2s;
    }

    .pretitle {
      font-size: 16px;
      font-weight: 700;
    }

    .title {
      font-size: 24px;
      font-weight: 800;
      line-height: 1.2;
    }

    .subtitle {
      font-size: 16px;
      font-weight: 700;
    }

    .text {
      font-size: 18px;
    }

    @media (max-width: ${BREAK_PHABLET}) {
      grid-template-areas:
        "image"
        "pretitle"
        "title"
        "subtitle"
        "text"
        "footer";
      grid-template-rows: repeat(4, auto) 1fr auto;
      grid-gap: 0;
      padding: 0px;

      && .image > div {
        padding-top: 50%;
      }

      .pretitle {
        padding: 0.5rem 20px;
        font-weight: normal;
      }

      .title {
        padding: 0 20px 1rem;
        font-size: 20px;
      }

      .subtitle {
        display: none;
      }

      .text {
        display: none;
      }

      && .footer {
        display: none;
      }
    }
    @media (min-width: ${BREAK_PHABLET_MIN}) and (max-width: ${BREAK_TABLET}) {
      grid-template: repeat(3, max-content) auto / 1fr 2fr;
      grid-template-areas:
        "image pretitle"
        "image title"
        "image subtitle"
        "image text"
        "footer text";

      .image {
        > div {
          padding-top: 100%;
        }
      }
      .footer {
        > div {
          position: absolute;
          top: 10px;
          right: 10px;
        }
      }
    }
  }

  /* darkSlide / slideshows make black */
  &.slideshows,
  &.darkSlide {
    background-color: var(--black);
    color: var(--white);
  }

  /* darkSlideStaff only */
  &.darkSlideStaff {
    background-color: var(--black);
    color: var(--white);
    grid-template-areas:
      "title image"
      "text image"
      "footer image";

    grid-template-columns: 2fr 1fr;
    grid-column-gap: 40px;

    .image {
      clip-path: circle(50%);
      max-width: 300px;
    }

    .text {
      padding-top: 10px;
    }

    @media (max-width: ${BREAK_TABLET}) {
      grid-template-areas:
        "image"
        "title"
        "text";
      grid-template-columns: 1fr;

      grid-row-gap: 20px;
      place-items: center;
      .image {
        width: 80vw;
      }
      .title {
        font-size: 24px;
      }
    }
  }

  /* events */
  &.events {
    grid-template-areas:
      "image pretitle footer subtitle"
      "image title title subtitle"
      "image text text subtitle";
    grid-template-columns: 200px 1fr max-content 150px;

    .image {
      margin-right: 30px;
    }

    .pretitle {
      align-self: end;
      font-size: 16px;
      font-weight: 700;
    }

    .title {
      font-size: 20px;
      font-weight: 700;
    }

    .text {
      font-size: 18px;
      font-weight: 400;
    }

    .subtitle {
      display: grid;
      align-items: center;
      padding: 1em;
      text-align: center;
      color: var(--neutral80);
      background-color: var(--neutral10);
    }

    .footer {
      display: grid;
      grid-auto-flow: column;
      grid-template: auto / auto;
      align-items: center;
      justify-self: end;
      grid-gap: 4px;
      padding: 0 10px;
      margin-right: -10px;
      font-size: 14px;
      font-weight: 700;
      white-space: nowrap;
      color: var(--neutral80);

      svg {
        position: relative;
        color: var(--neutral60);
      }
    }

    &.closed {
      .footer {
        background-color: #e6e6e8;
      }
    }

    &.open {
      .footer {
        background-color: var(--turquoise10);
      }
    }

    @media (max-width: ${BREAK_PHABLET}) {
      grid-template-areas:
        "pretitle footer subtitle"
        "title title subtitle";
      grid-template-columns: 1fr max-content max-content;
      grid-template-rows: max-content auto;

      .image {
        display: none;
      }

      .pretitle {
        font-weight: 400;
        font-size: 20px;
      }

      .text {
        display: none;
      }

      .subtitle {
        width: min-content;
      }

      .footer {
        span {
          display: none;
        }
      }
    }
    @media (min-width: ${BREAK_PHABLET_MIN}) and (max-width: ${BREAK_TABLET}) {
      grid-template-areas:
        "pretitle footer subtitle"
        "title title subtitle"
        "text text subtitle";
      grid-template-columns: 1fr max-content max-content;
      .image {
        display: none;
      }
      .subtitle {
        width: min-content;
      }

      .footer {
        span {
          display: none;
        }
      }
    }
  }

  /* jobs */
  &.jobs {
    grid-template-areas:
      "pretitle footer"
      "title title"
      "subtitle subtitle";
    padding: 0 0 30px 30px;
    background-color: var(--turquoise10);

    .pretitle {
      padding-top: 30px;
      font-size: 16px;
      font-weight: 700;
    }

    .title {
      font-size: 24px;
      font-weight: 800;
      line-height: 1.2;
    }

    .subtitle {
      font-size: 16px;
      font-weight: 400;

      svg {
        position: relative;
        left: -4px;
        align-self: flex-start;
      }
    }

    .footer {
      display: grid;
      grid-auto-flow: column;
      grid-template: auto / auto;
      place-items: center;
      padding: 10px;
      font-size: 14px;
      font-weight: 700;
      color: var(--black);
      background-color: var(--turquoise20);
    }

    &.closed {
      background-color: var(--neutral10);

      &:hover {
        color: var(--black);
        background-color: var(--neutral20);
      }
      .footer {
        background-color: var(--neutral15);
      }
    }

    @media (max-width: ${BREAK_TABLET}) {
      .footer {
        span {
          display: none;
        }
      }
    }
    @media (max-width: ${BREAK_PHABLET}) {
      padding: 0 0 20px 20px;
      .pretitle {
        font-weight: normal;
        font-size: 18px;
      }
      .title,
      .subtitle {
        font-size: 18px;
      }
    }
  }

  /* news */
  &&.news {
    background-color: var(--neutral10);
    color: var(--neutral80);
    .footer {
      display: grid;
      grid-template-columns: max-content 1fr;
      place-items: end;
      margin-top: 15px;
      > div {
        color: var(--neutral40);
      }
    }
  }

  /* pages */
  &.pages {
    grid-template-areas:
      "image"
      "subtitle"
      "title"
      "text";
    .image {
      width: 100%;
      opacity: 1;
      transition: filter 0.2s, opacity 0.2s;
    }

    .title {
      font-size: 18px;
      font-weight: 800;
      color: var(--neutral80);
    }

    .text {
      font-size: 18px;
    }

    @media (max-width: ${BREAK_PHABLET}) {
      background-color: var(--neutral10);
      grid-template-rows: minmax(0, max-content) max-content;

      .title,
      .subtitle {
        padding-left: 10px;
      }

      .title {
        padding-bottom: 10px;
      }

      .text {
        display: none;
      }
    }
    @media (min-width: ${BREAK_PHABLET_MIN}) and (max-width: ${BREAK_TABLET}) {
      grid-template: minmax(0, max-content) max-content auto / 1fr 2fr;
      grid-template-areas:
        "image subtitle"
        "image title"
        "image text"
        "image text";

      .image {
        > div {
          padding-top: 100%;
        }
      }
    }
  }

  /* search */
  &.search {
    grid-template-areas:
      "image pretitle"
      "image title"
      "image text"
      "image subtitle";
    grid-template-columns: 200px 1fr;
    border: 1px solid var(--neutral10);
    padding: 1em;
    .image {
      margin-right: 30px;
    }

    .pretitle {
      font-size: 16px;
      font-weight: 700;
      li:last-of-type {
        display: none;
      }
    }

    .title {
      font-size: 20px;
      font-weight: 700;
    }

    .text {
      font-size: 18px;
      font-weight: 400;
    }
    .subtitle {
      font-size: 16px;
      font-weight: 700;
    }

    @media (max-width: ${BREAK_TABLET}) {
      grid-template-areas:
        "pretitle"
        "title"
        "text"
        "subtitle";
      grid-template-columns: 1fr;
      .image {
        display: none;
      }
    }
    @media (max-width: ${BREAK_PHABLET}) {
      .pretitle {
        font-weight: normal;
        font-size: 18px;
        a {
          font-weight: normal;
          font-size: 18px;
        }
        ul {
          display: inline;
        }
        li + li:after {
          padding-left: 20px;
          content: ">";
        }
      }
      .title {
        font-size: 18px;
      }
      .subtitle,
      .text {
        display: none;
      }
    }
  }

  /* slideshows */
  &&.slideshows {
    @media (min-width: ${BREAK_PHABLET_MIN}) and (max-width: ${BREAK_TABLET}) {
      grid-template: repeat(2, max-content) auto / 1fr 2fr;
      grid-template-areas:
        "image pretitle"
        "image title"
        "image text"
        "footer text";
    }
  }

  /* staff */
  &.staffProfiles {
    grid-template-areas:
      "image"
      "text"
      "title";
    padding: 24px;
    justify-items: center;
    align-items: start;
    background-color: var(--neutral10);

    .image {
      clip-path: circle(50%);
      order: 1;
    }

    .title {
      order: 3;
      font-size: 20px;
      font-weight: 700;
      line-height: 1rem;
      text-align: center;
    }

    .text {
      order: 2;
      padding-top: 10px;
      font-size: 14px;
      font-weight: 700;
      text-align: center;
    }

    @media (max-width: ${BREAK_PHABLET}) {
      grid-template: auto auto / 1fr 2fr;
      grid-template-areas:
        "image text text"
        "image title title";
      grid-column-gap: 10px;
      padding: 20px;

      .image {
        margin-right: 10px;
      }

      .title {
        justify-self: left;
        font-size: 16px;
      }

      .text {
        align-self: end;
        justify-self: left;
        font-size: 16px;
      }
    }
  }

  /* HOVER STATES */
  transition: color 0.2s, background-color 0.2s;
  &.pages:hover,
  &.pages:focus-visible,
  &.darkSlide:hover,
  &.darkSlide:focus-visible,
  &.search:hover,
  &.search:focus-visible,
  &.slideshows:hover,
  &.slideshows:focus-visible,
  &.news:hover,
  &.news:focus-visible {
    .image {
      filter: invert(25%) sepia(80%) saturate(102%) hue-rotate(130deg)
        brightness(100%) contrast(100%);
      outline: none;
      opacity: 0.7;
    }
    .title {
      color: var(--turquoise60);
    }
  }

  &:hover,
  &:focus-visible {
    &.pages,
    &.news,
    &.search,
    &.slideshows,
    &.darkSlide {
      color: var(--turquoise55);
    }
    &.events,
    &.jobs {
      color: var(--white);
    }
    &.cta {
      .image {
        outline: none;
        opacity: 0.7;
      }
    }
    &.staffProfiles {
      background-color: var(--neutral20);
    }
    &.events {
      background-color: var(--turquoise55);
    }
    &.jobs {
      background-color: var(--turquoise50);
    }
  }
`;

export const PlayButton = styled.span`
  position: absolute;
  display: block;
  width: 6%;
  height: auto;
  min-width: 40px;
  min-height: 40px;
  color: var(--white);
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  &:hover {
    color: var(--neutral15);
  }
  svg {
    width: 100%;
    height: 100%;
    min-width: 40px;
    min-height: 40px;
  }
`;
