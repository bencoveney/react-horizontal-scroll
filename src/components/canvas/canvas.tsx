import * as React from "react";
import * as ReactDom from "react-dom";

import { ItemChildren } from "../index";

const outerStyle = (height: number, width: number): React.CSSProperties => ({
  height: `${height}px`,
  overflow: "hidden",
  width: `${width}px`,
});

const innerStyle = (width: number): React.CSSProperties => ({
  display: "inline-block",
  position: "relative",
  verticalAlign: "top",
  width,
});

interface Props {
  children: ItemChildren;
  height: number;
  outerWidth: number;
  innerWidth: number;
  scrollLeft: number;
  scrollWidth: number;
  setScrollPosition: (left: number, width: number) => void;
}

export class Canvas extends React.Component<Props, {}> {
  private outer: HTMLDivElement | null;
  public render() {
    const wrapped = this.props.children.map((child, index) => {
      const style: React.CSSProperties = {
        height: `${child.props.height}px`,
        left: `${child.props.x}px`,
        position: "absolute",
        top: `${child.props.y}px`,
        width: `${child.props.width}px`,
      };
      return <div key={index} style={style}>{child}</div>;
    });
    const scrollHandler: React.UIEventHandler<any> = (event) => {
      const element = event.target as Element;
    };
    return (
      <div
        style={outerStyle(this.props.height, this.props.outerWidth)}
        onScroll={this.setScrollPosition}
        ref={(outer) => this.outer = outer}
      >
        <div style={innerStyle(this.props.innerWidth)}>
          {wrapped}
        </div>
      </div>
    );
  }
  public componentDidMount() {
    this.setScrollPosition();
  }
  public componentDidUpdate() {
    if (this.outer) {
      this.outer.scrollLeft = this.props.scrollLeft;
    }
  }
  private setScrollPosition = () => {
    if (this.outer) {
      this.props.setScrollPosition(
        this.outer.scrollLeft,
        this.outer.clientWidth,
      );
    }
  }
}
