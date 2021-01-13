import React, { Component } from 'react';
import { observer, inject } from 'mobx-react'

class Popup extends Component {

    constructor() {
        super()
        this.state = {
            name: '',
            surename: '',
            country: ''
        }
    }

    componentDidMount() {
        this.setState({
            name: this.props.client.name,
            surename: this.props.client.surename,
            country: this.props.client.country
        })
    }

    updateClient = async () => {
        await this.props.clientsStore.updateClient({
            id: this.props.client.id,
            name: this.state.name,
            surename: this.state.surename,
            country: this.state.country
        })
    }

    closePopup = () => {
        this.props.closePopup()
    }

    handleName = (e) => {
        this.setState({ name: e.target.value })
    }

    handleSurename = (e) => {
        this.setState({ surename: e.target.value })
    }

    handleCountry = (e) => {
        this.setState({ country: e.target.value })
    }

    render() {
        return (<div className='popup'>
            <div className='popup\_inner'>
                <button onClick={this.closePopup}>X</button>
                <div>
                    <label>Name</label>
                    <input id='name' onChange={this.handleName} value={this.state.name}></input>
                </div>
                <div>
                    <label>Surename</label>
                    <input id='surename' onChange={this.handleSurename} value={this.state.surename}></input>
                </div>
                <div>
                    <label>Country</label>
                    <input id='country' onChange={this.handleCountry} value={this.state.country}></input>
                </div>
                <button id='update' onClick={this.updateClient}>Update</button>
            </div>
        </div>)
    }
}

export default inject("clientsStore")(observer(Popup))