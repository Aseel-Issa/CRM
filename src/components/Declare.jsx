import Loader from 'react-loader-spinner'
import React, { useState, useEffect } from "react"

const Declare = function (props) {
    const [loader, setLoader] = useState(null)

    const declare = async () => {
        setLoader(<Loader
            type="Oval"
            color="#00BFFF"
            height={20}
            width={20}
        />)
        await props.declare()
        setLoader(null)
    }

    return (<tr className='sendEmailSection'>
        <td><label>Declare Sale!</label></td>
        <td></td>
        <td><a id='declareBtn' onClick={declare}>Declare</a></td>
        <td>{loader}</td>
    </tr>)
}

export default Declare