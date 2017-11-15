import * as React from "react";

import { Canvas } from "../canvas/canvas";
import { Preview } from "../preview/preview";
import { ItemChildren, ItemProps } from "../scroll/item";

interface Props {
  width: number;
  height: number;
  children: ItemChildren;
}

interface State {
  scrollLeft: number;
  scrollWidth: number;
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

export class Scroll extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      scrollLeft: 0,
      scrollWidth: 10,
    };
  }
  public render() {
    const maximumWidth = getMaximum(this.props.children, "x", "width");
    const maximumHeight = getMaximum(this.props.children, "y", "height");
    const scrollHandler = this.setScrollPosition.bind(this);
    return (
      <div>
        <Canvas
          outerWidth={this.props.width}
          innerWidth={maximumWidth}
          scrollLeft={this.state.scrollLeft}
          scrollWidth={this.state.scrollWidth}
          setScrollPosition={scrollHandler}
        >
          {this.props.children}
        </Canvas>
        <Preview
          width={this.props.width}
          height={50}
          canvasWidth={maximumWidth}
          canvasHeight={maximumHeight}
          scrollLeft={this.state.scrollLeft}
          scrollWidth={this.state.scrollWidth}
          setScrollPosition={scrollHandler}
        >
          {this.props.children}
        </Preview>
      </div>
    );
  }
  private setScrollPosition(left: number, width: number): void {
    this.setState({
      scrollLeft: left,
      scrollWidth: width,
    });
  }
}
