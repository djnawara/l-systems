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
        width: 3
      },
      leaf: {
        width: 3,
        length: 4
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
        width: 6
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
      branch: { length: 10 },
      leaf: {
        length: 4,
        width: 6
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
        length: 12
      },
      leaf: {
        length: 10,
        width: 3
      }
    }
  },
];

export default PresetData;
