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

export const Canvas: React.SFC<{
  children: ItemChildren;
  outerWidth: number;
  innerWidth: number;
  setScrollPosition: (left: number, width: number) => void;
}> = (props) => {
  const wrapped = props.children.map((child, index) => {
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
    props.setScrollPosition(
      element.scrollLeft,
      element.clientWidth,
    );
  };
  return (
    <div style={outerStyle(props.outerWidth)} onScroll={scrollHandler}>
      <div style={innerStyle(props.innerWidth)}>
        {wrapped}
      </div>
    </div>
  );
};
