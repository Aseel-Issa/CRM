import ClientSearch from './ClientSearch'
import React, { Component } from 'react'
import Transfer from './Transfer';
import SendEmail from './SendEmail'
import axios from 'axios'
import SnackBar from 'my-react-snackbar';
import Declare from './Declare';
import AddClient from './AddClient'


class Actions extends Component {
    constructor() {
        super()
        this.state = {
            client: {
                id: '',
                name: '',
                owner: ''
            },
            clientSelected: false,
            ownerSelected: false,
            emailTypeSelected: false,
            open: false
        }
    }

    assignClient = (client) => {
        this.setState({
            client: client,
            clientSelected: true
        })
    }

    transferOwnership = async (employee) => {
        employee == 'Owner' ? await this.setState({
            ownerSelected: false
        }) : await this.setState({
            ownerSelected: true
        })

        if (!this.state.clientSelected || !this.state.ownerSelected) {
            this.setState({ open: true })

        } else {
            const client = {
                id: this.state.client.id,
                owner: employee
            }
            const results = await axios.put(`http://localhost:3001/client`, client)
        }

    }
    sendEmail = async (emailType) => {
        emailType == 'Email Type' ? await this.setState({
            emailTypeSelected: false
        }) : await this.setState({
            emailTypeSelected: true
        })

        if (!this.state.clientSelected || !this.state.emailTypeSelected) {
            this.setState({ open: true })

        } else {
            const client = {
                id: this.state.client.id,
                emailType: emailType
            }
            const results = await axios.put(`http://localhost:3001/client`, client)
        }

    }
    declare = async () => {
        if (!this.state.clientSelected) {
            this.setState({ open: true })

        } else {
            const client = {
                id: this.state.client.id,
                sold: 1
            }
            const results = await axios.put(`http://localhost:3001/client`, client)
        }
    }

    render() {
        return (<div>
            <label className='Title'>Update</label>
            <ClientSearch assignClient={this.assignClient} />
            <table>
                <tbody>
                    <Transfer transferOwnership={this.transferOwnership} />
                    <SendEmail sendEmail={this.sendEmail}/>
                    <Declare declare={this.declare}/>
                </tbody>
            </table>
            <hr></hr>
            <label className='Title'>Add Client</label>
            <AddClient />
            <SnackBar
                open={this.state.open}
                message={'Error: Please fill in all the required data!!'}
                position='top-center'
                type='error'
                action={
                    <React.Fragment>
                        <button onClick={() => { this.setState({ open: false }) }}>X</button>
                    </React.Fragment>
                }
            />
        </div>)
    }
}

export default Actions