const mongoose = require("mongoose");

const DiningCourtSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  address: {
    type: String,
    required: true,
  },
  schedule: [
    {
      date: String,
      menus: [
        {
          menuType: String,
          timeServed: String,
          stations: [
            {
              name: String,
              foods: [{ type: mongoose.Schema.Types.ObjectId, ref: "Food" }],
            },
          ],
        },
      ],
    },
  ],
});

module.exports = mongoose.model("diningCourts", DiningCourtSchema);
