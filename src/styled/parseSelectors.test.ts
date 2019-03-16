import { parseSelectors } from "./parseSelectors";

describe("parseSelectors", () => {
  it("can parse a basic selector", () => {
    expect(
      parseSelectors(`
        background-color: red;
        color: black;
      `)
    ).toEqual({
      "&": {
        "background-color": "red",
        color: "black"
      }
    });
  });

  it("can parse a basic selector and a hover", () => {
    expect(
      parseSelectors(`
        background-color: red;
        :hover {
          color: black;
        }
      `)
    ).toEqual({
      "&": {
        "background-color": "red"
      },
      "&:hover": {
        color: "black"
      }
    });
  });

  it("can parse a css grid template", () => {
    expect(
      parseSelectors(`
        grid-template:
          "a b" "c d";          
      `)
    ).toEqual({
      "&": {
        "grid-template": '"a b" "c d"'
      }
    });
  });
});
