
import React, { useState, useEffect } from "react"
import axios from 'axios'
import Loader from 'react-loader-spinner'

const Transfer = function (props) {

    const [owners, setOwners] = useState([])
    const [employee, setEmployee] = useState('Owner')
    const [loader, setLoader] = useState(null)

    const getOwners = async () => {
        if(owners.length == 0){
            const results = await axios.get(`http://localhost:3001/employees`)
            setOwners(results.data.map(element => {
                return <option key={element.name} value={element.name}>{element.name}</option>
            }))
        }
    }
    useEffect(getOwners)

    const transferOwnership = async () => {
        setLoader(<Loader
            type="Oval"
            color="#00BFFF"
            height={20}
            width={20}
        />)
        await props.transferOwnership(employee)
        setLoader(null)
    }

    const handleSelection = (e) => {
        setEmployee(e.target.value)
    }

    return (<tr className='transferSection'>
        <td><label>Transfer Ownership To:</label></td>
        <td><select value={employee} onChange={handleSelection}>
            <option key='owner' value='Owner'>Owner</option>
            {owners}
        </select></td>
        <td><a id='transferBtn' onClick={transferOwnership}>Transfer</a></td>
        <td>{loader}</td>
    </tr>)
}

export default Transfer