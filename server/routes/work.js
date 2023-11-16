let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

// Connect with work model

let Work = require('../models/work');

/* CRUD operation */

/* READ operation */
/* Get route for the workout tracker */

router.get('/', async (req, res, next) => {
    try {
      const Workoutlist = await Work.find(); 
      res.render('workout/list', {
        title: 'Workouts', 
        Workoutlist: Workoutlist
      });
    } catch (err) {
      console.error(err);
      // Handle error
      res.render('work', {
        error: 'Error on server'
      });
    }
  });
  
/* ADD operation */
/* Get route for displaying the Add-Page -- Create Operation */
router.get('/add', async (req, res, next) => {
  res.render('workout/add', {title: 'Add Excercise'})

});
/* Post route for processing the Add-Page -- Create Operation */
router.get('/add', async (req, res, next) => {
  let newWorkout = Work ({
    "name":req.body.name,
    "sets":req.body.sets,
    "reps":req.body.reps,
    "description":req.body.description,
    "targetMuscle":req.body.targetMuscle
  });
  Work.create(newWorkout,(err,Work) => {
    if(err)
    {
      console.log(err);
      res.end(err);
    }
    else
    {
      res.redirect('workout/add');
    }
  })

});
/* EDIT operation */
/* Get route for displaying the Edit Operation -- Update Operation */
router.get('/edit/:id', async (req, res, next) => {
  let id = req.params.id;
  Work.findbyId(id,(err,workToEdit) =>{
    if(err)
    {
      console.log(err);
      res.end(err);
    }
    else
    {
      res.render('workout/edit',{title:'Edit Excercise', work:workToEdit});
    }
  });
});
/* Post route for displaying the Edit Operation -- Update Operation */
router.get('/edit/:id', async (req, res, next) => {
  let id = req.params.id;
  let updateWork = Work({
      "_id":id,
      "name":req.body.name,
      "sets":req.body.sets,
      "reps":req.body.reps,
      "description":req.body.description,
      "targetMuscle":req.body.targetMuscle
  });
  Work.updateOne({_id:id}, updateWork,(err) => {
    if(err)
    {
      console.log(err);
      res.end(err);
    }
    else
    {
      res.redirect('workout/list');
    }
  });
});
/* DELETE operation */
/* Get to perform Delete operation -- Remove Operation */
router.get('/delete/:id', async (req, res, next) => {
    let id =req.params.id;
    Work.remove({_id:id},(err) => {
      if(err)
    {
      console.log(err);
      res.end(err);
    }
    else
    {
      res.redirect('workout/list');
    }
  });
});


module.exports = router;