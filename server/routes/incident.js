var express = require('express');
var router = express.Router();
let mongoose = require('mongoose');
// telling my router that I have this model
let Incident = require('../model/incident.js');
const incident= require('../model/incident.js');
let incidentController = require('../controllers/incident.js')
function requireAuth(req,res,next)

 {if(!req.isAuthenticated())
    {
        return res.redirect('/login');
    }
    next();
}

/* Get route for the incident- Read Operation */
/*
GET,
Post,
Put --> Edit/Update
*/
/* Read Operation --> Get route for displaying the books list */
router.get('/', async(req,res,next)=>{
try{
    const incidentlist = await incident.find();
    res.render('incident/list',{
        title:'Incident Reports',
        displayName:req.user ? req.user.displayName:'',
        incidentlist:incidentlist
    })}
    catch(err){
        console.error(err);
        res.render('incident/list',{
            error:'Error on the server'
        })
    }
    });
/* Create Operation --> Get route for displaying me the Add Page */
router.get('/add', async(req,res,next)=>{
    try{
        res.render('incident/add',{
            title: 'Add Incident',
            displayName:req.user ? req.user.displayName:'',
        })
    }
    catch(err)
    {
        console.error(err);
        res.render('incident/list',{
            error:'Error on the server'
        })
    }
});
/* Create Operation --> Post route for processing the Add Page */
router.post('/add', async(req,res,next)=>{
    try{
        let newincident = new incident({
            "DateofReport":req.body.DateofReport,
            "FullName":req.body.FullName,
            "Location":req.body.Location,
            "IncidentDescription":req.body.IncidentDescription,
            "Witness":req.body.Witness
        });
        incident.create(newincident).then(()=>{
            res.redirect('/incident');
        })
    }
    catch(err)
    {
        console.error(err);
        res.render('incident/list',{
            error:'Error on the server'
        })
    }
});
/* Update Operation --> Get route for displaying me the Edit Page */
router.get('/edit/:id', async(req,res,next)=>{
    try{
        const id = req.params.id;
        const reportToEdit= await incident.findById(id);
        res.render('incident/edit',
            {
                title:'Edit',
                displayName:req.user ? req.user.displayName:'',
                incident: reportToEdit
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
router.post('/edit/:id', async(req,res,next)=>{
    try{
        let id=req.params.id;
        let updatedincident = ({
            "_id":id,
            "DateofReport":req.body.DateofReport,
            "FullName":req.body.FullName,
            "Location":req.body.Location,
            "IncidentDescription":req.body.IncidentDescription,
            "Witness":req.body.Witness
        });
        incident.findByIdAndUpdate(id,updatedincident).then(()=>{
            res.redirect('/incident')
        })
    }
    catch(err){
        console.error(err);
        res.render('incident/list',{
            error:'Error on the server'
        })
    }
});
/* Delete Operation --> Get route to perform Delete Operation */
router.get('/delete/:id', async(req,res,next)=>{
    try{
        let id=req.params.id;
        incident.deleteOne({_id:id}).then(()=>{
            res.redirect('/incident')
        })
    }
    catch(error){
        console.error(err);
        res.render('incident/list',{
            error:'Error on the server'
        })
    }
});
module.exports = router;
