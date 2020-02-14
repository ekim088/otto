import babel from 'rollup-plugin-babel';
import resolve from '@rollup/plugin-node-resolve';
import visualizer from 'rollup-plugin-visualizer';
import { uglify } from 'rollup-plugin-uglify';

const pluginBabel = babel({
	extensions: ['.js', '.jsx'],
	inputSourceMap: false,
	runtimeHelpers: true
});

const pluginResolve = resolve({
	extensions: ['.js', '.jsx', '.json'],
	mainFields: ['module', 'main']
});

module.exports = {
	input: 'src/index.js',
	output: {
		file: 'dist/index.js',
		format: 'es',
		sourcemap: true
	},
	plugins: [
		pluginResolve,
		pluginBabel,
		uglify(),
		visualizer({
			filename: 'dist/bundle-visualizer.html'
		})
	]
};
