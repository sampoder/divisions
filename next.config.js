module.exports = {
  async rewrites() {
    return [
      {
        source: '/:path',
        destination: '/?id=:path',
      },
    ]
  },
}