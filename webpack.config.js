const path = require("path");
const ESLintPlugin = require("eslint-webpack-plugin");

module.exports = {
    entry: "./src/index.ts",
    mode: "development",
    resolve: {
        extensions: [".ts", ".js"],
    },
    plugins: [new ESLintPlugin({
        extensions: ["ts"],
        exclude: ["node_modules", "out"],
    })],
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: "ts-loader",
                exclude: /node_modules/,
            },
        ],
    },
    output: {
        filename: "index.js",
        path: path.resolve(__dirname, "out"),
    },
};
