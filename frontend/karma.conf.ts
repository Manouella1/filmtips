coverageIstanbulReporter: {
  reports: ['html', 'lcovonly', 'text-summary'],
  fixWebpackSourcePaths: true,
  thresholds: {
    emitWarning: false,
    global: {
      statements: 80,
      branches: 80,
      functions: 80,
      lines: 80
    }
  }
},
