const PresetData = [
  {
    axiom: 'F',
    rules: [
      {
        symbol: 'F', replacements: [
          {odds: 0.33, replacement: 'F[+F]F[-F][F]'},
          {odds: 0.33, replacement: 'F[+F][F]'},
          {odds: 0.34, replacement: 'F[-F][F]'}
        ]
      }
    ],
    configOverrides: {
      system: {iterations: 7},
      branch: {
        width: 3,
        length: 19,
        alpha: 0.4
      },
      leaf: {
        width: 6,
        length: 5,
        fillType: 'colors'
      }
    }
  },
  {
    axiom: 'X',
    rules: [
      {
        symbol: 'X',
        replacements: [
          {odds: 0.33, replacement: 'F[+X]F[-X]+X'},
          {odds: 0.33, replacement: 'F[-X]F[-X]+X'},
          {odds: 0.34, replacement: 'F[-X]F+X'}
        ]
      },
      {symbol: 'F', replacement: 'FF'},
    ],
    configOverrides: {
      system: {iterations: 7},
      branch: {
        width: 3,
        length: 3,
        alpha: 0.4
      },
      leaf: {
        width: 6,
        length: 5,
        fillType: 'colors'
      }
    }
  },
  {
    axiom: 'X',
    rules: [
      {symbol: 'F', replacement: 'FF'},
      {symbol: 'X', replacement: 'F+[-F-XF-X][+FF][--XF[+X]][++F-X]'},
    ],
    configOverrides: {
      system: {iterations: 5},
      branch: {
        width: 3,
        length: 8,
        alpha: 0.4,
        angle: 25
      },
      leaf: {
        width: 6,
        length: 8,
        fillType: 'linear-rainbow'
      }
    }
  },
  {
    axiom: 'FX',
    rules: [
      {symbol: 'F', replacement: 'FF+[+F-F-F]-[-F+F+F]'},
    ],
    configOverrides: {
      system: {iterations: 4},
      branch: {
        length: 14,
        alpha: 0.3
      },
      leaf: {
        length: 8,
        width: 6,
        fillType: 'colors'
      }
    }
  },
  {
    axiom: 'X',
    rules: [
      {symbol: 'F', replacement: 'FX[FX[+XF]]'},
      {symbol: 'X', replacement: 'FF[+XZ++X-F[+ZX]][-X++F-X]'},
      {symbol: 'Z', replacement: '[+F-X-F][++ZX]'},
    ],
    configOverrides: {
      system: {iterations: 5},
      branch: {
        length: 10,
        alpha: 0.4
      },
      leaf: {
        length: 4,
        width: 6,
        fillType: 'colors'
      }
    }
  },
  {
    axiom: 'F',
    rules: [
      {symbol: 'F', replacement: 'F > F[+F]F[-F]F'},
    ],
    configOverrides: {
      system: {iterations: 4},
      branch: {
        angle: 38,
        alpha: 0.4,
        length: 3
      },
      leaf: {
        length: 10,
        width: 5,
        fillType: 'linear-rainbow'
      }
    }
  },
  {
    axiom: 'F',
    rules: [
      {symbol: 'F', replacement: 'F+G'},
      {symbol: 'G', replacement: 'F-G'},
    ],
    configOverrides: {
      system: {iterations: 16, position: 'center'},
      branch: {
        color: '#00BB00',
        angle: 90,
        alpha: 0.85,
        length: 20
      },
      leaf: {
        length: 6,
        width: 4,
        fillType: 'linear-rainbow'
      }
    }
  },
  {
    axiom: 'F-G-G',
    rules: [
      {symbol: 'F', replacement: 'F-G+F+G-F'},
      {symbol: 'G', replacement: 'GG'},
    ],
    configOverrides: {
      system: {iterations: 3, position: 'bottom', rotation: -30, divisor: 1.33},
      branch: {
        color: '#33BB33',
        angle: 120,
        alpha: 0.85,
        length: 20
      },
      leaf: {}
    }
  },
  {
    axiom: 'F',
    rules: [
      {symbol: 'F', replacement: 'F+F-F-F+F'}
    ],
    configOverrides: {
      system: {iterations: 5, position: 'bottom', rotation: -90, divisor: 1.05},
      branch: {
        color: '#33BBBB',
        angle: 90,
        alpha: 0.85,
        length: 6
      },
      leaf: {}
    }
  }
];

export default PresetData;
