// rollup.config.js
import typescript from '@rollup/plugin-typescript';
import jsx from 'acorn-jsx';
import styles from 'rollup-plugin-styles'
export default {
    input: 'src/index.ts',
    output: {
        dir: 'build',
        format: 'esm',
        entryFileNames: '[name]-[hash].js'
    },
    acornInjectPlugins: [jsx()],//输出保留jsx，不进行jsx格式转换
    plugins: [
        typescript({ jsx: 'preserve' }),//同样是保留jsx的意思
        styles({
            mode: "extract"//具有代码拆分支持 拆分策略跟随rollup
        })
    ]
};