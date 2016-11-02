const path = require('path');

module.exports = {
	entry: './src/index.js',
	output: {
		path: __dirname + '/src/public/js',
		filename: 'bundle.js'
	},
	module: {
		loaders: [
			{
				test: /.jsx?$/,
				loader: 'babel-loader',
				exclude: /node-module/,
				query: {
					'presets': ['es2015', 'react']
				}
			},
			{ test: /\.json$/, loader: 'json' },
		]
	},
	resolve: {
        extensions: ['', '.js', '.jsx'],
        root: [
            path.resolve('./src')
        ]
    }
}