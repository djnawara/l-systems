// noinspection NpmUsedModulesInstalled,JSUnresolvedReference

import {Controller} from "@hotwired/stimulus"
import Renderer from 'modules/renderer';
import PresetLSystems from 'modules/presets';

export default class extends Controller {
  static targets = ['canvas', 'branchColor', 'branchWidth', 'branchLength', 'branchAlpha', 'branchAngle', 'leafColor', 'leafFillType', 'leafWidth', 'leafLength', 'iterations', 'preset'];

  lSystem;
  lSystems;
  renderer;

  connect() {
    if (this._isDebugging()) {
      console.log('L-Systems Controller connected');
    }

    this.lSystems = PresetLSystems;
    const startingPreset = Math.round(Math.random() * (this.lSystems.length - 1));
    this.lSystem = this.lSystems[startingPreset];
    this.presetTarget.value = startingPreset;

    this._setCanvasSize();
    this._initializeRenderer();
    this._setControlValuesFromConfig(this.lSystem.renderingConfig);
    this._generateAndRender(this.iterationsTarget.value || 4);
    window.addEventListener('resize', () => {
      this._setCanvasSize();
      let config = this._config(this.lSystem.renderingConfig);
      this.renderer = new Renderer(this.canvasTarget, config);
      this._generateAndRender(this.iterationsTarget.value || 4);
    });
  }

  reloadConfig(event) {
    this._setControlValuesFromConfig(this.lSystem.renderingConfig);
    this._initializeRenderer();
    this._generateAndRender(this.iterationsTarget.value || 4);
  }

  randomPreset(event) {
    const startingPreset = Math.round(Math.random() * (this.lSystems.length - 1));
    this.lSystem = this.lSystems[startingPreset];
    this.presetTarget.value = startingPreset;
    this._setControlValuesFromConfig(this.lSystem.renderingConfig);
    this._generateAndRender(parseInt(this.iterationsTarget.value) || 6);
  }

  update(event) {
    this.lSystem = this.lSystems[this.presetTarget.value];
    this.renderer.updateConfig(this._config(this.lSystem.renderingConfig));
    this._generateAndRender(parseInt(this.iterationsTarget.value) || 6);
  }

  _generateAndRender(iterations) {
    let sentence = this.lSystem.axiom;
    for (let i = 0; i < iterations; i++) {
      if (this._isDebugging()) {
        console.log(sentence);
      }

      sentence = this.lSystem.generate(sentence);
    }

    const config = this._config(this.lSystem.renderingConfig);
    this.renderer.render(sentence, config);
  }

  _config(defaultConfiguration) {
    const leafFillTypeRadio = this.leafFillTypeTargets.filter((radio) => radio.checked)[0];
    const leafFillType = leafFillTypeRadio ? leafFillTypeRadio.value : defaultConfiguration.leaf.fillType;

    return {
      system: {
        iterations: this.iterationsTarget.value || defaultConfiguration.system.iterations
      },
      branch: {
        color: this.branchColorTarget.value || defaultConfiguration.branch.color,
        width: parseFloat(this.branchWidthTarget.value) || defaultConfiguration.branch.width,
        length: parseFloat(this.branchLengthTarget.value) || defaultConfiguration.branch.length,
        alpha: parseFloat(this.branchAlphaTarget.value) || defaultConfiguration.branch.alpha,
        angle: parseFloat(this.branchAngleTarget.value) || defaultConfiguration.branch.angle,
      },
      leaf: {
        color: this.leafColorTarget.value.substring(1) || defaultConfiguration.leaf.color,
        width: parseFloat(this.leafWidthTarget.value) || defaultConfiguration.leaf.width,
        length: parseFloat(this.leafLengthTarget.value) || defaultConfiguration.leaf.length,
        fillType: leafFillType
      },
    };
  }

  _initializeRenderer() {
    let configWithoutConsideringInputs = this.lSystem.renderingConfig;
    this.renderer = new Renderer(this.canvasTarget, configWithoutConsideringInputs);
  }

  _setControlValuesFromConfig(config) {
    let branchColor = config.branch.color;
    if (Array.isArray(branchColor)) {
      branchColor = branchColor[0];
    }
    this.iterationsTarget.value = config.system.iterations;
    this.branchColorTarget.value = branchColor;
    this.branchWidthTarget.value = config.branch.width;
    this.branchLengthTarget.value = config.branch.length;
    this.branchAlphaTarget.value = config.branch.alpha;
    this.branchAngleTarget.value = config.branch.angle;
    this.leafColorTarget.value = this.renderer.leafColor;
    this.leafWidthTarget.value = config.leaf.width;
    this.leafLengthTarget.value = config.leaf.length;
    this.leafFillTypeTargets
      .filter((radio) => radio.value === config.leaf.fillType)
      .forEach((radio) => radio.checked = true);
  }

  _setCanvasSize() {
    this.canvasTarget.width = window.innerWidth;
    this.canvasTarget.height = window.innerHeight;
  }

  _getLeafColor(config) {
    let color = config.leaf.color;
    if (Array.isArray(color)) {
      color = color[Math.floor(Math.random() * color.length)];
    }
    if (color.length < 6) {
      color = color[0] + color[0] + color[1] + color[1] + color[2] + color[2];
    }

    return color;
  }

  _isDebugging() {
    return false;
  }
}
