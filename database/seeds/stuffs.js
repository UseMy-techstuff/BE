
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('stuffs').truncate()
    .then(function () {
      // Inserts seed entries
      return knex("stuffs").insert([
        {
          item: "2-ton PC from the 1970's",
          price: 10
        },
        {
          item: "Ring Light",
          price: 15
        },
        {
          item: "Waifu Mousepad",
          price: 1000
        }
      ]);
    });
};
