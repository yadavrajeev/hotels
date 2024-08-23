const express = require('express');
const router  = express.Router();
const Person = require('./../models/Person');


// address to POST data  by client to server
router.post('/', async (req, res) => {
    try{ 
      const data = req.body;
      const newPerson = new Person(data);
      const response = await newPerson.save();
          res.status(200).json(response);
          console.log(" data saved");
    }
    catch{
            console.log('error in sending data');
            res.status(404);
    }
  });
  // address to GET data by client from server
  router.get('/', async (req, res) => {
   try{
      const data = await Person.find();
      res.status(201).json(data);
      console.log("data fetched");
  }
  catch{
  console.log(err);
  }
  });
// address to GET data by URLparameter(worktype)
  router.get('/:workType', async (req, res)=>{
    try{
      const workType = req.params.workType;
      if( workType == 'waiter' || workType == 'reception' || workType == 'chef' || workType == 'manager'){
        const response = await Person.find({work: workType});
        res.status(201).json(response);
        console.log('detail fetched by worktype');
      }else{
        res.status(401).json({error: 'invalid worktype'});
        console.log("invalid worktype enter");
      }
    }
    catch{
      console.log('not get detail by worktype');
    }
  })
  router.put('/:id', async (req, res)=>{
    try{
    //where to update  
    const personId = req.params.id; //extract id from urlparameter
    //what to update
    const updatedPersonData = req.body;

    const updatedPerson = await Person.findByIdAndUpdate(personId,updatedPersonData,{
      new : true,        //return updated value
      runValidators: true //run mongoose validation
    })
      if(!updatedPerson){
        return res.status(404).json({error: "person not found"});
      }
      console.log("data updated");
      res.status(200).json(updatedPerson);
    }
  catch(err){
    console.log(err);
    res.status(500).json({error:'internal server error'});
  }
  });
  router.delete('/:id',async (req,res)=>{
   try{ 
    
    const personId = req.params.id;
    const personDelete = await Person.findByIdAndDelete(personId);
    if(!personDelete){
      return res.status(404).json({error: "person not found"});
    }
    console.log("data Deleted");
    res.status(200).json({message: "data deleted successfully"});
  }
   catch{
    console.log(err);
    res.status(500).json({error:'internal server error'});
   }
  
  })

  module.exports = router;