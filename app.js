const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const app = express()

// app.listen(3000, () => {
//     console.log("listening")
// })

app.use(cors())

app.use(express.json())

const unicornModel = require("./models/unicorns")

app.post('/search', async (req, res) => {
    if (req.body.type == 'nameSearch') {

        var selectionArgument = {}
        if (req.body.name) {
            selectionArgument =  {
                name: req.body.name
            }
        }
        var projectionArgument = {
        }
        if (req.body.projectionFilters.name == true && req.body.projectionFilters.weight == true) {
            projectionArgument = {"name": 1, "weight": 1, "_id": 0}
        } else if (req.body.projectionFilters.name == true && req.body.projectionFilters.weight == false) {
            projectionArgument = {"name": 1, "_id": 0}

        } else if (req.body.projectionFilters.name == false && req.body.projectionFilters.weight == true){
            projectionArgument = {"weight": 1, "_id": 0}
        }
        else {
            projectionArgument = {}
        }
        const result = await unicornModel.find(
            selectionArgument, projectionArgument
        )

        res.json(result)
    }
    else if (req.body.type == 'weightSearch'){
        var selectionArgument = {}
        if (req.body.weight_lower && req.body.weight_upper) {
            selectionArgument = {
                weight: {$gte: req.body.weight_lower},
                weight: {$lte: req.body.weight_upper}
            }
        }
        else if (!req.body.weight_lower) {
            selectionArgument = {
                weight: {$lte: req.body.weight_upper}
            }
        }
        else if (!req.body.weight_upper) {
            selectionArgument = {
                weight: {$lte: req.body.weight_upper}
            }
        }
        if (req.body.projectionFilters.name == true && req.body.projectionFilters.weight == true) {
            projectionArgument = {"name": 1, "weight": 1, "_id": 0}
        } else if (req.body.projectionFilters.name == true && req.body.projectionFilters.weight == false) {
            projectionArgument = {"name": 1, "_id": 0}

        } else if (req.body.projectionFilters.name == false && req.body.projectionFilters.weight == true){
            projectionArgument = {"weight": 1, "_id": 0}
        }
        else {
            projectionArgument = {}
        }
        const result = await unicornModel.find(
            selectionArgument, projectionArgument
        )

        res.json(result)
    }
    else if (req.body.type == 'foodSearch'){
        var selectionArgument = {}
        var loves_list = req.body.loves
        if (loves_list.length == 2) {
            selectionArgument =  {
                $and: [
                    {loves: req.body.loves[0]},
                    {loves: req.body.loves[1]}
                ]
            }
        }
        else if (loves_list.length == 1) {
            selectionArgument =  {
                loves: loves_list[0]
            }
        }
        var projectionArgument = {}
        if (req.body.projectionFilters.name == true && req.body.projectionFilters.weight == true) {
            projectionArgument = {"name": 1, "weight": 1, "_id": 0}
        } else if (req.body.projectionFilters.name == true && req.body.projectionFilters.weight == false) {
            projectionArgument = {"name": 1, "_id": 0}

        } else if (req.body.projectionFilters.name == false && req.body.projectionFilters.weight == true){
            projectionArgument = {"weight": 1, "_id": 0}
        }
        else {
            projectionArgument = {}
        }
        const result = await unicornModel.find(
            selectionArgument, projectionArgument
        )

        res.json(result)
    }
})

module.exports = app