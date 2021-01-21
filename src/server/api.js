
const express = require('express')
const router = express.Router()
const DbManager = require('./DbManager')
const db = new DbManager()

router.get('/sanity', function (request, response) {
    console.log("Ok!")
    response.send('Ok!')
})

// /clients - a GET route that returns all of the clients from DB
router.get('/clients/:offset', async function (request, response) {
    const results = await db.getAllClients(request.params.offset)
    response.send(results)
})

// /employees - a GET route that returns all of the employees from DB
router.get('/employees', async function (request, response) {
    const results = await db.getAllEmployees()
    response.send(results)
})

// /client - a GET route that returns the client from DB based on its name
router.get('/client/:name', async function (request, response) {
    const results = await db.getClientsByName(request.params.name)
    response.send(results)
})
// /clientInMonth - a GET route that returns the number of clients in current month from DB
router.get('/clientInMonth', async function (request, response) {
    const results = await db.getNumberOfClientsContactedInCurrentMonth()
    response.send(results)
})

// /emails - a GET route that returns the number of all the sent emails
router.get('/emails', async function (request, response) {
    const results = await db.getNumberOfSentMails()
    response.send(results)
})

// /outstanding - a GET route that returns the number of all the outstanding customers
router.get('/outstanding', async function (request, response) {
    const results = await db.getNumberOfOutstandingClients()
    response.send(results)
})
// /hottestCountry - a GET route that returns the city with highest sales
router.get('/hottestCountry', async function (request, response) {
    const results = await db.getHottestCountry()
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