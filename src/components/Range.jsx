import React, { useState } from "react"

const Range = (props) => {

   const [offset, setOffset] = useState(props.offset)

    const decreaseOffset = () => {
        if(offset != 0){
            // props.updateOffset(props.offset-20)
            setOffset(offset-20, props.updateOffset(offset-20))
        }
    }

    const incrementOffset = () => {
        // props.updateOffset(props.offset+20)
        setOffset(offset+20, props.updateOffset(offset+20))
    }

    return (
        <div className='range'>
            <button onClick={decreaseOffset}>{'<'}</button>
            <label>{offset}-{offset + 20}</label>
            <button onClick={incrementOffset}>{'>'}</button>
        </div>
    )
}

export default Range