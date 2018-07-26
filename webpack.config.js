var HTMLWebpackPlugin = require('html-webpack-plugin');
var HTMLWebpackPluginConfig = new HTMLWebpackPlugin({
    template:__dirname + '/app/index.html',
    filename: 'index.html',
    inject: 'body'
});

module.exports = {
    entry:__dirname + '/app/index.js',
    module: {
	    loaders: [
    	    {
        		test: /\.js$/,
        		exclude: /node_modules/,
        		loader: 'babel-loader'
    	    },
          {
              test: /\.css$/,
              loader: "style-loader!css-loader?modules"
          },
          {
            test: /\.scss$/,
            use: [
              require.resolve('style-loader'),
              {
                loader: require.resolve('css-loader'),
                options: {
                  importLoaders: 1,
                  modules: true,
                  localIdentName: "[name]__[local]___[hash:base64:5]"
                },
              },
              {
                loader: require.resolve('sass-loader'),
              },
            ],
          },
    	]
    },
    output: {
	filename: "transformed.js",
	path:__dirname + '/build'
    },
    plugins: [HTMLWebpackPluginConfig]
};
