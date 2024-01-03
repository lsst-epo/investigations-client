"use client";
import styled from "styled-components";
import { ToastContainer } from "react-toastify";

export default styled(ToastContainer)`
  --toastify-color-light: #dce0e3;
  /* --toastify-color-dark: #121212; */
  /* --toastify-color-info: #3498db; */
  /* --toastify-color-success: #07bc0c; */
  /* --toastify-color-warning: #f1c40f; */
  /* --toastify-color-error: #e74c3c; */
  /* --toastify-color-transparent: rgba(255, 255, 255, 0.7); */

  /* --toastify-icon-color-info: var(--toastify-color-info); */
  /* --toastify-icon-color-success: var(--toastify-color-success); */
  /* --toastify-icon-color-warning: var(--toastify-color-warning); */
  /* --toastify-icon-color-error: var(--toastify-color-error); */

  --toastify-toast-width: 100%;
  --toastify-toast-background: #dce0e3;
  /* --toastify-toast-min-height: 64px; */
  /* --toastify-toast-max-height: 800px; */
  --toastify-font-family: var(--FONT_STACK_BASE);
  /* --toastify-z-index: 9999; */

  --toastify-text-color-light: var(--neutral95, #1f2121);
  /* --toastify-text-color-dark: #fff; */

  //Used only for colored theme
  /* --toastify-text-color-info: #fff; */
  /* --toastify-text-color-success: #fff; */
  /* --toastify-text-color-warning: #fff; */
  /* --toastify-text-color-error: #fff; */

  /* --toastify-spinner-color: #616161; */
  /* --toastify-spinner-color-empty-area: #e0e0e0; */

  // Used when no type is provided
  // toast("**hello**")
  /* --toastify-color-progress-light: linear-gradient(
    to right,
    #4cd964,
    #5ac8fa,
    #007aff,
    #34aadc,
    #5856d6,
    #ff2d55
  ); */
  // Used when no type is provided
  /* --toastify-color-progress-dark: #bb86fc; */
  /* --toastify-color-progress-info: var(--toastify-color-info); */
  /* --toastify-color-progress-success: var(--toastify-color-success); */
  /* --toastify-color-progress-warning: var(--toastify-color-warning); */
  /* --toastify-color-progress-error: var(--toastify-color-error); */

  /** Used to define container behavior: width, position: fixed etc... **/
  &.Toastify__toast-container {
    padding: 0;
  }

  /** Used to define the position of the ToastContainer **/
  &.Toastify__toast-container--bottom-center {
    bottom: 0;
  }

  /** Classes for the displayed toast **/
  .Toastify__toast {
    border-radius: 0;
    box-shadow: none;
    margin: 0;
    padding: var(--PADDING_SMALL, 20px);
  }
  .Toastify__toast--rtl {
  }
  .Toastify__toast-body {
    margin: 0 auto;
    max-width: 70ch;
    padding: 0;
  }

  /** Used to position the icon **/
  .Toastify__toast-icon {
  }

  /** handle the notification color and the text color based on the theme **/
  .Toastify__toast-theme--dark {
  }
  .Toastify__toast-theme--light {
  }
  .Toastify__toast-theme--colored.Toastify__toast--default {
  }
  .Toastify__toast-theme--colored.Toastify__toast--info {
  }
  .Toastify__toast-theme--colored.Toastify__toast--success {
  }
  .Toastify__toast-theme--colored.Toastify__toast--warning {
  }
  .Toastify__toast-theme--colored.Toastify__toast--error {
  }

  .Toastify__progress-bar {
  }
  .Toastify__progress-bar--rtl {
  }
  .Toastify__progress-bar-theme--light {
  }
  .Toastify__progress-bar-theme--dark {
  }
  .Toastify__progress-bar--info {
  }
  .Toastify__progress-bar--success {
  }
  .Toastify__progress-bar--warning {
  }
  .Toastify__progress-bar--error {
  }
  /** colored notifications share the same progress bar color **/
  .Toastify__progress-bar-theme--colored.Toastify__progress-bar--info,
  .Toastify__progress-bar-theme--colored.Toastify__progress-bar--success,
  .Toastify__progress-bar-theme--colored.Toastify__progress-bar--warning,
  .Toastify__progress-bar-theme--colored.Toastify__progress-bar--error {
  }

  /** Classes for the close button. Better use your own closeButton **/
  .Toastify__close-button {
  }
  .Toastify__close-button--default {
  }
  .Toastify__close-button > svg {
  }
  .Toastify__close-button:hover,
  .Toastify__close-button:focus {
  }
`;
