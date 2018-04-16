var express = require('express');
var connection = require('../dbConnection');
var router = express.Router();

router.get('/all', function (req, res) {
    const query = "(SELECT i.*, a.Author_name AS Author_name, s.Subject_name AS Subject_name FROM item i INNER JOIN subject s ON i.Subject = s.Subject_id INNER JOIN literature_author a ON i.Item_id = a.Item_id WHERE i.Type = 'Book' OR i.Type = 'Periodical') UNION (SELECT i.*, d.Director_name AS Director_name, s.Subject_name AS Subject_name FROM item i INNER JOIN subject s ON i.Subject = s.Subject_id INNER JOIN media_director d ON i.Item_id = d.Item_id WHERE i.Type = 'Movie')";
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

//inserts the Author/Director
router.post('/addauthor', function (req, res){
    var newItem = {
        Name: req.body.name,
        Author_name: req.body.author,
        Director_name: req.body.director
    }
    connection.query('SELECT Item_id FROM item WHERE Name = ?', newItem.Name, function (err, rows, fields) {
        if (err) {
            console.log(err);
        } else {
            id = rows[rows.length-1].Item_id;
            var newAuthor = {
                Author_id: "default",
                Author_name: newItem.Author_name,
                Item_id: id
            };
            var newDirector = {
                Director_id: "default",
                Director_name: newItem.Director_name,
                Item_id: id
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
});

// Inserts item into database
router.post('/additem', function (req, res) {
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
    }
});

// returns list of Publishers
router.get('/getPublishers', function (req, res){
    const query = "SELECT publisher.Name FROM publisher";
    connection.query(query, function (err, rows, fields) {
        if (err) {
            res.status(400).send("item/getPublisher error: error retrieving publishers");
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

// returns list of Subjects
router.get('/getSubjects', function (req, res){
    const query = "SELECT * FROM subject";
    connection.query(query, function (err, rows, fields) {
        if (err) {
            res.status(400).send("item/getSubject error: error retrieving publishers");
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


// returns list of item types
router.get('/getItemTypes', function (req, res){
    const query = "SELECT item.Type FROM item";
    connection.query(query, function (err, rows, fields) {
        if (err) {
            res.status(400).send("item_routes/getItemTypes error: error retrieving item types");
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

router.put('/', function (req, res) {
    console.log('got here');
    res.send('complete');
});
module.exports = router;
