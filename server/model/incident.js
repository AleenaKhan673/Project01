//const { Collection, default: mongoose } = require("mongoose");

const mongoose = require("mongoose");

let IncidentReportsModel = mongoose.Schema({
    DateofReport: String,
    FullName: String,
    Location: String,
    IncidentDescription: String,
    Witness: String
},
{
    collection:"IncidentReports"
});
module.exports =mongoose.model('incident', incidentModel);