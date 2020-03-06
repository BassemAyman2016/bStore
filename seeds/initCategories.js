
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('categories').del()
    .then(function () {
      // Inserts seed entries
      return knex('categories').insert([
        {id: 1, name: 'Books'},
        {id: 2, name: 'Mobile Phones'},
        {id: 3, name: 'Tablets'},
        {id: 4, name: 'Furniture'}
      ]);
    });
};
