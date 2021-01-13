import React, { useState } from "react"

const Search = function (props) {

    const [searchStr, setsearchStr] = useState('')
    const [fieldName, setFieldName] = useState('Name')

    const handleInput = (e) => {
        setsearchStr(e.target.value)
    }

    const handleField = (e) => {
        setFieldName(e.target.value)
        search()
    }

    const search = () => {
        props.search(searchStr, fieldName)
    }

    return (
        <div className='searchDiv'>
            <input placeholder='Type...' onChange={handleInput}></input>
            <select value={fieldName} onChange={handleField}>
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
