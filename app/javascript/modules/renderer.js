// noinspection JSUnusedGlobalSymbols

export default class Renderer {
  leafColor;

  constructor(canvas, config) {
    this.numberOfColors = 16;
    this.canvas = canvas;
    this.config = config;
    this.context2D = this.canvas.getContext('2d');
    this.gradients = this._makeLeafGradients(this.context2D, config);
  }

  render(sentence) {
    const config = this.config;
    const context2D = this.context2D;
    const gradients = this.gradients;

    context2D.resetTransform();
    context2D.clearRect(0, 0, this.canvas.width, this.canvas.height);
    context2D.transform(1, 0, 0, 1, this.canvas.width / 2, this.canvas.height);

    for (let i = 0; i < sentence.length; i++) {
      const c = sentence[i];

      if (c === 'F') {
        context2D.fillStyle = config.branch.color;
        context2D.globalAlpha = config.branch.alpha;
        context2D.fillRect(0, 0, config.branch.width, - config.branch.length);
        context2D.transform(1, 0, 0, 1, 0, -config.branch.length);
      } else if (c === '+') {
        context2D.rotate(config.branch.angle * Math.PI / 180);
      } else if (c === '-') {
        context2D.rotate(-config.branch.angle * Math.PI / 180);
      } else if (c === '[') {
        context2D.save();
      } else if (c === ']') {
        const randomIndex = Math.round(Math.random() * (gradients.length - 1));
        context2D.fillStyle = gradients[randomIndex];
        context2D.globalAlpha = 0.90;
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
    }
  }

  updateConfig(config) {
    if (config.leaf.fillType !== this.config.leaf.fillType) {
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
      case 'masked-rainbow':
        const rainbowColors = ['#BB0000', '#BB6600', '#BBBB00', '#00BB00', '#0000BB', '#BB00BB'];
        const darkRainbowColors = rainbowColors.map(color => {
          return this._darken(color);
        });

        const gradient = context2D.createLinearGradient(1, 0, this.canvas.width, this.canvas.height);
        rainbowColors.map((color, index) => {
          gradient.addColorStop(index / 5, color);
        });
        this.leafColor = rainbowColors[0];
        return [gradient];
      default:
        return ['#000000']
    }
  }

  _buildRainbowGradients(context2D) {
    const rainbowColors = ['#BB0000', '#BB6600', '#AAAA00', '#00AA00', '#0000BB', '#BB00BB'];
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
