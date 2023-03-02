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

  let [unitéd, setUnitéd] = useState(0)

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

  useEffect(() => {
    fini()
  }, [argent])

  const supp = (produit) => {
    // e.target.parentNode.parentNode.style.display='none'
    const nouveauPanier = panier.filter((item) => item.id !== produit.id);
    console.log(panier.filter((item) => item.key !== produit.key));
    setQuantity(nouveauPanier.length + 1)
    console.log(panier.length);
    produit.unité = produit.unité - 1
    setArgent(argent => argent + produit.prix)
    setQuantity(quantity => quantity - 1)
    setUnitéd(unitéd => unitéd - 1)
    setProduit(produit => produit.unité + 1)

    const nouveauProduits = produit.filter((p) => {
      if ( unitéd <= 0) {
        return false; // ne pas inclure ce produit dans le nouveau tableau
      }
      return true; // inclure tous les autres produits dans le nouveau tableau
    });
    setProduit(nouveauProduits);
    if (produit.unité < 0) {
      console.log(produit, 2);
    }
    setPanier(nouveauPanier);
    if (argent > produit.prix) {
      produit.button = 'block'
      produit.bg = 'bg-transparent'
    }
    if (argent > 0) {
      setHidd('hidden')
    }



  }
  const achat = (produit) => {
    setQuantity(quantity => quantity + 1)
    setArgent(argent => argent - produit.prix)

    produit.unité = produit.unité - 1
    setUnitéd(unitéd => unitéd + 1)
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

    const index = panier.findIndex((p) => p.id === produit.id);
    if (index !== -1) {
      // Le produit existe déjà, on met à jour l'unité
      const nouveauProduit = panier.map((p) =>
        p.id === panier.id ? { ...p, unite: p.unite + 1 } : p
      );
      setProduit(nouveauProduit);
    } else {
      // Le produit n'existe pas encore, on l'ajoute au tableau
      setPanier([...panier, produit]);
    }


    // setPanier([...panier, produit
    // // <div>
    // //   <div className={`flex items-center justify-between pr-10 border-2 border-orange-400 pl-2 ${sp} `} key={produit.id}  >
    // //     <div>Produit: {produit.nom}, {produit.unité}</div><div><img src={produit.img} className="w-[50px] h-[50px]" alt="" />
    // //     </div>
    // //   </div>
    // //   <button onClick={supp} className='text-red-500' >Delete</button></div>
    // ])



  }
  const [quantity, setQuantity] = useState(panier.length)


  return (
    <div className="App bg-[url('./components/img/bg.jpeg')] h-screen">
 
      <Nav argent={argent} quantity={quantity} unitéd={unitéd} panier={panier} />

      <Routes>
        <Route path='/' element={<Home />} />

        <Route path='/shop' element={<Shop hidd={hidd} produit={produit} panier={panier} achat={achat} />} />

        <Route path='/panier' element={<Panier panier={panier} unitéd={unitéd} supp={supp} />} />


      </Routes>

    </div>
  );
}

export default App;
