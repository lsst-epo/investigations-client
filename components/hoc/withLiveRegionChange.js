import React, { Component } from "react";
import hoistStatics from "hoist-non-react-statics";

function getDisplayName(WrappedComponent) {
  return WrappedComponent.displayName || WrappedComponent.name || "Component";
}

export default function withLiveRegionChange(
  WrappedComponent,
  renderLiveRegion = true
) {
  const displayName = `withLiveRegionChange('${getDisplayName(
    WrappedComponent
  )})`;

  class withLiveRegionChange extends Component {
    static WrappedComponent = WrappedComponent;

    static displayName = displayName;

    constructor(props) {
      super(props);
      this.state = { message: null };
    }

    componentWillUnmount() {
      clearTimeout(this.timeout);
    }

    get childProps() {
      const base = {
        setLiveRegionMessage: this.setMessage,
      };
      if (renderLiveRegion) return base;
      return {
        renderLiveRegion: this.renderLiveRegion,
        currentMessage: this.state.message,
        ...base,
      };
    }

    setMessage = (message) => {
      // temporarily update state with new message
      this.setState({ message });

      // remove message
      this.timeout = setTimeout(() => {
        this.setState({ message: null });
      }, 1000);
    };

    renderLiveRegion = () => {
      return (
        <div role="status" aria-live="polite" aria-atomic className="a-hidden">
          {this.state.message}
        </div>
      );
    };

    render() {
      const props = { ...this.props, ...this.childProps };

      return (
        <>
          {renderLiveRegion && this.renderLiveRegion()}
          {React.createElement(WrappedComponent, props)}
        </>
      );
    }
  }

  return hoistStatics(withLiveRegionChange, WrappedComponent);
}
