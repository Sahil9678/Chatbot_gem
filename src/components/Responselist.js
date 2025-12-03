import React from 'react'
import Responsechat from './Responsechat'

export default function Responselist({Response}) {
    const ResponseElements = Response.map((chat,id) => {
        return <Responsechat key={id} {...chat}/>
    })
    console.log('Response1 -',Response);
    return (
        <div className='Response-grid '>
            {ResponseElements}
            
        </div>
    )
}
