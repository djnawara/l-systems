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
      system: { iterations: 7 },
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
      { symbol: 'F', replacement: 'FF'},
    ],
    configOverrides: {
      system: { iterations: 7 },
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
      { symbol: 'F', replacement: 'FF' },
      { symbol: 'X', replacement: 'F+[-F-XF-X][+FF][--XF[+X]][++F-X]' },
    ],
    configOverrides: {
      system: { iterations: 6 },
      branch: {
        width: 3,
        length: 6,
        alpha: 0.4
      },
      leaf: {
        width: 6,
        length: 8,
        fillType: 'rainbow'
      }
    }
  },
  {
    axiom: 'FX',
    rules: [
      { symbol: 'F', replacement: 'FF+[+F-F-F]-[-F+F+F]' },
    ],
    configOverrides: {
      system: { iterations: 4 },
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
      { symbol: 'F', replacement: 'FX[FX[+XF]]' },
      { symbol: 'X', replacement: 'FF[+XZ++X-F[+ZX]][-X++F-X]' },
      { symbol: 'Z', replacement: '[+F-X-F][++ZX]' },
    ],
    configOverrides: {
      system: { iterations: 5},
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
      { symbol: 'F', replacement: 'F > F[+F]F[-F]F'},
    ],
    configOverrides: {
      system: { iterations: 4 },
      branch: {
        angle: 38,
        alpha: 0.4,
        length: 4
      },
      leaf: {
        length: 10,
        width: 5,
        fillType: 'linear-rainbow'
      }
    }
  },
];

export default PresetData;
