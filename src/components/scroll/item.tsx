import * as React from "react";

import { Canvas } from "../canvas/canvas";
import { Preview } from "../preview/preview";

export interface ItemProps {
  backgroundColor: string;
  height: number;
  width: number;
  x: number;
  y: number;
}

export type ItemElement = React.ReactElement<ItemProps>;

export type ItemChildren = ItemElement[];
