

import React, { Component } from 'react';
import { observer, inject } from 'mobx-react'

class SearchBar extends Component {

    constructor(){
        super()
        this.state = {
            searchStr: '',
            field: 'Name'
        }

    }

    handleInput = (e) => {
        this.setState({searchStr: e.target.value}, this.search)
    }

    handleField = (e) => {
        this.setState({field: e.target.value}, this.search)
    }

    search = () => {
        if(this.state.field == 'First Contact'){
            this.props.clientsStore.search(this.state.searchStr, 'firstContact')
        }else{
            this.props.clientsStore.search(this.state.searchStr, this.state.field)
        }
        
    }

    render() {
        return (
            <div className='searchDiv'>
                <input placeholder='Type...' onChange={this.handleInput} value={this.state.searchStr}></input>
                <select value={this.state.fieldName} onChange={this.handleField}>
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
}
export default inject("clientsStore")(observer(SearchBar))