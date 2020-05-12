
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('brands').del()
    .then(function () {
      // Inserts seed entries
      return knex('brands').insert([
        { name: 'Apple'},
        { name: 'Sony'},
        { name: 'Samsung'},
        { name: 'Walsworth Publishing'},
        { name: 'Wearwood Publishing'},
        { name: 'ElFayed'}
      ]);
    });
};
