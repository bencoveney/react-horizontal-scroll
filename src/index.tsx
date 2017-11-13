import * as LoremIpsum from "lorem-ipsum";
import * as React from "react";
import * as ReactDOM from "react-dom";

import { ItemProps, Scroll } from "./components/index";

const divStyle = (x: number): Readonly<React.CSSProperties> => ({
  backgroundColor: "grey",
  left: `${x}px`,
  position: "absolute",
  width: "200px",
});

const DemoElement: React.SFC<ItemProps> = (props) => {
  const style = {backgroundColor: props.backgroundColor};
  return <div style={style}>{LoremIpsum()}</div>;
};

const demoStyle: React.CSSProperties = {
  margin: "50px",
};

const Demo: React.SFC = () => {
  const content = new Array(5)
    .fill(undefined)
    .map(
      (value, index) => (
        <DemoElement
          backgroundColor={"indigo"}
          height={20}
          key={index}
          width={200}
          x={index * 400}
          y={0}
        />
      ),
    );
  return <div style={{demoStyle}}><Scroll>{content}</Scroll></div>;
};

const rootEl = document.getElementById("root");
ReactDOM.render(<Demo />, rootEl);
