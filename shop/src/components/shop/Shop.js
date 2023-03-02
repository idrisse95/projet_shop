import React, { useEffect, useState } from 'react'

import coca from "../img/coca.jpg"
import sprite from "../img/sprite.jpg"
import fanta from "../img/fanta.jpg"

export const Shop = (props) => {

    let [produit, setProduit] = useState([
        { id: 1, nom: "Coca", unité: 5, prix: 2, bg: "", button: "", img: coca },
        { id: 2, nom: "Fanta", unité: 2, prix: 2.5, bg: "", button: "", img: fanta },
        { id: 3, nom: "Sprite", unité: 3, prix: 1.5, bg: "", button: "", img: sprite }
    ])

    const [txt, setTxt] = useState('');
    const [filtrer, setFiltrer] = useState([]);


    useEffect(() => {
        const filtrer = produit.filter((produit) => produit.nom.toLowerCase().includes(txt.toLowerCase()));
        setFiltrer(filtrer);
    }, [txt, produit])


    const recherche = (e) => {
        setTxt(e.target.value)
    }

    return (
        <div>



            <div className='flex justify-center'>
                <div>
                    <div className='bg-orange-500 mt-16 p-2 rounded-t-xl'>
                        <div>
                            <label htmlFor="">filtrer: </label>
                            <input type="text" value={txt} onChange={recherche} />
                        </div>
                    </div>
                    <div className='flex gap-12 relative bg-orange-400/70 rounded-b-xl p-[50px]'>
                        <div className={`absolute w-full h-full bg-red-300 top-0 left-0 flex justify-center items-center ${props.hidd}`}>Pas d'argent</div>
                        {produit.map((produit) => (
                            <div key={produit.id} className='bg-white w-[300px] h-[400px] rounded-xl p-2'>
                                <div className={`${produit.bg} pl-3`} >
                                    <div><img className='w-full h-[250px]' src={produit.img} alt="" /></div>
                                    <div>{produit.nom}</div>
                                    <div>{produit.unité}</div>
                                    <div>{produit.prix}€</div>
                                    <div className='text-center'><button className={`${produit.button} bg-orange-500 p-3 text-white hover:bg-white hover:text-orange-500 border-2 border-orange-500 rounded-xl `} onClick={() => props.achat(produit)} >Ajoutez au panier</button></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

        </div>


    )
}
