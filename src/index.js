const express = require('express');
const cors = require("cors");
const formidable = require('formidable');
const fs = require('fs');

const app = express();

const port = 3333;

const routes = express.Router();

app.use(cors());

app.use(express.json());

routes.post('/upload', (req, res)=>{
    const form = new formidable.IncomingForm();
    form.parse(req, (err, fields, files)=>{
        const oldPath = files.file.path;
        const newPath = './uploads/'+files.file.name;
        fs.rename(oldPath, newPath, (err)=>{
            if(err) throw err;
            return res.json({ok: true});
        });
    });
});

app.use(routes);
app.listen(port);

console.log('app running on port '+port);