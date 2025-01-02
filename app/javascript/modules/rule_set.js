// noinspection JSUnusedGlobalSymbols

export default class RuleSet {
  constructor(params) {
    this.symbol = params.symbol;
    this.odds = params.odds;
    this.replacement = params.replacement;
    this.replacements = params.replacements;
  }

  toString() {
    return ` >> Symbol: ${this.symbol}, Odds: ${this.odds}, Replacement: ${this.replacement}`;
  }
}
