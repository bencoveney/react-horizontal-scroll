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
  setScrollPosition: (left: number, width: number) => void;
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
    userSelect: "none",
    width: `${props.width}px`,
  };
  const scaledWidth = props.scrollWidth * widthScale;
  const viewportStyle: React.CSSProperties = {
    border: "1px solid black",
    boxSizing: "border-box",
    height: `${props.height}px`,
    left: `${props.scrollLeft * widthScale}px`,
    position: "absolute",
    width: `${scaledWidth}px`,
  };
  const processEvent = (event: React.MouseEvent<any>) => {
    const left = event.clientX - event.currentTarget.offsetLeft;
    const clampedLeft = Math.min(
      Math.max(left, scaledWidth / 2),
      props.width - (scaledWidth / 2),
    );
    const scaledLeft = (clampedLeft / widthScale) - (props.width / 2);
    props.setScrollPosition(scaledLeft, props.width);
  };
  const moveHandler: React.MouseEventHandler<any> = (event) => {
    if (event.buttons !== 1) {
      return;
    }
    processEvent(event);
  };
  const clickHandler: React.MouseEventHandler<any> = (event) => {
    if (event.button !== 0) {
      return;
    }
    processEvent(event);
  };
  return (
    <div style={style} onMouseMove={moveHandler} onClick={clickHandler}>
      {thumbnails}
      <div style={viewportStyle} />
    </div>
  );
};
