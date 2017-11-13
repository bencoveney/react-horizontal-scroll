import * as React from "react";

import { ItemChildren } from "../index";
import { Thumbnail } from "./thumbnail";

export const Preview: React.SFC<{
  canvasHeight: number,
  canvasWidth: number,
  children: ItemChildren,
  height: number,
  scrollLeft: number,
  scrollWidth: number,
  width: number,
}> = (props) => {
  const heightScale = props.height / props.canvasHeight;
  const widthScale = props.width / props.canvasWidth;
  const thumbnails = props.children.map(
    ({props: childProps}, index) => (
      <Thumbnail
        backgroundColor={childProps.backgroundColor}
        height={childProps.height * heightScale}
        key={index}
        width={childProps.width * widthScale}
        x={childProps.x * widthScale}
        y={childProps.y * heightScale}
      />
    ),
  );
  const style: React.CSSProperties = {
    height: `${props.height}px`,
    position: "relative",
    width: `${props.width}px`,
  };
  const viewportStyle: React.CSSProperties = {
    border: "1px solid black",
    boxSizing: "border-box",
    height: `${props.height}px`,
    left: `${props.scrollLeft * widthScale}px`,
    position: "absolute",
    width: `${props.scrollWidth * widthScale}px`,
  };
  return (
    <div style={style}>
      {thumbnails}
      <div style={viewportStyle} />
    </div>
  );
};
