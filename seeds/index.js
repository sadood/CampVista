const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose.connect('mongodb://localhost:27017/camp-vista', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = array => array[Math.floor(Math.random() * array.length)];


const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 300; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            // YOUR USER ID 
            author: '65f17ca21b23595aacf7dcaf',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Molestiae ea itaque possimus maiores facilis laboriosam, aut veritatis necessitatibus odit sapiente beatae error. Praesentium, suscipit sapiente amet aperiam aliquam a maxime!',
            price: price,
            geometry: {
              type: 'Point',
              coordinates: [
                cities[random1000].longitude,
                cities[random1000].latitude
              ]
            },
            images:  [
                {
                  url: 'https://res.cloudinary.com/dw7uoskuy/image/upload/v1710759871/barn-2594975_1280_en9bkq.jpg',
                  filename: 'CampVista/kzihgobtcnhzdvuszxj0'
                },
                {
                  url: 'https://res.cloudinary.com/dw7uoskuy/image/upload/v1710759870/tent-5441144_1280_vorztl.jpg',
                  filename: 'CampVista/zck4vjghiw6ji7eg2ebu'
                },
                {
                  url: 'https://res.cloudinary.com/dw7uoskuy/image/upload/v1710759870/nature-7736939_1280_zsuaec.jpg',
                  filename: 'CampVista/xipowiexbhv8femvwunu'
                }
              ]
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})