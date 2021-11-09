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
        [email, firstName, lastName, username, password],
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
  User.findOne({ email: req.body.email }, (err, foundUser) => {
    if (!err) {
      // there is no error check if user found or not
      if (foundUser) {
        // user exist so now check for password
        if (bcrypt.compareSync(req.body.password, foundUser.hashPassword)) {
          // username and passowrd is correct
          const { _id, firstName, lastName, email, role } = foundUser;
          res.status(200).json({
            token: generateToken(foundUser),
            user: {
              _id,
              firstName,
              lastName,
              email,
              role,
              fullName: `${firstName}` + ` ` + `${lastName}`
            }
          });
        } else {
          res
            .status(400)
            .json({ message: "Enter username or password is incorrect!" });
        }
      } else {
        // user not found
        res.status(404).json({ message: "User not found!" });
      }
    } else {
      // there is something error
      res.status(400).json({ message: err });
    }
  });
};
