import Events from "../models/event-schema.js";

// Helper function to format date as "dd-mm-yy"
function formatDate(date) {
  if (!date) return null;
  const d = new Date(date);
  return d.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "2-digit",
  });
}

export default class EventRepository {
  /**
   * Create a new event in the database
   * @param {Object} eventData - Event details
   * @returns {Promise<Object>} - Created event
   */
  async createEvent(eventData) {
    return await Events.create(eventData);
  }

  /**
   * Find event all.
   * @returns {Promise<Object|null>} - Admin object or null
   */
  async findAllEvents() {
    const events = await Events.find({}, { createdAt: 0 }) // Exclude createdAt
    .sort({ _id: -1 }); 

    return events.map((event) => ({
      id:event._id,
      category:event.category,
      title:event.title,
      description:event.description,
      link:event.link,
      startDate: formatDate(event.startDate),
      endDate: event.endDate ? formatDate(event.endDate) : null,
    }));
  }



  //event fetching based on catogory 

  /**
   * Find events by category.
   * @param {string} category - The category of events to fetch.
   * @returns {Promise<Object[]>} - Array of events matching the category.
   */
  async findEventsByCategory(category) {
    const events = await Events.find({ category }, { createdAt: 0 }) // Exclude createdAt
      .sort({ _id: -1 });

    return events.map((event) => ({
      id: event._id,
      category: event.category,
      title: event.title,
      description: event.description,
      link: event.link,
      startDate: formatDate(event.startDate),
      endDate: event.endDate ? formatDate(event.endDate) : null,
    }));
  }
}
