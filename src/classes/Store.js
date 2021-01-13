import {observable, makeObservable, action} from 'mobx'
import axios from 'axios'
import Client from './Client'

class Store{
    constructor(){
        this.clients = []

        makeObservable(this, {
            clients: observable,
            loadAllClients: action,
            search: action,
            updateClient: action
        })
    }

    loadAllClients = async (client) => {
        const results = await axios.get(`http://localhost:3001/clients`)
        // console.log(results)
        this.clients = results.data.map(element => {
            const name = element.name.split(' ')
            return new Client(element.id, name[0], name[1], element.country, element.firstContact, element.email, element.sold, element.owner, true)
        })
    }

    search = (searchStr, field) => {
        this.clients = this.clients.map(element => {
            if(!element[field].includes(searchStr)){
                element.show = false
            }
            return element
        })
    }

    // updates the name, surename, and country of the client
    updateClient = async (client) => {
        try{
            console.log(JSON.stringify(client))
            const results = await axios.put(`http://localhost:3001/client`, client)
            if(results){
                // console.log('client: '+JSON.stringify(client))
                const index = this.clients.findIndex(element => element.id == client.id)
                console.log('Index: '+index)
                this.clients[index].name = client.name
                this.clients[index].surename = client.surename
                this.clients[index].country = client.country
                console.log(JSON.stringify(this.clients[index]))
            }else{
                console.log('error: client was not updated!')
            }
        }catch(e){
            console.log(e)
        }
    }


}

export default Store
