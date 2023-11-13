// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path');

module.exports = {
    entry: './src/index.ts', // Giriş noktası, src klasörünüzdeki ana dosya
    externals: {
        react: {
            commonjs: 'react',
            commonjs2: 'react',
            amd: 'React',
            root: 'React',
        },
        'react-dom': {
            commonjs: 'react-dom',
            commonjs2: 'react-dom',
            amd: 'ReactDOM',
            root: 'ReactDOM',
        },
    },
    output: {
        path: path.resolve(__dirname, 'dist'), // Çıkış dizini
        filename: 'bundle.js', // Çıkış dosyası
        library: 'react-formera',
        libraryTarget: 'umd',
        globalObject: 'this',
    },
    resolve: {
        alias: {
            react: path.resolve(__dirname, './node_modules/react'),
            'react-dom': path.resolve(__dirname, './node_modules/react-dom'),
        },
        extensions: ['.tsx', '.ts', '.js'], // İşlenecek dosya uzantıları
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/, // .ts ve .tsx dosyalarını işle
                use: 'ts-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.jsx?$/, // .js ve .jsx dosyalarını işle
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            '@babel/preset-env',
                            '@babel/preset-react',
                            '@babel/preset-typescript',
                        ],
                    },
                },
                exclude: /node_modules/,
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
            },
        ],
    },
    devServer: {
        static: path.join(__dirname, 'dist'), // Geliştirme sunucusu için içerik dizini
        compress: true,
        port: 9000, // Sunucu portu
    },
};
