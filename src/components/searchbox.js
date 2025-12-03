import React, { useContext } from 'react'
import { MyContext } from './App'

export default function Searchbox() {
    const { handlesearchedData } = useContext(MyContext)
    return (
        <div className='searchbox-container'>
            <div className='searchbox'>    
                <input 
                    id='searchbox-textarea' 
                    name='searchbox-input' 
                    className="searchbox-textarea" 
                    placeholder='How can I help you today?'
                    onKeyDown={(e) => e.key === 'Enter' ? (handlesearchedData(e.target.value), e.target.value = "") : null}
                />
            </div>
        </div>
    )
}
