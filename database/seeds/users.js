
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users').truncate()
    .then(function () {
      // Inserts seed entries
      return knex("users").insert([
        {
          first_name: "Jo",
          last_name: "Doe",
          username: "test",
          password:
            "$2y$08$BsnCyZtPXjL4ROy6ygYEGOHMBr1x4yOgED.MU3pOWfKimQg.Jhqcy",
        }
      ]);
    });
};
