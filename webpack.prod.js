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
    publicPath: 'https://e-commerce-container.vercel.app/',
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
        productApp:
          'productListing@https://e-commerce-product-silk.vercel.app/remoteEntry.js',
        userAuthenticationApp:
          'userAuthentication@https://e-commerce-authentication-flame.vercel.app/remoteEntry.js',
        shoppingCartApp:
          'shoppingCart@https://e-commerce-shopping-cart-ten.vercel.app/remoteEntry.js',
        orderHistoryApp:
          'orderHistory@https://e-commerce-orders.vercel.app/remoteEntry.js',
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
