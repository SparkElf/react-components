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
                test: /\.(png|svg|jpe?g)$/i,
                loader: 'url-loader'
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
