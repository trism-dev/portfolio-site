import coreWebVitals from 'eslint-config-next/core-web-vitals';

const config = [...coreWebVitals, { ignores: ['out/', '.next/', 'node_modules/'] }];
export default config;
