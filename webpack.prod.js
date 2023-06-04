import HtmlWebpackPlugin from 'html-webpack-plugin'
import { TsconfigPathsPlugin } from 'tsconfig-paths-webpack-plugin'
import { fileURLToPath } from 'url'
import path from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const extensions = ['.ts', '.js']

const exportsList = {
    mode: 'production',
    entry: './src/index.ts',
    output: {
        path: `${__dirname}/dist`,
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