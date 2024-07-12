const express = require('express');
const dotenv = require('dotenv');
dotenv.config();
const app = express();
app.use(express.json());

let todos = [];
let currentId = 1;

//[GET / TODOS]
app.get('/todos/', (req, res) => {
    res.json(todos);

})

//[POST NEW TODOS]
app.post('/todos/:newTodo', (req, res) => {
    const todo = {
        id: currentId++,
        text: req.body.text,
        complet: false,

    };
    todos.push(todo);
    res.status(201).json(todo);
});

//[GET/TODO /ID]
app.get('/todo/:id', (req, res) => {
    const todo = todos.find(text => text.id === parseInt(req.params.id));
    if (!todo) return res.status(404).send('Todo not found');

    todo.text = req.body.text;
    todo.complet = req.body.complet;
    res.json(todo);

});

//[DELETE TODO ID]
app.delete('/todo/:deleteId', (req, res) => {
    const todoIndex = todos.findIndex(text => text.id === parseInt(req.params.id));
    if (todoIndex === -1) return res.status(404).send('TOdo not fount');

    const deletedTodo = todos.splice(todoIndex, 1);
    res.json(deletedTodo);

});

const port = process.env.PORT || 3003;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})

