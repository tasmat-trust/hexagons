module.exports = {
  eslint: {
    dirs: ['components', 'pages', 'queries', 'styles', 'cypress'], // Only run ESLint on the 'pages' and 'utils' directories during production builds (next build)
  },
  images: {
    domains: [
      'localhost',
      'strapi-bfxo.onrender.com',
      'backend.hexagons.app',
      'hexagons-backend-znrzh.ondigitalocean.app',
      'stm-backend.hexagons.app',
      'tasmat-backend.hexagons.app',
    ],
  },
};
