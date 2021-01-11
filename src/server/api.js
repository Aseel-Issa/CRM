
const express = require('express')
const router = express.Router()
const DbManager = require('./DbManager')
const db = new DbManager()

router.get('/sanity', function (request, response) {
    console.log("Ok!")
    response.send('Ok!')
})

// /clients - a GET route that returns all of the clients from DB
router.get('/clients', async function (request, response) {
    const results = await db.getAllClients()
    response.send(results)
})

// /client - a POST route that saves a client into the DB
router.post('/client', async function (request, response) {
    const client = request.body
    const result = await db.saveClient(client)
    response.send(result)
})

// /client - a PUT route that updates a client based on its id
router.put('/client', async function (request, response) {
    const client = request.body
    const result = await db.updateClient(client)
    response.send(result)
})

module.exports = router;