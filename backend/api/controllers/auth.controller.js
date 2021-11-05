import argon2 from "argon2";
import { default as jwt } from "../utils/jwt.js";
import { default as db } from "../models/index.js";
import httpStatus from "http-status";
import { randomBytes } from "crypto";

const signToken = async (user) => {
  const accessToken = await jwt.signAccessToken(
    user.id,
    user.role,
    user.securitySecret
  );
  const refreshToken = await jwt.signRefreshToken(
    user.id,
    user.role,
    user.securitySecret
  );
  return {
    id: user.id,
    username: user.username,
    accessToken: accessToken,
    refreshToken: refreshToken,
  };
};
const getUserDbStrategy = {
  admin: () => {
    return db.admin;
  },
  school: () => {
    return db.school;
  },
  teacher: () => {
    return db.teacher;
  },
  student: () => {
    return db.student;
  },
};

export default {
  async refreshToken(req, res) {
    const token = req.body.refreshToken;
    if (!token) {
      return res
        .status(httpStatus.BAD_REQUEST)
        .json({ msg: "No token provided" });
    }
    try {
      const decodedToken = await jwt.verifyRefreshToken(token);
      if (!decodedToken) {
        throw new Error("No refresh token");
      }
      const database = getUserDbStrategy[decodedToken.role]();

      const user = await database.findOne({ where: { id: decodedToken.sub } });

      const info = await signToken(user);

      return res.status(httpStatus.OK).json(info);
    } catch (err) {
      console.log(err);
      return res.status(httpStatus.UNAUTHORIZED).json({ msg: "Unauthorized" });
    }
  },
  async login(req, res) {
    const username = req.body.username;
    const password = req.body.password;
    const role = req.body.role;

    if (!username || !password) {
      return res.status(400).json({ msg: "invalid login" });
    }
    const database = getUserDbStrategy[role]();
    const user = await database.findOne({ where: { username } });

    if (!user) {
      return res.status(404).json({ msg: "username does not exist" });
    }

    if (await argon2.verify(user.password, password)) {
      const info = await signToken(user);

      return res.status(httpStatus.OK).json(info);
    }

    return res.status(401).json({ msg: "wrong password" });
  },
  async changePassword(req, res) {
    const role = req.user.role;
    const id = req.user.id;
    const newPassword = req.body.newPassword;

    const database = getUserDbStrategy[role]();
    try {
      const user = await database.findOne({ where: { id } });
      if (!user) {
        return res
          .status(httpStatus.BAD_REQUEST)
          .json({ msg: "user does not exist" });
      }
      if (await argon2.verify(user.password, newPassword)) {
        return res
          .status(httpStatus.BAD_REQUEST)
          .json({ msg: "please enter a new password!" });
      }
      const salt = randomBytes(32);
      user.password = await argon2.hash(req.body.newPassword, { salt });
      // Generate new secret to invalid all the tokens
      user.securitySecret = randomBytes(32).toString("hex");
      await user.save();
      return res.status(200).json({ msg: "success" });
    } catch (err) {
      console.log(err);
      return res
        .status(httpStatus.BAD_REQUEST)
        .json({ msg: "something wrong" });
    }
  },
  async logOutAll(req, res) {
    const userInfo = req.user;
    const database = getUserDbStrategy[userInfo.role]();
    try {
      const user = await database.findOne({ where: { id: userInfo.id } });

      user.securitySecret = await randomBytes(32).toString("hex");
      await user.save();
      return res.status(200).json({ msg: "success" });
    } catch (err) {
      console.log(err);
      return res
        .status(httpStatus.BAD_REQUEST)
        .json({ msg: "something wrong" });
    }
  },
};
