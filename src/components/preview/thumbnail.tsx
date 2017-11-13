import * as React from "react";

import { ItemProps } from "../index";

export const Thumbnail: React.SFC<ItemProps> = (props) => {
  const style: React.CSSProperties = {
    backgroundColor: props.backgroundColor,
    height: props.height,
    left: props.x,
    position: "absolute",
    top: props.y,
    width: props.width,
  };
  return <div style={style} />;
};
