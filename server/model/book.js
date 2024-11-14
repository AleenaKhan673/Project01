//const { Collection, default: mongoose } = require("mongoose");

const mongoose = require("mongoose");

let bookModel = mongoose.Schema({
    DateofRepor: String,
    FullName: String,
    Location: String,
    IncidentDescription: String,
    Withness: String
},
{
    collection:"IncidentReports"
});
module.exports =mongoose.model('IncidentReports', IncidentReportsModel);
