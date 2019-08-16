var express=require('express');
var app=express();
const testFolder = '.';
const fs = require('fs');
const busboy = require('connect-busboy');

app.use(busboy());

app.get('/',function(req,res)
{
	

	
res.sendfile('webcam.html');
});

app.get('/vid',function(req,res)
{
	
	res.sendfile("videos.html");
});

app.get('/files',function(req,res){
	var i = 0;
	fs.readdir(testFolder,(err,files) =>{
	
	files.forEach(file => {
	
		file.includes("webm") ? i++ : i; 
		});
		
		res.send(JSON.stringify({nb:i}));
});
});

app.post('/uploadVid', function(req, res) {
    var fstream;
		
    req.pipe(req.busboy);
	
    req.busboy.on('file', function (fieldname, file, filename) {
        
				
		console.log("Uploading: " + filename); 

		
        fstream = fs.createWriteStream('./'+filename);
        file.pipe(fstream);
        fstream.on('close', function () {
            res.redirect('back');
        });
    });
});


app.get('/test/:name',function(req,res){
	var name = "test" + req.params.name+".webm";
	res.sendfile(name);
});





var server=app.listen(3000,function() {})