
import React, { useState } from "react"
import axios from 'axios'
import Loader from 'react-loader-spinner'

const AddClient = function (props) {

    const [firstName, setFirstName] = useState('')
    const [surName, setSurName] = useState('')
    const [country, setCountry] = useState('')
    const [owner, setOwner] = useState('')
    const [loader, setLoader] = useState(null)

    const addClient = async () => {
        setLoader(<Loader
            type="Oval"
            color="#00BFFF"
            height={20}
            width={20}
        />)
        let date = new Date()
        date = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDay()}`
        const client = {
            name: `${firstName} ${surName}`,
            country: country,
            owner: owner,
            firstContact: date
        }
        const results = await axios.post(`http://localhost:3001/client`, client)
        setLoader(null)
    }

    const handleFirstName = (e) => {
        setFirstName(e.target.value)
    }

    const handleSurName = (e) => {
        setSurName(e.target.value)
    }

    const handleCountry = (e) => {
        setCountry(e.target.value)
    }

    const handleOwner = (e) => {
        setOwner(e.target.value)
    }

    return (
        <div>
            <table id='addClient'>
                <tbody>
                    <tr>
                        <td><label>First Name:</label></td>
                        <td><input value={firstName} onChange={handleFirstName} /></td>
                    </tr>
                    <tr><td><label>Surame:</label></td>
                        <td><input value={surName} onChange={handleSurName} /></td>
                    </tr>
                    <tr><td><label>Country:</label></td>
                        <td><input value={country} onChange={handleCountry} /></td>
                    </tr>
                    <tr><td><label>Owner:</label></td>
                        <td><input value={owner} onChange={handleOwner} /></td>
                    </tr>
                    <tr><td><button onClick={addClient}>Add New Client</button></td>
                        <td>
                            {loader}
                        </td>
                    </tr>
                </tbody>
            </table>

        </div>
    )
}

export default AddClient