var express = require('express');
var router = express.Router();


/* GET home page. */
router.get('/', function(req, res, next) {

  // Find our flamingo document

  console.log('get flamingo');

  req.models.Bird.find( {name : 'Flamingo'})
  //By default, a query to find a Bird will include only the _id of the nest_data.
  //If you would like the actual Nest data, need to call the populate method
  //with the name of the attribute to populate.
  .populate('nest_data')
  .exec(function(err, docs) {
    if (err) {
      return next(err);
    }
    console.log(docs[0])
    return res.render('index', { bird : docs[0] } );
  } )

});


module.exports = router;
