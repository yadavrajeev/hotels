const express = require('express');
const router  = express.Router();
const MenuItem = require('./../models/MenuItem');

// address to POST menudata  by client to server
router.post('/', async (req, res) => {
    try{ 
      const data = req.body;
      const newMenuItem = new MenuItem(data);
      const response = await newMenuItem.save();
          res.status(200).json(response);
          console.log("menu data sent");
    }
    catch{
            console.log('error in sending data');
            res.status(404);
    }
  });
  // address to GET menudata by client from server
  router.get('/', async (req, res) => {
   try{
      const data = await MenuItem.find();
      res.status(201).json(data);
      console.log("menu data fetched");
  }
  catch{
  console.log(err);
  }
  });
// address to GET menudata by URLparameter client from server
  router.get('/:taste', async (req, res)=>{
    try{
      const taste = req.params.taste;
      if( taste == 'sweet' || taste == 'sour' || taste == 'spicy'){
        const response = await MenuItem.find({taste: taste});
        res.status(201).json(response);
        console.log('detail fetched by taste');
      }else{
        res.status(401).json({error: 'invalid taste'});
        console.log("invalid taste enter");
      }
    }
    catch{
      console.log('not get detail by taste');
    }
  });
  router.put('/:id', async (req, res)=>{
    try{
    //where to update  
    const menuId = req.params.id; //extract id from urlparameter
    //what to update
    const updatedMenuData = req.body;

    const updatedMenu = await MenuItem.findByIdAndUpdate(menuId,updatedMenuData,{
      new : true,        //return updated value
      runValidators: true //run mongoose validation
    })
      if(!updatedMenu){
        return res.status(404).json({error: "menu not found"});
      }
      console.log("data updated");
      res.status(200).json(updatedMenu);
    }
  catch(err){
    console.log(err);
    res.status(500).json({error:'internal server error'});
  }
  });
  router.delete('/:id',async (req,res)=>{
   try{ 
    
    const menuId = req.params.id;
    const menuDelete = await MenuItem.findByIdAndDelete(menuId);
    if(!menuDelete){
      return res.status(404).json({error: "menu not found"});
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