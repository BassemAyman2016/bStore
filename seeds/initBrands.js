
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('brands').del()
    .then(function () {
      // Inserts seed entries
      return knex('brands').insert([
        {id: 1, name: 'Apple'},
        {id: 2, name: 'Sony'},
        {id: 3, name: 'Samsung'},
        {id: 4, name: 'Walsworth Publishing'},
        {id: 5, name: 'Wearwood Publishing'},
        {id: 6, name: 'ElFayed'}
      ]);
    });
};
