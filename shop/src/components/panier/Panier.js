import React from 'react'

export const Panier = (props) => {
    
    
    return (
        <div className='flex justify-center mt-[150px]'>
            <div className='bg-white w-[500px] p-4'>
                {/* {props.panier} */}

                {props.panier.map((produit) => (
          <div
            className={`flex items-center justify-between pr-10 border-2 border-orange-400 pl-2 `}
            key={produit.id}
          >
            <div>
              Produit: {produit.nom},{props.unitéd}
            </div>
            <div>
              <img src={produit.img} className="w-[50px] h-[50px]" alt="" />
            </div>
            <button onClick={() => props.supp(produit)}>Supprimer</button>
          </div>))}
            </div>
        </div>
    )
}
