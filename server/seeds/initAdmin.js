
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('admins').del()
    .then(function () {
      // Inserts seed entries
      return knex('admins').insert([
        { 
          email:'admin',
          first_name:"first",
          last_name:"admin",
          password: '$2a$10$E2RKBqU4bvZndZy.zaUgn.vgupwA5A9QOgyi5vCM0SZ0VXqdHzKOO'
        }
      ]);
    });
};
