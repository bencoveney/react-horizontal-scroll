import * as React from "react";
import * as ReactDom from "react-dom";

import { ItemChildren } from "../index";

const outerStyle = (width: number): React.CSSProperties => ({
  height: "100px",
  overflowX: "auto",
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
      this.props.setScrollPosition(
        element.scrollLeft,
        element.clientWidth,
      );
    };
    return (
      <div
        style={outerStyle(this.props.outerWidth)}
        onScroll={scrollHandler}
        ref={(outer) => this.outer = outer}
      >
        <div style={innerStyle(this.props.innerWidth)}>
          {wrapped}
        </div>
      </div>
    );
  }
  public componentDidUpdate() {
    if (this.outer) {
      this.outer.scrollLeft = this.props.scrollLeft;
    }
  }
}
