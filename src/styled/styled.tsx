import * as React from "react";
import { css } from "./css";

export type ComponentType = any;
export type StyledFunction = (
  component: ComponentType
) => React.StatelessComponent;
export interface StyledType extends StyledFunction {
  div: StyledFunction;
}

export const styled: StyledType = (Component: ComponentType) => {
  return function(...styles) {
    return props => (
      <Component {...props} className={css(resolveWith(props, styles))} />
    );
  };
};

function resolveWith(props, args) {
  const result = [];
  const parts = args[0];

  for (let i = 0; i < parts.length; i++) {
    result.push(parts[i]);

    const part = args[i + 1];

    if (part) {
      result.push(typeof part === "function" ? part(props) : part);
    }
  }

  return result.join("");
}

(styled as any).div = styles => styled("div")(styles);
