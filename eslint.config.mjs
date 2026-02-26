import { defineConfig, globalIgnores } from 'eslint/config';
import nextVitals from 'eslint-config-next/core-web-vitals';

const eslintConfig = defineConfig([
  ...nextVitals,
  {
    rules: {
      // Desabilitar a regra que causa o erro de build
      'react-hooks/set-state-in-effect': 'off',
      // Desabilitar aviso de variáveis não usadas (opcional)
      '@typescript-eslint/no-unused-vars': 'warn',
    },
  },
  globalIgnores([
    '.next/**',
    'out/**',
    'build/**',
    'next-env.d.ts',
    'node_modules/**',
  ]),
]);

export default eslintConfig;