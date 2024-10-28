const path = require('path')
const fs = require('fs')

const HtmlWebpackPlugin = require('html-webpack-plugin')
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin')
const { ModuleFederationPlugin } = require('webpack').container

const packageJsonPath = path.resolve(__dirname, 'package.json')
const { dependencies } = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'))

module.exports = {
  entry: './src/index.tsx',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: 'https://e-commerce-container.vercel.app',
  },
  devtool: 'inline-source-map',
  resolve: {
    plugins: [new TsconfigPathsPlugin()],
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader', 'postcss-loader'],
      },
    ],
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'container',
      filename: 'remoteEntry.js',
      remotes: {
        productApp: 'productListing@http://localhost:3001/remoteEntry.js',
        userAuthenticationApp:
          'userAuthentication@http://localhost:3002/remoteEntry.js',
        shoppingCartApp: 'shoppingCart@http://localhost:3003/remoteEntry.js',
        orderHistoryApp: 'orderHistory@http://localhost:3004/remoteEntry.js',
      },

      exposes: {
        './store': './src/store',
        './actions': './src/store/shared/actions',
      },

      shared: {
        react: {
          singleton: true,
          eager: true,
          requiredVersion: dependencies.react,
        },
        'react-dom': {
          singleton: true,
          eager: true,
          requiredVersion: dependencies['react-dom'],
        },
        'react-redux': {
          singleton: true,
          eager: true,
          requiredVersion: dependencies['react-redux'],
        },
      },
    }),
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
  ],
  devServer: {
    static: path.join(__dirname, 'dist'),
    port: 8081,
    historyApiFallback: true,
    hot: false,
    liveReload: true,
  },

  mode: 'production',
}
