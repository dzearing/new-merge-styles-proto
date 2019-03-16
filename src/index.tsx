import * as React from "react";
import { render } from "react-dom";
import { styled } from "./styled";

const TestComponent = styled("div")`
  background-color: red;
  color: white;
`;

const TestComponent2 = styled("div")`
  background-color: ${props => (props.primary ? "red" : "blue")};
  color: white;
  padding: 40px;

  :hover {
    background: green;
  }
`;

const TestComponent3 = styled.div`
  background-color: red;
  color: white;
`;

const App = () => (
  <div className="App">
    <TestComponent>Hello 1</TestComponent>
    <TestComponent2>Hello 2</TestComponent2>
    <TestComponent3>Hello 3</TestComponent3>
  </div>
);

const rootElement = document.getElementById("root");
render(<App />, rootElement);
