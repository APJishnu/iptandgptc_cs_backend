import bcrypt from "bcrypt";

/**
 * Hash the password before saving to the database.
 * @param {string} password - Plain text password
 * @returns {Promise<string>} - Hashed password
 */
export const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

/**
 * Compare entered password with stored hashed password.
 * @param {string} password - Plain text password
 * @param {string} hashedPassword - Hashed password from DB
 * @returns {Promise<boolean>} - True if match, else false
 */
export const comparePassword = async (password, hashedPassword) => {
  return await bcrypt.compare(password, hashedPassword);
};
