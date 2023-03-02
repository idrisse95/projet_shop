import React from 'react'
import { Link } from 'react-router-dom'

export const Nav = (props) => {
    




    return (

        <div className='bg-white flex justify-between items-center py-3 px-5'>
        <div className='text-xl uppercase font-semibold'>Shopping</div>
        <div>
            <ul className='flex gap-10 uppercase'>
                <Link to="/" >Acceuil</Link>
                <Link to="/shop">Produit</Link>
                <Link to="/panier">Panier</Link>
               
            </ul>
        </div>
        <div>
            <div>Portfeuille <i className="fa-solid fa-wallet"></i>: {props.argent}€</div>
            <div className='relative mt-2 w-[50px]'><i className="fa-solid fa-cart-shopping"></i>
                <div className='absolute -top-2 right-2 bg-orange-600  text-white font-bold rounded-full px-2'>{props.quantity}</div> </div>
        </div>
    </div>
    )
}
