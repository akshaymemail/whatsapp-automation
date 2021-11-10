import bcrypt from "bcrypt";
import { generateToken } from "../../config/jwtConfig.js";
import db from "../../database/db.js";

// SIGNUP CONTROLLER
export const signup = (req, res) => {
  db.query(
    `SELECT * FROM users WHERE email = '${req.body.email}'`,
    (err, result) => {
      if (err) {
        return res.status(500).json({
          success: false,
          message: "Error while checking if user already exists"
        });
      }
      if (result.length > 0) {
        return res.status(400).json({
          success: false,
          message: "User already exists"
        });
      }
      //found new user
      // 1. destructure body data to register
      // 2. register him / her
      const { firstName, lastName, email, username, password } = req.body;

      db.execute(
        `INSERT INTO users (email, firstname, lastname, username, password) VALUES (?,?,?,?,?)`,
        [email, firstName, lastName, username, bcrypt.hashSync(password, 10)],
        (err, result) => {
          if (err) {
            return res.status(500).json({
              success: false,
              message: "Error while registering user"
            });
          }
          return res.status(200).json({
            success: true,
            message: "User successfully registered, please login"
          });
        }
      );
    }
  );
};

// SIGNIN CONTROLLER
export const signin = (req, res) => {
  // 1. destructure body data to login
  // 2. login him / her
  const { email, password } = req.body;
  db.query(`SELECT * FROM users WHERE email = ?`, [email], (err, result) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: err
      });
    }
    if (result.length === 0) {
      return res.status(400).json({
        success: false,
        message: "User does not exist"
      });
    }
    const user = result[0];

    if (bcrypt.compareSync(password, user.password)) {
      return res.status(200).json({
        success: true,
        message: "User successfully logged in",
        token: generateToken(user)
      });
    } else {
      return res.status(400).json({
        success: false,
        message: "wrong password"
      });
    }
  });
};
