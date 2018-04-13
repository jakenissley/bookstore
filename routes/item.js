var express = require('express');
var connection = require('../dbConnection');
var router = express.Router();

router.get('/all', function (req, res) {
    const query = "SELECT * FROM item";
    connection.query(query, function (err, rows, fields) {
        if (err) {
            //console.log(err);
            res.status(400).send("item/all error: error retrieving item table");
        } else {
            if (rows.length > 0) {
                let returnData = {};
                returnData['sEcho'] = 1;
                returnData['iTotalRecords'] = rows.length;
                returnData['iTotalDisplayRecords'] = rows.length;
                returnData['data'] = rows;
                res.send(JSON.stringify(returnData));
            } else {
                res.status(204).send("No Content.")
            }
        }
    });
});

// Inserts item into database
router.post('/', function (req, res) {
    var newItem = {
        Item_id: "default", //mysql handles what id to give item
        Name: req.body.name,
        Publisher: req.body.publisher,
        Type: req.body.type,
        Subject: req.body.subject,
        Description: req.body.description,
        Item_image: req.body.image,
        No_available: req.body.num_avail,
        Price: req.body.price,
    };
    
    if (newItem.Name == "" || newItem.Publisher == "" || newItem.Type == "" || newItem.Subject == "" || newItem.Description == ""
        || newItem.Item_image == "" || newItem.No_available == "" || newItem.Price == "") {
        res.status(406).send("Blank input.");
    }
    else {
        connection.query('INSERT INTO item SET ?', newItem, function (err, resp) {
            if (err) {
                console.log(err);
                res.status(400).send("Insertion error.");
            } else {
                res.send('Save succesfull');
            }
        });
        connection.query('SELECT Item_id FROM item WHERE Name = ?', newItem.Name, function (err, rows, fields) {
            if (err) {
                console.log(err);
            } else {
                id = rows[rows.length-1].Item_id + 1;
                var newAuthor = {
                    Author_name: req.body.author,
                    Item_id: id,
                    Author_id: "default"
                };
                var newDirector = {
                    Director_name: req.body.director,
                    Item_id: id,
                    Director_id: "default"
                };
                if(newAuthor.Author_name){
                    connection.query('INSERT INTO literature_author SET ?', newAuthor, function (err, resp) {
                        if (err) {
                            console.log(err);
                            res.status(400).send("Insertion error.");
                        } else {
                            
                        }
                    });
                }
                if(newDirector.Director_name){
                    connection.query('INSERT INTO media_director SET ?', newDirector, function (err, resp) {
                        if (err) {
                            console.log(err);
                            res.status(400).send("Insertion error.");
                        } else {
                            
                        }
                    });
                }
            }
        });
        
    }
});

router.put('/', function (req, res) {
    console.log('got here');
    res.send('complete');
});
module.exports = router;
