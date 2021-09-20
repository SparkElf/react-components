// rollup.config.js
import typescript from '@rollup/plugin-typescript';
import jsx from 'acorn-jsx';
export default {
    input: 'src/main.ts',
    output: {
        dir: 'build',
        format: 'esm'
    },
    acornInjectPlugins: [jsx()],
    plugins: [typescript({ jsx: 'preserve' })]
};