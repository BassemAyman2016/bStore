
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('models').del()
    .then(function () {
      // Inserts seed entries
      return knex('models').insert([
        { name: 'Galaxy'},
        { name: 'Xperia'},
        { name: 'IPhone'},
        { name: 'IPod'},
        { name: 'Wardrobe'},
        { name: 'Mac'}
      ]);
    });
};
