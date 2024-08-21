const express=require('express');
const router=express();

const Searchresults=require('../controllers/SearchClasses');
router.post('/SearchResults/:id',Searchresults);

module.exports=router;