import React, { useState } from "react"

const Search = function (props) {

    const [searchStr, setsearchStr] = useState('')
    const [field, setField] = useState('Name')

    const handleInput = (e) => {
        setsearchStr(e.target.value)
    }

    const handleField = (e) => {
        setField(e.target.value)
        search()
    }

    const search = () => {
        if(field == 'First Contact'){
            props.search(searchStr, 'firstContact')
        }else{
            props.search(searchStr, field)
        }
    }

    return (
        <div className='searchDiv'>
            <input placeholder='Type...' onChange={handleInput} value={searchStr}></input>
            <select value={field} onChange={handleField}>
                <option value="Name">Name</option>
                <option value="Surname">Surname</option>
                <option value="Country">Country</option>
                <option value="First Contact">First Contact</option>
                <option value="Email">Email</option>
                <option value="Sold">Sold</option>
                <option value="Owner">Owner</option>
            </select>
        </div>
    )
}

export default Search
