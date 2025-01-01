const PresetData = [
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
      system: { iterations: 3 },
      branch: {
        angle: 38,
        alpha: 0.4,
        length: 12
      },
      leaf: {
        length: 10,
        width: 3,
        fillType: 'colors'
      }
    }
  },
];

export default PresetData;
