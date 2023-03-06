import React from 'react'
import { useText } from '../contexts/TextContext';

export default function Header() {
    const text = useText();
    return (
        <>
            <div className="w-100 center header">

            </div>
            <div className='container' >
                <div className='header-title'>

                    <h1 className='p-3 rounded'>{text.header}</h1>
                </div>
            </div>
        </>
    )
}
