// const express = require("express");
// const { randomBytes } = require("crypto");
import argon2 from "argon2";

import { default as db } from "../models/index.js";
import httpStatus from "http-status";
const database = await db();

export default {
  async adminLogin(req, res) {
    const username = req.body.username;
    const password = req.body.password;

    if (!username || !password) {
      return res.status(400).json({ msg: "invalid login" });
    }

    const user = await database.admin.findOne({ where: { username } });

    if (!user) {
      return res.status(404).json({ msg: "username does not exist" });
    }

    // if (user.password === password) {
    if (await argon2.verify(user.password, password)) {
      return res.status(200).json({ msg: "success" });
    }
    //   return res
    //     .status(httpStatus.OK)
    //     .json({ username: username, role: user.role });

    return res.status(httpStatus.OK).json({ msg: "wrong password" });
  },
  async studentLogin(req, res) {
    const username = req.body.username;
    const password = req.body.password;

    if (!username || !password) {
      return res.status(400).json({ msg: "invalid login" });
    }

    const database = await db();

    const user = await database.student.findOne({ where: { username } });
    console.log(user);

    if (!user) {
      return res.status(404).json({ msg: "username does not exist" });
    }

    if (await argon2.verify(user.password, password)) {
      return res.status(httpStatus.OK).json({ user: user.id, role: user.role });
    }
    return res.status(401).json({ msg: "wrong password" });
  },
};
