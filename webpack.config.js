const path = require("path");

const vue = {
    mode: 'development',
    entry:{
        admin:path.resolve('./src/main/webapp/vue/index.map.js')
    },
    output:{
        filename:"[name].js",
        path: path.resolve("./src/main/webapp/resources/js"),
    },
    module:{
        rules:[
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                exclude:/node_modules/,
                options: {
                    loaders: {
                        ts: 'ts-loader'
                    },
                    esModule: true,
                }
            },
            {
                test: /\.css/,
                use:["vue-style-loader","css-loader"]
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
            },
            {
                test: /\.s(c|a)ss$/,
                use: [
                    'vue-style-loader',
                    'css-loader',
                    {
                        loader: 'sass-loader',
                        options: {
                            implementation: require('sass'),
                            sassOptions: {
                                indentedSyntax: true // optional
                            },
                        },
                    },
                ],
            },
        ]
    },
    resolve:{
        extensions: ['.vue', '.json','.js','.ts','.scss','.sass','.css'],
        alias: {
            vue$: 'vue/dist/vue.js'
        },
    },
}

const react = {
    mode:"development",
    entry:{
        client:path.resolve('src/main/webapp/react/index.jsx'),
    },
    output:{
        path:path.resolve("src/main/webapp/resources/js"),
        filename:"[name].js"
    },
    module: {
        rules: [
            {
                test:/\.jsx$/,
                enforce: 'pre',
                use:[
                    {loader:"babel-loader",
                        options: {
                            "presets": ["@babel/preset-env","@babel/preset-react"],
                            "plugins": [
                                ["@babel/transform-runtime"]
                            ]
                        }},
                    {loader:"source-map-loader"}
                ],
            },
            {
                test:/\.scss/,
                use:['style-loader',"css-loader","sass-loader"]
            },
            {
                test: /\.css$/,
                loader: 'style-loader!css-loader'
            },
        ],
    },
    resolve: {
        extensions: ['.js', '.json','.jsx','.scss'],
    },
    target:"node",
};

module.exports = [vue,react];