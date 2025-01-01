// noinspection JSUnusedGlobalSymbols

export default class LSystem {
  axiom;
  odds;
  ruleSets;

  constructor(params) {
    this.axiom = params.axiom;
    this.ruleSets = params.ruleSets;
    this.renderingConfig = params.renderingConfig;
  }

  generate(currentString) {
    let updatedString = '';
    for (let i = 0; i < currentString.length; i++) {
      let wasReplaced = false;
      this.ruleSets.forEach(ruleSet => {
        let character = currentString[i];
        if (character === ruleSet.symbol) {
          updatedString += ruleSet.replacement;
          wasReplaced = true;
        }
      });

      if (!wasReplaced) {
        updatedString += currentString[i];
      }
    }

    return updatedString;
  }

  _copyString(string) {
    return (' ' + string).slice(1);
  }
}
