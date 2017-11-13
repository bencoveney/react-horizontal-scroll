import * as React from "react";

import { ItemChildren } from "../index";
import { Thumbnail } from "./thumbnail";

export const Preview: React.SFC<{
  canvasHeight: number,
  canvasWidth: number,
  children: ItemChildren,
  height: number,
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
  return <div style={style}>{thumbnails}</div>;
};
