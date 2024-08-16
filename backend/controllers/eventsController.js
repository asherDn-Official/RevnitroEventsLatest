const Event = require("../models/eventsModel");

// Create a new event
exports.createEvent = async (req, res) => {
  try {
    // const eventData = {
    //   ...req.body,
    //   eventStartDate: new Date(req.body.eventStartDate),
    //   eventEndDate: new Date(req.body.eventEndDate),
    //   bookingStartDate: new Date(req.body.bookingStartDate),
    //   bookingEndDate: new Date(req.body.bookingEndDate),
    // };
    const eventData = req.body;
    const newEvent = new Event(eventData);
    const savedEvent = await newEvent.save();
    res.status(201).json(savedEvent);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Create a new entry
exports.createEntry = async (req, res) => {
  const id = req.params.id;

  const {
    entryName,
    mobileNumber,
    email,
    occupation,
    address,
    location,
    emailUpdates,
  } = req.body;

  try {
    const event = await Event.findById(id);
    if (!event) {
      return res.status(404).send({ message: "Event not found" });
    }

    const newEntry = {
      entryName,
      mobileNumber,
      email,
      occupation,
      address,
      location,
      emailUpdates, // Convert checkbox to boolean
    };

    event.entries.push(newEntry);
    await event.save();

    res.status(201).send({ message: "Entry added successfully" });
  } catch (error) {
    console.error("Error adding entry:", error);
    res.status(500).send({ message: "Error adding entry", error });
  }
};

// Get all events
exports.getAllEvents = async (req, res) => {
  try {
    const events = await Event.find();
    res.status(200).json(events);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get a single event by ID
exports.getEventById = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ message: "Event not found" });
    res.status(200).json(event);
  } catch (err) {
    if (err.kind === "ObjectId") {
      return res.status(404).json({ message: "Event not found" });
    }
    res.status(500).json({ message: err.message });
  }
};

// Update an event by ID
exports.updateEvent = async (req, res) => {
  try {
    const eventData = {
      ...req.body,
      eventStartDate: new Date(req.body.eventStartDate),
      eventEndDate: new Date(req.body.eventEndDate),
      bookingStartDate: new Date(req.body.bookingStartDate),
      bookingEndDate: new Date(req.body.bookingEndDate),
    };
    const updatedEvent = await Event.findByIdAndUpdate(
      req.params.id,
      eventData,
      { new: true, runValidators: true }
    );
    if (!updatedEvent)
      return res.status(404).json({ message: "Event not found" });
    res.status(200).json(updatedEvent);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Delete an event by ID
exports.deleteEvent = async (req, res) => {
  try {
    const deletedEvent = await Event.findByIdAndDelete(req.params.id);
    if (!deletedEvent)
      return res.status(404).json({ message: "Event not found" });
    res.status(200).json({ message: "Event deleted" });
  } catch (err) {
    if (err.kind === "ObjectId") {
      return res.status(404).json({ message: "Event not found" });
    }
    res.status(500).json({ message: err.message });
  }
};
