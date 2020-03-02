
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('stuffs').truncate()
    .then(function () {
      // Inserts seed entries
      return knex("stuffs").insert([
        {
          user_id: 1,
          item_name: "2-ton PC from the 1970's.",
          description: "Super old, super heavy, super slow",
          price: 10,
          rented: false,
          img_url:
            "https://cdn.instructables.com/FGR/QCQE/FVW22Q2L/FGRQCQEFVW22Q2L.LARGE.jpg"
        },
        {
          user_id: 1,
          item_name: "Waifu Mousepad",
          price: 1000,
          description: "Feels just a little too soft.",
          rented: false,
          img_url:
            "https://images-na.ssl-images-amazon.com/images/I/513hqBSvF%2BL._SL500_AC_SS350_.jpg"
        },
        {
          user_id: 1,
          item_name: "Ring Light",
          description: "For all your beauty and selfie needs.",
          price: 15,
          rented: false,
          img_url:
            "https://www.maritimebeautyshop.com/images/product/medium/456471.jpg"
        }
      ]);
    });
};
