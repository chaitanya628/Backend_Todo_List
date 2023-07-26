const express = require("express");
const router = express.Router();
const middleware = require('../middleware/user');
const taskController = require('../controllers/task');

router.post('/create', [middleware.validateUser], taskController.addToDo);

router.put('/update/:id', [middleware.validateUser], taskController.updateToDo);

router.delete('/delete/:id', [middleware.validateUser], taskController.deleteToDo);

router.get('/list', [middleware.validateUser], taskController.toDoList);

module.exports = router;
