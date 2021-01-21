
import React, { useState} from "react"
import Loader from 'react-loader-spinner'

const SendEmail = function (props) {

    const [emailType, setEmailType] = useState('Email Type')
    const [loader, setLoader] = useState(null)

    const sendEmail = async () => {
        setLoader(<Loader
            type="Oval"
            color="#00BFFF"
            height={20}
            width={20}
        />)
        await props.sendEmail(emailType)
        setLoader(null)
    }

    const handleSelection = (e) => {
        setEmailType(e.target.value)
    }

    return (<tr className='sendEmailSection'>
        <td><label>End Email:</label></td>
        <td><select value={emailType} onChange={handleSelection}>
            <option key='EmailType' value='Email Type'>Email Type</option>
            <option key='A' value='A'>A</option>
            <option key='B' value='B'>B</option>
            <option key='C' value='C'>C</option>
            <option key='D' value='D'>D</option>
        </select></td>
        <td><a id='sendEmailBtn' onClick={sendEmail}>Send</a></td>
        <td>{loader}</td>
    </tr>)
}

export default SendEmail