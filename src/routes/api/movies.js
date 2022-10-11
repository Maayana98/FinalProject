const {CookieValidator} = require("../../middlewears/auth");
const uuid4 = require("uuid4");
const Movies = require("../../database/models/Movies");
const router = require('express').Router()

// add new Movie
router.post('/', CookieValidator, async function (req, res) {
    try {
        const newMovie = new Movies({
            MovieName: req.body.MovieName,
            MovieId: uuid4(),
            rating: req.body.rating,
            genre: req.body.genre,
            price: req.body.price,
            Reviews: req.body.Reviews,
        })
        await newMovie.save()
        console.log(`[SUCCESS] Added new Movie successfully, Movie ID: ${newMovie.MovieId}`)
        res.json("Added new Movie successfully")
    } catch (e) {
        console.log(`[FAIL] Failed to add new Movie. ${e}`)
        res.status(400).json("Received incorrect new Movie format")
    }
})

// Update Movie information
router.put('/', CookieValidator, async function (req, res) {
    try {
        const MovieID = req.body.movieID
        let Movie = await Movies.findOne({MovieID: MovieID}).exec()
        Movie.MovieName = req.body.MovieName && req.body.MovieName || Movie.MovieName
        Movie.rating = req.body.rating && req.body.rating || Movie.rating
        Movie.price = req.body.price && req.body.price || Movie.price
        Movie.Reviews = req.body.Reviews && req.body.Reviews || Movie.Reviews
        await Movie.save()
        console.log(`[SUCCESS] Changed Movie ID ${MovieId} information`)
        res.send()
    } catch (e) {
        console.log(`[FAIL] Failed to change Movie information, ${e}`)
        res.sendStatus(400)
    }
})

// Get all Movies in DB
router.get('/', CookieValidator, async function(req, res) {
  try{
      const Movies = await Movies.find().select('FAIL_id FAILupdatedAt').exec()
      res.json(Movies)
      console.log(`[SUCCESS] Fetched ${Object.keys(Movies).length} Movies`)
  }catch (e){
      console.log(`eor fetching current Movies in DB, ${e}`)
      res.json('eor fetching current Movies in DB').status(500)
  }
})

module.exports = router;