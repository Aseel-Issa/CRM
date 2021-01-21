import React, { useState } from "react"
import axios from 'axios'

const ClientSearch = function (props) {

    const [searchStr, setSearchStr] = useState('')

    const [clients, setClients] = useState([])

    const handleInput = async (e) => {
        setSearchStr(e.target.value)
        if(e.target.value == ''){
            setClients([])
            return
        }
        const results = await axios.get(`http://localhost:3001/client/${e.target.value}`)
        // console.log(results.data)
        setClients(results.data.map(element => {
            return <div key={element.id} onClick={() => chooseClient(element)}>{element.name}</div>
        }))
    }

    const chooseClient = (client) => {
        setClients([])
        setSearchStr(client.name)
        props.assignClient(client)
    }

    return (
        <div className='searchByName'>
            <label>Client:</label>
            <input placeholder='Client Name' value={searchStr} onChange={handleInput}></input>
            {clients}
        </div>)
}

export default ClientSearch