// noinspection JSUnusedGlobalSymbols

export default class Renderer {
  constructor(canvas) {
    this.canvas = canvas;
  }

  render(sentence, config) {
    const context2D = this.canvas.getContext('2d');
    context2D.resetTransform();
    context2D.clearRect(0, 0, this.canvas.width, this.canvas.height);
    context2D.transform(1, 0, 0, 1, this.canvas.width / 2, this.canvas.height);

    for (let i = 0; i < sentence.length; i++) {
      const c = sentence[i];

      if (c === 'F') {
        context2D.fillStyle = config.branch.color;
        context2D.fillRect(0, 0, config.branch.width, - config.branch.length);
        context2D.transform(1, 0, 0, 1, 0, -config.branch.length);
      } else if (c === '+') {
        context2D.rotate(config.branch.angle * Math.PI / 180);
      } else if (c === '-') {
        context2D.rotate(-config.branch.angle * Math.PI / 180);
      } else if (c === '[') {
        context2D.save();
      } else if (c === ']') {
        const gradient = context2D.createLinearGradient(1, 0, -1, -4);
        const color = this._getLeafColor(config);
        let colorDark = this._darken(color);
        console.log(`color: ${color}, colorDark: ${colorDark}`);
        gradient.addColorStop(0, colorDark);
        gradient.addColorStop(1, color);
        context2D.fillStyle = gradient;

        context2D.globalAlpha = 1.0;

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

      let offset = index * 2;
      let singleColorHexValueString = color.toString().slice(offset, offset + 2);
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
  _darken(hexColor) {
    return this._adjustColor(hexColor.substring(1), -128, true);
  }
}
