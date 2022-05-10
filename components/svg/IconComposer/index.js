import React, { PureComponent } from "react";
import classNames from "classnames";
import Icons from "../icons";
import { capitalize } from "@/helpers";
import { svgInternalShape } from "@/shapes/svg";

export default class IconComposer extends PureComponent {
  static propTypes = {
    ...svgInternalShape,
  };

  get iconComponent() {
    const key = capitalize(this.props.icon);
    const component = Icons[key];

    return component;
  }

  render() {
    const {
      className: inheritedClassName,
      size,
      fill,
      stroke,
      icon,
      role = "img",
    } = this.props;
    const className = classNames({
      "a-svg": true,
      [`${inheritedClassName}`]: !!inheritedClassName,
    });
    const IconComponent = this.iconComponent;

    if (!IconComponent) return false;

    return React.createElement(IconComponent, {
      svgProps: this.props.svgProps,
      className,
      size,
      fill,
      stroke,
      icon,
      role,
    });
  }
}
