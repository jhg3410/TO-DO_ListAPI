const express = require('express');
const User = require('../models/user');
const Todo = require('../models/todo');

const router = express.Router();

router.route('/')
    .get(async (req, res, next) => {
        try {
        const users = await User.findAll();
        res.json(users);
        } catch (err) {
        console.error(err);
        next(err);
        }
    })
    .post(async (req, res, next) => {
        try {
        const user = await User.create({
            name: req.body.name,
            age: req.body.age,
            email: req.body.email,
        });
        console.log(user);
        res.status(201).json(user);
        } catch (err) {
        console.error(err);
        next(err);
        }
    });

router.route('/:id')
    .get(async (req,res,next) => {
        try {
            const todos = await Todo.findAll({
              include: {
                model: User,
                where: { id: req.params.id },
              },
            });
            console.log(todos);
            res.json(todos);
          } catch (err) {
            console.error(err);
            next(err);
          }
    })
    .patch(async (req,res,next) => {
        try {
            const result = await User.update({
              age: req.body.age,
              name:req.body.name,
            }, {
              where: { id: req.params.id },
            });
            // res.json(result);
            res.send('200')
          } catch (err) {
            console.error(err);
            next(err);
          }
    });

router.post('/:id/todos', async (req, res, next) => {
  try {
    const todo = await Todo.create({
      member: req.body.member,
      content: req.body.content,
      isCompleted : true,
    });
    console.log(todo);
    res.status(201).json(todo);
  } catch (err) {
    console.error(err);
    next(err);
  }
})

module.exports = router;