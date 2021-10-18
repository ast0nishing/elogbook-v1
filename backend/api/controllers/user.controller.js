import db from "../models/index.js";

export default {
  async create(req, res) {
    const users = {
      username: req.body.username,
      password: req.body.password,
      role: req.body.role,
    };
    await db.user

      .create(users)
      .then((data) => {
        res.send(data);
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message || "some error occurred while creating a user",
        });
      });
  },
  async findAll(req, res) {
    await db.user
      .findAll()
      .then((data) => {
        // const newdata = data.map((data) => {
        //     data.id = undefined;
        // });
        // console.log(typeof newdata);
        // res.send(
        //     data.map((data) => {
        //         data.username;
        //     })
        // );
        res.send(data);
      })
      .catch((err) => {
        res.status(500);
      });
  },
  async findOne(req, res) {
    await db.user
      .findOne({
        where: { id: req.params.id },
      })
      .then((data) => {
        if (data) res.send(data);
        res.send("user not found!");
      })
      .catch((err) => {
        res.status(500);
      });
  },
  async update(req, res) {
    await db.user
      .update(
        { password: req.body.password },
        { where: { username: req.params.username } }
      )
      .then((status) => {
        if (status === 1) res.send("updated password");
        else res.status(400).send("update password fail");
      })
      .catch((err) => {
        res.status(500);
      });
  },
  async delete(req, res) {
    await db.user
      .destroy({ where: { username: req.params.username } })
      .then((status) => {
        if (status === 1) res.send("deleted user");
        else res.status(400).send("something happen while deleting user");
      })
      .catch((err) => {
        res.status(500);
      });
  },
};
