
const webpack = require('webpack')
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ModuleFederationPlugin = require("webpack").container
    .ModuleFederationPlugin;
const config = {
    entry: {
        app: './src/app.js'
    },
    output: {
        filename: '[name].js',
    },
    plugins: [
        new ModuleFederationPlugin({
            name: "app_1",
            filename: "remoteEntry.js",
            remotes: {
                app2: 'app2@http://localhost:3002/remoteEntry.js',
            },
            exposes: {
                m1: './src/m.js',
            }
        }),
        new HtmlWebpackPlugin({
            template: "./src/index.html"
        })
    ]
}


const compiler = webpack(config)

compiler.run((err, stats) => {
    console.log(err);
    // console.log(stats);
})
