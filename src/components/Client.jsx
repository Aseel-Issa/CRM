
import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'


class Client extends Component {

    render() {
        if (this.props.client.show) {
            return (
                <tr className='clientRow' data-id={this.props.client.id} onClick={() => this.props.showPopup(this.props.client)}>
                    <td className='name'>{this.props.client.name}</td>
                    <td className='surname'>{this.props.client.surname}</td>
                    <td className='country'>{this.props.client.country}</td>
                    <td className='firstContact'>{this.props.client.firstContact}</td>
                    <td className='email'>{this.props.client.email}</td>
                    <td className='sold'>{this.props.client.sold}</td>
                    <td className='owner'>{this.props.client.owner}</td>
                </tr>
            )
        }
        return null
    }

}

export default inject("clientsStore")(observer(Client))