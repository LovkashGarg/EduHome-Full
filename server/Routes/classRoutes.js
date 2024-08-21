const express=require('express')
const router=express.Router();

const classCreation=require('../controllers/ClassCreation');
const LiveclassDisplay=require('../controllers/ClassDisplay');
const MyclassDisplay=require('../controllers/MyclassDisplay');
router.post('/createliveclasses',classCreation);
router.get('/allliveclasses',LiveclassDisplay);
router.get('/MyclassDisplay',MyclassDisplay);

module.exports=router;