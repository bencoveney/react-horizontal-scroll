import * as React from "react";

import { ItemChildren } from "../scroll/item";
import { Scroll } from "../scroll/scroll";

type Optional<Type> = Type | undefined;
type Nullable<Type> = Type | null;

type Dimension = Optional<number | string>;

const isNumber = (numberish: any): numberish is number => {
  return typeof numberish === "number";
};

const getNumber = (
  numberish: Dimension,
): Optional<number> => isNumber(numberish) ? numberish : undefined;

const evaluateDimension = (dimension: Dimension): Optional<string> => {
  return typeof dimension === "number" ? `${dimension}px` : dimension;
};

interface Props {
  width?: Dimension;
  height: Dimension;
  children: ItemChildren;
}

interface State {
  width: Optional<number>;
  height: Optional<number>;
}

/*
We need to determine the width and height available in pixels, but we might
have different units or no dimensions at all. Put a div in the DOM and then
measure it.
*/

export class Wrapper extends React.Component<Props, State> {
  private wrapper: Nullable<HTMLElement>;
  public constructor(props: Props) {
    super(props);
    this.state = {
      height: getNumber(props.height),
      width: getNumber(props.width),
    };
  }
  public render() {
    const style: React.CSSProperties = {
      height: evaluateDimension(this.state.height || this.props.height),
      width: evaluateDimension(this.state.width || this.props.width),
    };
    let children: Nullable<React.ReactNode> = null;
    if (isNumber(this.state.width) && isNumber(this.state.height)) {
      children = (
        <Scroll
          width={this.state.width}
          height={this.state.height}
        >
          {this.props.children}
        </Scroll>
      );
    }
    return (
      <div
        style={style}
        ref={(wrapper) => this.wrapper = wrapper}
      >
        {children}
      </div>
    );
  }
  public componentDidMount() {
    if (this.wrapper) {
      this.setState({
        height: this.wrapper.offsetHeight,
        width: this.wrapper.offsetWidth,
      });
    }
  }
}
