const DefaultSelector = "&";

export type SelectorsMap = {
  [key: string]: {
    [key: string]: string;
  };
};

export function parseSelectors(rules: string): SelectorsMap {
  const selectors = {};

  let tokenIndex = 0;
  let selector = DefaultSelector;
  let name = "";
  let remainingString = rules;
  let i = 0;

  while (i < 10 && rules.length > 0 && tokenIndex > -1) {
    i++;

    // Feels bad
    tokenIndex = rules.search(/{|;|}/);

    const section = rules.slice(0, tokenIndex).trim();

    switch (rules[tokenIndex]) {
      case ";":
        // Name value pair
        const pair = section.split(":");
        selectors[selector] = selectors[selector] || {};
        selectors[selector][pair[0].trim()] = pair[1].trim();
        break;
      case "{":
        // Start of new selector
        selector = section.slice(0, section.length);

        if (selector.indexOf("&") === -1) {
          selector = "&" + selector;
        }

        break;
      case "}":
        selector = DefaultSelector;
        break;
    }

    rules = rules.substr(tokenIndex + 1);
  }

  return selectors;
}
