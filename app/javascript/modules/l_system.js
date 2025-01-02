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
          const replacement = this._getReplacement(ruleSet);
          updatedString += replacement;
          wasReplaced = true;
        }
      });

      if (!wasReplaced) {
        updatedString += currentString[i];
      }
    }

    return updatedString;
  }

  _getReplacement(ruleSet) {
    if (ruleSet.replacement !== undefined) {
      return ruleSet.replacement;
    }

    const roll = Math.round(Math.random() * 100) / 100
    let odds = 0;
    for (const option of ruleSet.replacements) {
      odds += option.odds;
      if (roll <= odds) {
        return option.replacement;
      }
    }
    return ruleSet.replacements[ruleSet.replacements.length - 1].replacement;
  }

  _copyString(string) {
    return (' ' + string).slice(1);
  }
}
