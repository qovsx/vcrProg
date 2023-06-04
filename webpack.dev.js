import HtmlWebpackPlugin from 'html-webpack-plugin'
import { TsconfigPathsPlugin } from 'tsconfig-paths-webpack-plugin'

const extensions = ['.ts', '.js']

const exportsList = {
    mode: 'development',
    entry: './src/index.ts',
    devtool: 'inline-source-map',
    devServer: {
        hot: true,
        open: ['./index.html'],
    },
    resolve: {
        extensions,
        plugins: [new TsconfigPathsPlugin({ extensions })],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html',
            inject: true,
        }),
    ],
    module: {
        rules: [
            {
                test: /\.js$/,
                resolve: { fullySpecified: false },
            },
            {
                test: /\.ts$/i,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            }
        ],
    },
}

export default exportsList
