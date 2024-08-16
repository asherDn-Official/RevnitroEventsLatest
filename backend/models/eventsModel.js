const mongoose = require("mongoose");

const eventsSchema = new mongoose.Schema(
  {
    eventTitle: {
      type: String,
      required: true,
      trim: true,
    },
    eventStartDate: {
      type: Date,
      required: true,
    },
    eventEndDate: {
      type: Date,
      required: true,
    },
    bookingStartDate: {
      type: Date,
    },
    bookingEndDate: {
      type: Date,
    },
    eventStartTime: {
      type: String,
      required: true,
    },
    eventEndTime: {
      type: String,
    },
    eventLocation: {
      type: String,
      required: true,
    },
    eventEntryFees: {
      type: Number,
      required: true,
      default: 0,
    },
    redirectUrl: {
      type: String,
      trim: true,
    },
    thumbnail: {
      type: String,
      trim: true,
    },
    eventContent: {
      type: String,
      required: true,
      trim: true,
    },
    entries: [
      {
        entryName: String,
        mobileNumber: String,
        email: String,
        occupation: String,
        address: String,
        location: String,
        emailUpdates: Boolean,
      },
    ],
  },
  {
    timestamps: true,
    collection: "events",
  }
);

module.exports = mongoose.model("Event", eventsSchema);
