import UserRepository from "../repositories/user-repository.js";

const userRepository = new UserRepository();

export default class UserController {
  async getNotes(req, res) {
    try {
      const filters = req.body.filters || {};
      const result = await userRepository.getNotes(filters);
      res.json(result);
    } catch (error) {
      console.error("Error in getNotes:", error);
      res.status(500).json({ status: false, message: "Server error." });
    }
  }
  
}
