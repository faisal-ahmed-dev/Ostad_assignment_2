const http = require('http');
const fs = require('fs');
const multer  = require('multer');
const express = require('express');
const app = express();
const path = require("path");


function getContentType(filePath) {
    const ext = filePath.split('.').pop().toLowerCase();
    if (ext === 'jpg' || ext === 'jpeg') {
        return 'image/jpeg';
    } else if (ext === 'png') {
        return 'image/png';
    } else if (ext === 'gif') {
        return 'image/gif';
    } else {
        return 'application/octet-stream'; // Default content type
    }
}



const server = http.createServer((req, res) => {
    const { url, method } = req;

    console.log(`Server listening on port 5500`);

    if (url === '/') {
        res.writeHead(200, {'Content-Type': 'text/plain'});
        res.write('This is Home Page');
        res.end();
    } else if (url === '/about') {
        res.writeHead(200, {'Content-Type': 'text/plain'});
        res.write('This is About Page');
        res.end();
    } else if (url === '/contact') {
        res.writeHead(200, {'Content-Type': 'text/plain'});
        res.write('This is Contact Page');
        res.end();
    } else if (url === '/file-write') {
        fs.writeFile('demo.txt', 'hello world', (err) => {
            if (err) {
                res.writeHead(500, {'Content-Type': 'text/plain'});
                res.write('Error writing to file');
                res.end();
            } else {
                res.writeHead(200, {'Content-Type': 'text/plain'});
                res.write('File demo.txt created and text "hello world" written.');
                res.end();
            }
        });
    } else if (url === '/upload' ) {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write('<form action="/upload_image" method="post" enctype="multipart/form-data">');
        res.write('<input type="file" name="image" />');
        res.write('<input type="submit" value="Upload" />');
        res.write('</form>');
        res.end();
    } else if (url === '/upload_image' && method === 'POST') {

        const storage=multer.diskStorage({
            destination:"uploads/" ,
            filename:function (req,file,cb){
                cb(null,file.originalname)
            }
        })
        const upload=multer({storage:storage})

         app.post('uploads/',upload.single('file'),(req,res)=>{
            res.end("upload succesfully");
         });
       
        
    }else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.write('Page not found');
        res.end();
    }

    
});

server.listen(5500);
