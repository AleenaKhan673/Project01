var express = require('express');
var router = express.Router();
let mongoose = require('mongoose');
// telling my router that I have this model
let IncidentReports = require('../model/IncidentReports.js');
const IncidentReports = require('../model/IncidentReports.js');
let IncidentReportsController = require('../controllers/IncidentReports.js')
/* Get route for the IncidentReports- Read Operation */
/*
GET,
Post,
Put --> Edit/Update
*/
/* Read Operation --> Get route for displaying the books list */
router.get('/',async(req,res,next)=>{
try{
    const IncidentList = await IncidentReports.find();
    res.render('IncidentReports/list',{
        title:'Incident Reports',
        IncidentList:IncidentList
    })}
    catch(err){
        console.error(err);
        res.render('IncidentReports/list',{
            error:'Error on the server'
        })
    }
    });
/* Create Operation --> Get route for displaying me the Add Page */
router.get('/add',async(req,res,next)=>{
    try{
        res.render('IncidentReports/add',{
            title: 'Ontario Tech Uni Incident Report'
        })
    }
    catch(err)
    {
        console.error(err);
        res.render('IncidentReports/list',{
            error:'Error on the server'
        })
    }
});
/* Create Operation --> Post route for processing the Add Page */
router.post('/add',async(req,res,next)=>{
    try{
        let newIncidentReport = new IncidentReports({
            "Name":req.body.Name,
            "Author":req.body.Author,
            "Published":req.body.Published,
            "Description":req.body.Description,
            "Price":req.body.Price
        });
        IncidentReports.create(newIncidentReport).then(()=>{
            res.redirect('/IncidentReports');
        })
    }
    catch(err)
    {
        console.error(err);
        res.render('IncidentReports/list',{
            error:'Error on the server'
        })
    }
});
/* Update Operation --> Get route for displaying me the Edit Page */
router.get('/edit/:id',async(req,res,next)=>{
    try{
        const id = req.params.id;
        const reportToEdit= await IncidentReports.findById(id);
        res.render('IncidentReports/edit',
            {
                title:'Edit Incident Report',
                IncidentReports: reportToEdit
            }
        )
    }
    catch(err)
    {
        console.error(err);
        next(err); // passing the error
    }
});
/* Update Operation --> Post route for processing the Edit Page */ 
router.post('/edit/:id',async(req,res,next)=>{
    try{
        let id=req.params.id;
        let updatedIncidentReports = IncidentReports({
            "_id":id,
            "Name":req.body.Name,
            "Author":req.body.Author,
            "Published":req.body.Published,
            "Description":req.body.Description,
            "Price":req.body.Price
        });
        IncidentReports.findByIdAndUpdate(id,updatedBook).then(()=>{
            res.redirect('/IncidentReports')
        })
    }
    catch(err){
        console.error(err);
        res.render('IncidentReports/list',{
            error:'Error on the server'
        })
    }
});
/* Delete Operation --> Get route to perform Delete Operation */
router.get('/delete/:id',async(req,res,next)=>{
    try{
        let id=req.params.id;
        IncidentReports.deleteOne({_id:id}).then(()=>{
            res.redirect('/IncidentReports')
        })
    }
    catch(error){
        console.error(err);
        res.render('IncidentReports/list',{
            error:'Error on the server'
        })
    }
});
module.exports = router;