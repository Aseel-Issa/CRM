import React, { Component } from 'react'
import axios from 'axios'
import Badge from './Badge'

class Dashboard extends Component {

    constructor(){
        super()
        this.state={
            clientInMonth: undefined,
            emailsSent: undefined,
            outstandingClients: undefined,
            hottestCountry: undefined
        }
    }

    async componentDidMount(){
        const clientInMonth = await this.getClientInMonth()
        const emailsSent = await this.getEmailsSent()
        const outstandingClients = await this.getOutstandingClients()
        const hottestCountry = await this.getHottestCountry()
        this.setState({clientInMonth: clientInMonth,
            emailsSent: emailsSent,
            outstandingClients: outstandingClients,
            hottestCountry: hottestCountry
        })
    }

    async getClientInMonth(){
        let date = new Date()
        date = date.toString()
        let segments = date.split(' ')
        date = segments[1]
        const img = '/images/chart2.png'
        const results = await axios.get(`http://localhost:3001/clientInMonth`)
        return {title: results.data[0].count, img, sentence: `New ${date} Clients`}
    }

    async getEmailsSent(){
        const img = '/images/chart2.jpg'
        const results = await axios.get(`http://localhost:3001/emails`)
        return {title: results.data[0].count, img, sentence: `Emails Sent`}
    }

    async getOutstandingClients(){
        const img = '/images/chart3.png'
        const results = await axios.get(`http://localhost:3001/outstanding`)
        return {title: results.data[0].count, img, sentence: `Outstaning Clients`}
    }

    async getHottestCountry(){
        const img = '/images/chart4.png'
        const results = await axios.get(`http://localhost:3001/hottestCountry`)
        return {title: results.data[0].total, img, sentence: `Hottest Country`}
    }

    render(){
        let badges = []
        if(this.state.clientInMonth!=undefined){
            badges.push(<td><Badge key={'clientInMonth'} img={this.state.clientInMonth.img} title={this.state.clientInMonth.title} sentence={this.state.clientInMonth.sentence}></Badge></td>)
        }
        if(this.state.emailsSent!=undefined){
            badges.push(<td><Badge key={'emailsSent'} img={this.state.emailsSent.img} title={this.state.emailsSent.title} sentence={this.state.emailsSent.sentence}></Badge></td>)
        }
        if(this.state.outstandingClients!=undefined){
            badges.push(<td><Badge key={'outstandingClients'} img={this.state.outstandingClients.img} title={this.state.outstandingClients.title} sentence={this.state.outstandingClients.sentence}></Badge></td>)
        }
        if(this.state.hottestCountry!=undefined){
            badges.push(<td><Badge key={'hottestCountry'} img={this.state.hottestCountry.img} title={this.state.hottestCountry.title} sentence={this.state.hottestCountry.sentence}></Badge></td>)
        }
        return (
            <div className='badgesSection'>
                <table>
                    <tbody>
                        <tr>
                        {badges}
                        </tr>
                    </tbody>
                </table>
            </div>
        )
    }
}

export default Dashboard