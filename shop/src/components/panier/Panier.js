import React from 'react'

export const Panier = (props) => {
    return (
        <div  className='flex justify-center mt-[150px]'>
            <div className='bg-white w-[500px] p-4'>{props.panier}</div>
        </div>
    )
}
