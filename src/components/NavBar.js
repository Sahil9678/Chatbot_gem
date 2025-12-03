import React, { useContext } from 'react'
import eblink from '../images/eblinkC.gif'
import ChatBot from '../images/ChatBot1.gif'

export default function NavBar() {

    return (
        <div>
            <div className='NavBar-container'>
                <div className='logo'>
                    <img src={eblink} alt='computerBlink' className='logo_img' />
                    <img src={ChatBot} alt='ChatBot' className='ChatBot_img' />
                </div>
            </div>
        </div>
    )
}
