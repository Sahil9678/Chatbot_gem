import React from 'react'
import user from '../images/user.png';
import bot from '../images/bot.png';

export default function Responsechat(props) {

   console.log('Responsechat props -',props);

    return (
        <div className={`Response-Container ${props.role !== 'user' ? 'assitant-response': ''}`}>
            {props.role === 'user' ?
                <>
                    <img src={user} alt='user-icon' className='user-icon'/>
                    <p>{`${props.content}`}</p>
                </>
                :
                <>
                    <img src={bot} alt='bot-icon' className='bot-icon'/>
                    <p>{`${props.content}`}</p>
                </>
            }
        </div>
    )
}
