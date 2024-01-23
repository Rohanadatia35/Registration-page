const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const success_path=path.join(__dirname,'../html/success.html');
const app = express();
const port = process.env.PORT || 3000;


mongoose.connect('mongodb://127.0.0.1:27017/Registration_Page');

const registrationSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String
});

const data = mongoose.model('datas', registrationSchema);


app.use(express.static(path.join(__dirname, '../html')));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.post('/register', async (req, res) => {
        const registrationData = new data({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        });
     
        let result=await registrationData.save();
        res.sendFile(success_path)
    });

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../html', '404.html'));
});

app.listen(port);
