
const webpack = require('webpack')
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ModuleFederationPlugin = require("webpack").container
    .ModuleFederationPlugin;
const config = {
    mode: 'none',
    entry: {
        app: './src/app.js'
    },
    output: {
        filename: '[name].js',
    },
    plugins: [
        new ModuleFederationPlugin({
            name: "app_2",
            filename: "remoteEntry.js",
            remotes: {
                app1: 'app1@http://localhost:3001/remoteEntry.js',
            },
            exposes: {
                m2: './src/m.js',
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
