

import React, { useState } from "react"
import axios from 'axios'

const Badge = function (props) {
    return(
        <table className='badge'>
            <tbody>
                <tr>
                    <td>
                    <img className='badgeImg' src={props.img}></img>
                    </td>
                    <td>
                    <p>{props.title}</p>
                    <p>{props.sentence}</p>
                    </td>
                    
                </tr>
            </tbody>
        </table>
    )
}

export default Badge