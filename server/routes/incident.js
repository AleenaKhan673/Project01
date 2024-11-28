var express = require('express');
var router = express.Router();
let mongoose = require('mongoose');
// telling my router that I have this model
let IncidentReports = require('../model/IncidentReports.js');
let IncidentReportsController = require('../controllers/IncidentReports.js')
function requireAuth(req,res,next)

 {if(!req.isAuthenticated())
    {
        return res.redirect('/login')
    }
    next();
}

/* Get route for the IncidentReports- Read Operation */
/*
GET,
Post,
Put --> Edit/Update
*/
/* Read Operation --> Get route for displaying the books list */
router.get('/',async(req,res,next)=>{
try{
    const IncidentReportsList = await IncidentReports.find();
    res.render('IncidentReports/list',{
        title:'Incident Reports',
        displayName:req.user ? req.user.displayName:'',
        IncidentReportsList:IncidentReportsList
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
            title: 'Ontario Tech Uni Incident Report',
            displayName:req.user ? req.user.displayName:'',
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
            "DateofReport":req.body.DateofReport,
            "FullName":req.body.FullName,
            "Location":req.body.Location,
            "IncidentDescription":req.body.IncidentDescription,
            "Witness":req.body.Witness
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
                displayName:req.user ? req.user.displayName:'',
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
            "DateofReport":req.body.DateofReport,
            "FullName":req.body.FullName,
            "Location":req.body.Location,
            "IncidentDescription":req.body.IncidentDescription,
            "Witness":req.body.Witness
        });
        IncidentReports.findByIdAndUpdate(id,updatedBook).then(()=>{
            res.redirect('/IncidentReports/edit')
        })
    }
    catch(err){
        console.error(err);
        res.render('IncidentReports/edit',{
            error:'Error on the server'
        })
    }
});
/* Delete Operation --> Get route to perform Delete Operation */
router.get('/delete/:id',async(req,res,next)=>{
    try{
        let id=req.params.id;
        IncidentReports.deleteOne({_id:id}).then(()=>{
            res.redirect('/IncidentReportsList')
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
