import HtmlWebpackPlugin from "html-webpack-plugin";
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import path from "path";
export default {//不用webpack merge时这里要改成匿名默认导出
    entry: "./config/webpack/index.tsx",
    output: {
        filename: "js/[name].[contenthash:10].js",
        path: path.resolve("./build"),
        publicPath: '/'
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: ["ts-loader"],
            },
            {
                test: /\.tsx$/i,
                use: ["ts-loader"]
            },
            {
                test: /\.scss$/,
                use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
            },
            {
                //https://react-svgr.com/docs/webpack/
                type: 'asset',
                resourceQuery: /url/, // *.svg?url
            },
            {
                //https://react-svgr.com/docs/webpack/ svg转换为react组件而不是字符串
                test: /\.svg$/i,
                issuer: /\.[jt]sx?$/,
                use: [{
                    loader: '@svgr/webpack', options: {
                        ref: true
                    }
                }],
                include: [path.resolve('src/assets/code')]
            },
            {
                test: /\.(png|svg|jpe?g)$/i,
                type: 'asset/resource',
                exclude: [path.resolve('src/assets/code')]
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/i,
                loader: 'file-loader'
            }
        ],
    },
    resolve: {
        extensions: [".js", ".ts", ".tsx"],
    },
    optimization: {
        splitChunks: {
            chunks: 'all'
        }
    },
    plugins: [

        new HtmlWebpackPlugin({
            template: "./config/webpack/index.html",
            minify: {
                //移除空格
                collapseWhitespace: true,
                //移除注释
                removeComments: true
            }
        }),

        new MiniCssExtractPlugin({
            filename: 'css/main.css'
        })
    ],
    mode: "development",
    devServer: {
        open: true,
        port: 9999,
        hot: true,
        historyApiFallback: true,

    },
};
