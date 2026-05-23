const restaurants = [
  {
    name: {
      ar: 'كنتاكي',
      en: 'KFC',
    },
    slug: 'kfc',
    cuisines: ['Fried', 'Burgers'],
    location: {
      type: 'Point',
      coordinates: [31.2357, 30.0444],
    },
  },
  {
    name: {
      ar: 'سوشي هاوس',
      en: 'Sushi House',
    },
    slug: 'sushi-house',
    cuisines: ['Asian', 'Japanese'],
    location: {
      type: 'Point',
      coordinates: [31.236, 30.0448],
    },
  },
  {
    name: {
      ar: 'برجر هب',
      en: 'Burger Hub',
    },
    slug: 'burger-hub',
    cuisines: ['Burgers', 'Fast Food'],
    location: {
      type: 'Point',
      coordinates: [31.2352, 30.045],
    },
  },
  {
    name: {
      ar: 'بيتزا بالاس',
      en: 'Pizza Palace',
    },
    slug: 'pizza-palace',
    cuisines: ['Italian', 'Pizza'],
    location: {
      type: 'Point',
      coordinates: [31.239, 30.047],
    },
  },
  {
    name: {
      ar: 'سي فود تاون',
      en: 'Seafood Town',
    },
    slug: 'seafood-town',
    cuisines: ['Seafood'],
    location: {
      type: 'Point',
      coordinates: [31.2857, 30.1044],
    },
  },
];

module.exports = restaurants;