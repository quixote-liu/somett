const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { ESBuildPlugin, ESBuildMinifyPlugin } = require('esbuild-loader');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const FixReactVirtualizedPlugin = require('./build/fix-react-virtualized-plugin');

const filterArgs = (str) => {
    const argv = process.argv;
    const result = argv.find((item) => item.match(str));
    if (result) {
        return result.split('=')[1];
    }
    return null;
};

const copyPluginOpts = [{
    context: './public',
    from: '**/*',
    to: 'public',
}];

module.exports = {
    output: {
        pathinfo: false,
        path: path.resolve('dist'),
        filename: '[name].js',
    },

    resolve: {
        extensions: ['.js', '.tsx', '.ts'],
    },

    mode: 'production',

    entry: {
        client: './src/index.tsx',
    },

    optimization: {
        minimize: true,
        minimizer: [
            new ESBuildMinifyPlugin({
                target: 'es2015',
            }),
        ],
    },

    module: {
        rules: [
            // ts|tsx文件处理
            {
                test: /\.ts|tsx$/,
                include: path.resolve(__dirname, 'src'),
                loader: 'esbuild-loader',
                options: {
                    loader: 'tsx',
                    target: 'es2015',
                },
            },
            // css处理
            {
                test: /\.css$/,
                loader: 'style-loader!css-loader',
            },
            /*
              图片文件处理,大于100kb的文件不会转成base64,会通过http直接访问,
              base64会减少请求次数,过大的文件转成base64会让js加载变慢
             */
            {
                test: /\.(png|svg|gif|jpg)/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        limit: 100 * 1024,
                        esModule: false,
                        name: './resources/images/[name]_[hash:8].[ext]',
                    },
                }],
            },
            // 字体库处理
            {
                test: /\.(woff|woff2)$/,
                use: ['url-loader'],
            },
        ],
    },

    plugins: [
        new HtmlWebpackPlugin({
            inject: true,
            template: './index.html',
        }),
        new HtmlWebpackPlugin({
            inject: true,
            template: './index.html',
            filename: 'diagnostic.html',
        }),
        new ESBuildPlugin(),
        new webpack.DefinePlugin({
            'process.env': {
                version: JSON.stringify(filterArgs('--env.version') || ''),
            },
        }),
        new CopyWebpackPlugin(copyPluginOpts),
        new FixReactVirtualizedPlugin(),
    ],

    // eval适用于生产环境
    devtool: 'eval',
};
