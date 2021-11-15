const express = require('express');
const User = require('../models/user');
const Todo = require('../models/todo');


const router = express.Router();

router.route('/:id')
    .patch(async (req, res, next) => {
        try {
            const result = await Todo.update({
            content: req.body.content,
            isCompleted : false
            },
             {where: { id: req.params.id },
            });
            res.json(result);
        } catch (err) {
            console.error(err);
            next(err);
        }
    })
    .delete(async (req, res, next) => {
        try {
          const result = await Todo.destroy({ 
              where: { id: req.params.id } 
            });
          res.json(result);
        } catch (err) {
          console.error(err);
          next(err);
        }
    })
    .get(async (req,res,next) => {
        try {
            const todo = await Todo.findOne({
                where: {id :req.params.id},
                include:{
                    model : User,
                }
            })            
            console.log(todo);
            res.json(todo);
          } catch (err) {
            console.error(err);
            next(err);
          }
    });


module.exports = router;