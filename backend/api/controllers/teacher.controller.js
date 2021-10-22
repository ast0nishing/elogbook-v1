import { default as db } from '../models/index.js';

const Teacher = db.teacher;

export default {
    async create(req, res) {},
    async findAll(req, res) {
        await Teacher.findAll()
            .then((data) => {
                res.send(data);
            })
            .catch((err) => {
                res.status(500);
            });
    },
    async findOne(req, res) {},
    async update(req, res) {},
    async delete(req, res) {},
};
