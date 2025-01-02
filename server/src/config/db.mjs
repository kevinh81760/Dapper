import mongoose from 'mongoose';

mongoose.connect("mongodb://localhost/")
    .then(() => console.log("Connected to Database"))
    .catch((err) => console.log(`Error ${err}`));
