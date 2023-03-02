import { Route, Routes } from 'react-router-dom';
import './App.css';
import { Home } from './components/home/Home';
import { Nav } from './components/nav/Nav';
import { Panier } from './components/panier/Panier';
import { Shop } from './components/shop/Shop';
import coca from "./components/img/coca.jpg"
import sprite from "./components/img/sprite.jpg"
import fanta from "./components/img/fanta.jpg"
import { useEffect, useState } from 'react';


function App() {



  let [sp, setSp] = useState('block')
  let [produit, setProduit] = useState([
    { id: 1, nom: "Coca", unité: 5, prix: 2, bg: "", button: "", img: coca },
    { id: 2, nom: "Fanta", unité: 2, prix: 2.5, bg: "", button: "", img: fanta },
    { id: 3, nom: "Sprite", unité: 3, prix: 1.5, bg: "", button: "", img: sprite }
  ])

  let [argent, setArgent] = useState(15)
  let [hidd, setHidd] = useState('hidden')
  let [panier, setPanier] = useState([])

  const fini = () => {

    if (argent <= 0) {
      setHidd('block')
      setArgent(0)
    }


  }


  const achat = (produit) => {
    setQuantity(quantity => quantity + 1)
    setArgent(argent => argent - produit.prix)
    produit.unité = produit.unité - 1
    fini()
    if (argent < produit.prix) {
      produit.bg = 'bg-yellow-500'
      produit.button = "hidden"
    }

    if (produit.unité === 0) {
      console.log('fini');
      produit.bg = "bg-red-500"
      produit.button = "hidden"

    }

    const supp = (e,onDelete) => {
      // e.target.parentNode.parentNode.style.display='none'
      const nomProduit = e.target;
      const nouveauPanier = panier.filter((produit) => produit.key !== nomProduit);
      console.log(nouveauPanier);
      onDelete();
      setPanier(nouveauPanier);

      console.log(panier.length);
      setArgent(argent => argent + produit.prix)
      setQuantity(quantity => quantity - 1)
      produit.unité = produit.unité + 1
      if (argent > produit.prix) {
        produit.button = 'block'
        produit.bg = 'bg-transparent'
      }
      if (argent > 0) {
        setHidd('hidden')
      }



    }
    setPanier([...panier,
    <div className={`pr-10 border-2 border-orange-400 pl-2 ${sp}`}>
      <div className='flex items-center justify-between ' key={produit.id}  ><div>Produit: {produit.nom}, {produit.unité}</div><div><img src={produit.img} className="w-[50px] h-[50px]" alt="" /></div></div>
      <div><button onClick={supp} className='text-red-500' >Delete</button></div>
    </div>])



  }
  const [quantity, setQuantity] = useState(panier.length)


  return (
    <div className="App bg-[url('./components/img/bg.jpeg')] h-screen">

      <Nav argent={argent} quantity={quantity} />

      <Routes>
        <Route path='/' element={<Home />} />

        <Route path='/shop' element={<Shop hidd={hidd} produit={produit} panier={panier} achat={achat} />} />

        <Route path='/panier' element={<Panier panier={panier} />} />


      </Routes>

    </div>
  );
}

export default App;
