import { Config } from '@stencil/core';

export const config: Config = {
  namespace: 'rpg-table',
  taskQueue: 'async',
  outputTargets: [
    {
      type: 'dist'
    }
  ]
};
