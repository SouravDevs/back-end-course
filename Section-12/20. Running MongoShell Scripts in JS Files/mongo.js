// use('bookStore') // Swicth to bookStore database from test
// console.log(db); // Print current database

use('todoApp') // Swicth to todoApp database from test


// db.todos.insertOne({title: "Complete Next.js", completed: false})
// const data = db.todos.find()
// console.log(data); // Show all documents from todos collection

// Another way to insert data in a collection
const todosCollection = db.getCollection('todos');
// You can use like this without a variable like todosCollections
// db.getCollection('todos').insertOne({title: "Learn TypeScript", completed: false})

for (let i = 0; i <= 10; i++) {
    todosCollection.insertOne({
        title: `Task : ${i}`, completed: i % 2 === 0 ? true : false
    })
}

const data = todosCollection.find()
console.log(data);



