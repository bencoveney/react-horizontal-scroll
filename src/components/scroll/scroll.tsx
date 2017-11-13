import * as React from "react";

import { Canvas } from "../canvas/canvas";
import { Preview } from "../preview/preview";
import { ItemChildren, ItemProps } from "../scroll/item";

interface Props {
  height?: number | undefined;
  children: ItemChildren;
}

interface State {
  width: number;
  height: number;
  xPosition: number;
}

const getMaximum = (
  children: ItemChildren,
  positionKey: keyof ItemProps,
  dimensionKey: keyof ItemProps,
) => children.map((child) => child.props)
  .reduce(
    (maximum, next: any) => Math.max(
      maximum,
      next[positionKey] + next[dimensionKey],
    ),
    0,
  );

const width = 500;

export class Scroll extends React.Component<Props, State> {
  public render() {
    const maximumWidth = getMaximum(this.props.children, "x", "width");
    const maximumHeight = getMaximum(this.props.children, "y", "height");
    return (
      <div>
        <Canvas
          outerWidth={width}
          innerWidth={maximumWidth}
        >
          {this.props.children}
        </Canvas>
        <Preview
          width={width}
          height={50}
          canvasWidth={maximumWidth}
          canvasHeight={maximumHeight}
        >
          {this.props.children}
        </Preview>
      </div>
    );
  }
}
