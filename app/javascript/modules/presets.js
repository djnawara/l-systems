import LSystem from 'modules/l_system';
import RuleSet from 'modules/rule_set';
import PresetData from 'data/presets';

const defaultSystemConfig = {
  iterations: 5
}
const defaultBranchConfig = {
  color: '#80461B',
  length: 4,
  width: 2,
  alpha: 0.85,
  angle: 22.5
};
const defaultLeafConfig = {
  color: ['#B31B1B', '#1BB31B', '#931993', '#B3B31B'],
  width: 4,
  length: 5
};

const PresetLSystems = PresetData.map(presetDatum => {
  const axiom = presetDatum.axiom;

  const ruleSets = presetDatum.rules.map(rule => {
    return new RuleSet({
      symbol: rule.symbol,
      odds: rule.odds,
      replacement: rule.replacement
    });
  });

  const systemConfig = Object.assign({}, defaultSystemConfig, presetDatum.configOverrides.system);
  const branchConfig = Object.assign({}, defaultBranchConfig, presetDatum.configOverrides.branch);
  const leafConfig = Object.assign({}, defaultLeafConfig, presetDatum.configOverrides.leaf);
  let config = {
    system: systemConfig,
    branch: branchConfig,
    leaf: leafConfig
  };

  return new LSystem({
    axiom: axiom,
    ruleSets: ruleSets,
    renderingConfig: config
  });
});

// noinspection JSUnusedGlobalSymbols
export default PresetLSystems;
