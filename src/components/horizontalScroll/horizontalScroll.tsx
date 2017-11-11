import * as React from "react";

import { Canvas } from "../canvas/canvas";

export class HorizontalScroll extends React.Component<{}, { count: number; }> {
  public state = { count: 0 };
  private interval: number;

  public componentWillMount() {
    this.interval = window.setInterval(
      () => this.setState({ count: this.state.count + 1 }),
      1000,
    );
  }

  public componentWillUnmount() {
    window.clearInterval(this.interval);
  }

  public render() {
    return (
      <div>
        <Canvas value="Hello world!" />
        <div>
          Welcome to the react/typescript boilerplate {this.state.count}
        </div>
      </div>
    );
  }
}
