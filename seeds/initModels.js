
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('models').del()
    .then(function () {
      // Inserts seed entries
      return knex('models').insert([
        {id: 1, name: 'Galaxy'},
        {id: 2, name: 'Xperia'},
        {id: 3, name: 'IPhone'},
        {id: 4, name: 'IPod'},
        {id: 5, name: 'Wardrobe'},
        {id: 6, name: 'Mac'}
      ]);
    });
};
