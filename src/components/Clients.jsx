
import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import Client from './Client';
import Popup from './Popup';

class Clients extends Component {

    constructor() {
        super()
        this.state = {
            showPopup: false,
            clickedClient: {}
        }
    }

    showPopup = (client) => {
        this.setState({
            showPopup: true,
            clickedClient: client
        })
    }

    closePopup = () => {
        this.setState({
            showPopup: false,
            clickedClient: {}
        })
    }

    componentDidMount() {
        this.props.clientsStore.loadAllClients()
    }

    render() {
        const clients = this.props.clientsStore.clients.map(element => { return <Client client={element} key={element.id} showPopup={this.showPopup} /> })

        return (
            <div>
                <table className='clientsTable'>
                    <tbody>
                        <tr>
                            <th className='name'>Name</th>
                            <th className='surename'>Surename</th>
                            <th className='country'>Country</th>
                            <th className='firstContact'>First Contact</th>
                            <th className='email'>Email</th>
                            <th className='sold'>Sold</th>
                            <th className='owner'>Owner</th>
                        </tr>
                        {clients}
                    </tbody>
                </table>
                {this.state.showPopup ? <Popup client={this.state.clickedClient} closePopup={this.closePopup} /> : <div></div>}
            </div>)

    }

}

export default inject("clientsStore")(observer(Clients))