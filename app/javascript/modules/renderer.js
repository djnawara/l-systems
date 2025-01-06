// noinspection JSUnusedGlobalSymbols

export default class Renderer {
  leafColor;

  constructor(canvas, config, sentence) {
    this.numberOfColors = 16;
    this.canvas = canvas;
    this.config = config;
    this.context2D = this.canvas.getContext('2d');
    this.gradients = this._makeLeafGradients(this.context2D, config, sentence);
    this.x1 = 0;
    this.y1 = 0;
    this.x2 = 0;
    this.y2 = 0;
  }

  render(sentence) {
    console.log(sentence);
    const config = this.config;
    const context2D = this.context2D;
    const gradients = this.gradients;

    context2D.resetTransform();
    context2D.clearRect(0, 0, this.canvas.width, this.canvas.height);
    let divisor = config.system.divisor === undefined ? 2 : config.system.divisor;
    let width = this.canvas.width / divisor;
    let height = this.canvas.height;
    if (config.system.position === 'center') {
      height /= 2;
    }
    context2D.transform(1, 0, 0, 1, width, height);
    if (config.system.rotation !== undefined) {
      context2D.rotate(config.system.rotation * Math.PI / 180);
    }

    let leafIndex = 0;

    for (let i = 0; i < sentence.length; i++) {
      const character = sentence[i];

      switch(character) {
        case '+':
          context2D.rotate(config.branch.angle * Math.PI / 180);
          break;
        case '-':
          context2D.rotate(-config.branch.angle * Math.PI / 180);
          break;
        case '[':
          context2D.save();
          break;
        case ']':
          this._drawLeaf(gradients, context2D, config, leafIndex++);
          break;
        default:
          this._drawBranch(context2D, config);
      }
    }
  }

  _drawBranch(context2D, config) {
    context2D.fillStyle = config.branch.color;
    context2D.globalAlpha = config.branch.alpha;
    context2D.fillRect(0, 0, config.branch.width, -config.branch.length);
    context2D.transform(1, 0, 0, 1, 0, -config.branch.length);
  }

  _drawLeaf(gradients, context2D, config, leafIndex) {
    let colorIndex;
    if (config.leaf.fillType === 'linear-rainbow') {
      colorIndex = leafIndex % this.gradients.length;
    } else {
      colorIndex = Math.round(Math.random() * (gradients.length - 1));
    }

    context2D.fillStyle = gradients[colorIndex];
    context2D.globalAlpha = 0.85;
    context2D.scale(config.leaf.width, config.leaf.length);

    context2D.beginPath();
    context2D.moveTo(0, 0);
    context2D.lineTo(1, -1);
    context2D.lineTo(0, -4);
    context2D.lineTo(-1, -1);
    context2D.lineTo(0, 0);
    context2D.closePath();
    context2D.fill();

    context2D.restore();
  }

  updateConfig(config) {
    if (config.leaf.fillType !== this.config.leaf.fillType || config.leaf.color !== this.config.leaf.color) {
      this.gradients = this._makeLeafGradients(this.context2D, config);
    }
    this.config = config;
  }

  _getLeafColors(config) {
    const factor = 64;
    const colors = [];

    let color = config.leaf.color;
    if (Array.isArray(color)) {
      color = color[Math.floor(Math.random() * color.length)];
    }

    for (let index = 0; index < this.numberOfColors; index++) {
      let randomAdjustment = Math.round(Math.random() * factor);
      randomAdjustment = randomAdjustment - Math.floor(factor / 2);
      const randomlyShiftedColor = this._adjustColor(color, randomAdjustment);
      colors.push(randomlyShiftedColor);
    }

    return colors;
  }

  _getDarkLeafColors(leafColors) {
    return leafColors.map(color => {
      return this._darken(color);
    });
  }

  _makeLeafGradients(context2D, config) {
    switch(config.leaf.fillType) {
      case 'colors':
        const leafColors = this._getLeafColors(config);
        const darkLeafColors = this._getDarkLeafColors(leafColors);
        this.leafColor = leafColors[0];

        return leafColors.map((color, index) => {
          const gradient = context2D.createLinearGradient(1, 0, -1, -4);
          let darkColor = darkLeafColors[index];
          let lightColor = leafColors[index];
          this.leafColor = lightColor;
          gradient.addColorStop(0, darkColor);
          gradient.addColorStop(1, lightColor);
          return gradient;
        });
      case 'rainbow':
        return this._buildRainbowGradients(context2D);
      case 'linear-rainbow':
        return this._buildRainbowInterpolations(context2D);
      default:
        return ['#000000']
    }
  }

  _buildRainbowInterpolations(context2D) {
    const baseRainbowColors = ['#FF0000', '#FF6600', '#FFFF00', '#00FF00', '#0000FF', '#FF00FF'];
    this.leafColor = baseRainbowColors[1];
    const desiredInterpolations = 15;
    let rainbowColors = [];

    for (let roygbvIndex = 0; roygbvIndex < (baseRainbowColors.length - 1); roygbvIndex++) {
      const color1 = baseRainbowColors[roygbvIndex];
      const color2 = baseRainbowColors[roygbvIndex + 1];
      rainbowColors.push(color1);
      const color1Dec = parseInt(color1.substring(1), 16);
      const color2Dec = parseInt(color2.substring(1), 16);
      const color1R = (color1Dec >> 16) & 255;
      const color1G = (color1Dec >> 8) & 255;
      const color1B = color1Dec & 255;
      const color2R = (color2Dec >> 16) & 255;
      const color2G = (color2Dec >> 8) & 255;
      const color2B = color2Dec & 255;

      let interpolations = [];
      for (let interpolationIndex = 0; interpolationIndex < desiredInterpolations; interpolationIndex++) {
        const percent = (interpolationIndex + 1) / desiredInterpolations;
        const colorR = Math.floor(color1R + (color2R - color1R) * percent);
        const colorG = Math.floor(color1G + (color2G - color1G) * percent);
        const colorB = Math.floor(color1B + (color2B - color1B) * percent);
        const interpolatedColor = '#' + colorR.toString(16).padStart(2, '0') + colorG.toString(16).padStart(2, '0') + colorB.toString(16).padStart(2, '0');
        interpolations.push(interpolatedColor);
      }

      rainbowColors = rainbowColors.concat(interpolations);
    }
    rainbowColors.push(baseRainbowColors[baseRainbowColors.length - 1]);
    return rainbowColors.map((color, index) => {
      const gradient = context2D.createLinearGradient(1, 0, -1, -2);
      let darkColor = this._darken(color, -208);
      gradient.addColorStop(0, darkColor);
      gradient.addColorStop(1, color);
      return gradient;
    });
  }

  _buildRainbowGradients(context2D) {
    const rainbowColors = ['#FF0000', '#FF6600', '#AAAA00', '#00AA00', '#0000FF', '#FF00FF'];
    const darkRainbowColors = rainbowColors.map(color => {
      return this._darken(color, -160);
    });

    this.leafColor = rainbowColors[0];
    return rainbowColors.map((color, index) => {
      const gradient = context2D.createLinearGradient(1, 0, -1, -2);
      let darkColor = darkRainbowColors[index];
      let lightColor = rainbowColors[index];
      gradient.addColorStop(0, darkColor);
      gradient.addColorStop(1, lightColor);
      return gradient;
    });
  }

  _getLeafColor(config) {
    const factor = 64;
    let color = config.leaf.color;
    let randomAdjustment = Math.round(Math.random() * factor);
    randomAdjustment = randomAdjustment - Math.floor(factor / 2);

    return this._adjustColor(color, randomAdjustment);
  }

  _adjustColor(color, adjustment, uncapped = false) {
    let iterationAdjustment = adjustment;
    let adjustedColor = '';
    for (let index = 0; index < 3; index++) {
      if (index === 0) {
        iterationAdjustment = adjustment;
      }

      const sanitizedColor = color.replace('#', '');
      let offset = index * 2;
      let singleColorHexValueString = sanitizedColor.toString().slice(offset, offset + 2);
      let singleDecimalColor = parseInt(singleColorHexValueString, 16);
      let adjustedDecimalColor = singleDecimalColor + iterationAdjustment;

      if (adjustedDecimalColor > 255) {
        adjustedDecimalColor = 255;
        if (!uncapped) {
          iterationAdjustment = adjustedDecimalColor - singleDecimalColor;
        }
      } else if (adjustedDecimalColor < 0) {
        adjustedDecimalColor = 0;
        if (!uncapped) {
          iterationAdjustment = singleDecimalColor;
        }
      }

      let hexColorValue = adjustedDecimalColor.toString(16).padStart(2, '0');
      adjustedColor += hexColorValue;
    }

    return '#' + adjustedColor;
  }
  _darken(hexColor, adjustment = -128) {
    return this._adjustColor(hexColor.substring(1), adjustment, true);
  }
}
