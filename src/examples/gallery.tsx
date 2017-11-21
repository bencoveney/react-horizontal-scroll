import * as React from "react";
import * as ReactDOM from "react-dom";

import { ItemProps, Scroll } from "../components/index";

const images: string[] = [
  "./gallery1.png",
  "./gallery2.png",
  "./gallery3.png",
  "./gallery4.png",
];

const stretchStyle = (
  image: string,
): React.CSSProperties => ({
  backgroundImage: `url(${image})`,
  backgroundSize: "100% 100%",
  height: "100%",
  width: "100%",
});

const Picture: React.SFC<{ image: string } & ItemProps> = (props) => (
  <div style={stretchStyle(props.image)}>
    <div style={stretchStyle("./galleryFrame.png")} />
  </div>
);

const backgroundStyle: React.CSSProperties = {
  backgroundImage: `url(./galleryBackground.png)`,
  backgroundRepeat: "repeat-x",
  backgroundSize: "auto 100%",
  height: "100%",
  width: "100%",
};

const Background: React.SFC<ItemProps> = (props) => (
  <div style={backgroundStyle} />
);

const wrapperStyle: React.CSSProperties = {
  margin: "100px auto",
  width: "600px",
};

const Gallery: React.SFC = () => {
  const content = [
    (
      <Background
        backgroundColor={"khaki"}
        height={500}
        key={50}
        width={1700}
        x={0}
        y={0}
      />
    ),
  ].concat(
    images.map(
      (image, index) => (
        <Picture
          backgroundColor={"indigo"}
          height={362}
          key={index + 1}
          width={300}
          x={100 + (index * 400)}
          y={50}
          image={image}
        />
      ),
    ),
  );
  return (
    <div style={wrapperStyle}>
      <Scroll height={600} width={"600px"}>{content}</Scroll>
    </div>
  );
};

const rootEl = document.getElementById("gallery");
ReactDOM.render(<Gallery />, rootEl);
