const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const app = express()

app.listen(3000, () => {
    console.log("listening")
})

app.use(cors())

app.use(express.json())

const unicornModel = require("./models/unicorns")

app.post('/search', async (req, res) => {
    console.log(req.body)
    if (req.body.type == 'nameSearch') {

        var selectionArgument = {}
        if (req.body.name) {
            selectionArgument =  {
                name: req.body.name
            }
        }
        console.log(selectionArgument)
        var projectionArgument = {
        }
        if (req.body.projectionFilters.name == true && req.body.projectionFilters.weight == false) {
            projectionArgument = {"name": 1, "_id": 0}
        } else {

        }
        const result = await unicornModel.find(
            selectionArgument, projectionArgument
            // , projectionArgument
            // name: req.body.name
        )

        res.json(result)
    }
    else if (req.body.type == 'weightSearch'){

    }
    else if (req.body.type == 'foodSearch'){

    }
})

module.exports = app