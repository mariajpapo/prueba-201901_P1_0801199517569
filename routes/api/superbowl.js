var uuidv4 = require('uuid/v4');
var app = require('express');
var router = app.Router();

var fileModel = require('./jsonmodel');
var data = null;

var superbowl = {
    '_id':'' ,
    'empresa': '' ,
    'url':' ',
    'nombre':'' ,
    'year':null,
    'rating':'', 
    'fechaing':null
}

router.get('/', function(req, res, next){
    if(!data){
        fileModel.read(function(err, filedata){
            if(err){
                console.log(err);
                data = [];
                return res.status(500).json({'error':'Error al Obtener Data'});
            }
            data = JSON.parse(filedata);
            return res.status(200).json(data);
        });
    }else{
        return res.status(200).json(data);
    }
});

router.post('/new', function(req, res, next){
    var _bowlData = Object.assign({}, superbowl, req.body); 
    var date = new Date();
    _bowlData._id = uuidv4();
    _bowlData.fechaing = date;
    if(!data){
        data = [];
    }
    data.push(_bowlData);
    fileModel.write(data, function(err){
        if(err){
            console.log(err);
            return res.status(500).json({'error': 'Error al Obtener Data'});
        }
        return res.status(200).json(_bowlData);
    });
});

module.exports = router;