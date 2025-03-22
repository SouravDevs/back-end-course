// This is a practice file

// Create a database
use('mobileStore')

// Create a collection in mobileStore database
const mobileCollection = db.getCollection('mobiles');

// Insert one mobile data in mobiles collcetion
mobileCollection.insertOne({model: "SamSung", price: 17999.99})

// Insert many mobiles data in mobile collection using array
mobileCollection.insertMany([
    {model: "SamSung", price: 18999.99},
    {model: "Iphone 15", price: 99999.99},
])

const data = mobileCollection.find();
console.log(data); // Print all documents from mobiles collection