var express = require('express');
var connection = require('../dbConnection');
var router = express.Router();

/* Begin Update Item Transaction Code */
// updates price of all items of this type
router.post('/updateItemPrice', function (req, res) {
    let item_type = req.body.item_type;
    let increase = req.body.increase;
    
    if (item_type == "" || increase == "") {
        res.status(406).send("Blank/Invalid input.");
    }
    else {
        connection.query('UPDATE item SET price = price * ? WHERE item.Type = ?', [increase, item_type], function (err, resp) {
            if (err) {
                console.log(err);
                res.status(400).send("Update error.");
            } else {
                res.send('Update succesfull');
            }
        });  
    }
});
/* End Update Item Transaction Code */

module.exports = router;