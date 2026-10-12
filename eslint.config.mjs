import coreWebVitals from 'eslint-config-next/core-web-vitals';

export default [...coreWebVitals, { ignores: ['out/', '.next/', 'node_modules/'] }];
