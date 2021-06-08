module.exports = {
  module: {
    loaders: [
      {
        test: /\.(png|jpg|gif)$/,
        loader: 'url?limit=25000',
      },
    ],
  },
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    // Important: return the modified config
    return config
  },
}
