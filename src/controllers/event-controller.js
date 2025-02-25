import EventRepository from "../repositories/event-repository.js";

const eventRepository = new EventRepository();

export default class EventController {
  /**
   * Handle adding a new event
   * @param {Object} req - Request object
   * @param {Object} res - Response object
   */
  async addEvent(req, res) {
    try {
      const { category, title, description, link, startDate, endDate } =
        req.body.event;
      const errors = [];

      // Validation
      if (!category)
        errors.push({ field: "category", message: "Category is required" });
      if (!title) errors.push({ field: "title", message: "Title is required" });
      if (!startDate)
        errors.push({ field: "startDate", message: "Start Date is required" });

      if (errors.length > 0) {
        return res
          .status(400)
          .json({ status: false, message: "Validation errors", errors });
      }

      // Save event in database
      const newEvent = await eventRepository.createEvent({
        category,
        title,
        description,
        link,
        startDate,
        endDate,
      });

      return res.status(200).json({
        status: true,
        message: "Event added successfully",
        event: newEvent,
      });
    } catch (error) {
      console.error("Error in EventController addEvent:", error);
      return res.status(500).json({
        status: false,
        message: "Internal server error",
        errors: [
          {
            field: "server",
            message: "Something went wrong. Please try again.",
          },
        ],
      });
    }
  }

  /**
   * Handle fetching all events
   * @param {Object} req - Request object
   * @param {Object} res - Response object
   */
  async findAllEvents(req, res) {
    try {
      const events = await eventRepository.findAllEvents();

      if (events.length > 0) {
        return res.status(200).json({
          status: true,
          message: "Events fetched successfully",
          data: events,
        });
      } else {
        return res.status(404).json({
          status: false,
          message: "No events found",
          data: [],
        });
      }
    } catch (error) {
      console.error("Error in EventController findAllEvents:", error);
      return res.status(500).json({
        status: false,
        message: "Internal server error",
        errors: [
          {
            field: "server",
            message: "Something went wrong. Please try again.",
          },
        ],
      });
    }
  }

  //event fetching based on category

  /**
   * Get events by category for users
   * @param {Request} req - Express request object
   * @param {Response} res - Express response object
   */
  async getUserEventsByCategory(req, res) {
    try {
      const { category } = req.body; // Get category from request body

      if (!category) {
        return res
          .status(400)
          .json({ status: false, message: "Category is required" , data:[] });
      }

      const events = await eventRepository.findEventsByCategory(category);

      res.json({
        status: true,
        message: "Events fetched successfully",
        data: events,
      });
    } catch (error) {
      console.error("Error fetching events:", error);
      res
        .status(500)
        .json({ status: "error", message: "Internal Server Error" });
    }
  }
}
