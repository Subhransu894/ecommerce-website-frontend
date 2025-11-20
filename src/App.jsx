import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import {BrowserRouter as Router, Routes , Route, Navigate} from "react-router-dom"
// import './App.css'
import Nav from './components/Nav'
import Home from './pages/Home'
import ProductList from './pages/ProductList'
import ProductDetails from './pages/ProductDetails'
import WishList from './pages/WishList'
import Cart from './pages/Cart'
import UserProfile from './pages/userProfile'
import OrderHistory from './pages/OrderHistory'
import { ShopProvider } from './context/ShopContext'
import { AddressProvider } from './context/AddressContext'
import AddressPage from './pages/AddressPage'

import { ToastContainer } from "react-toastify";


function App() {
  // const[isLoggedIn,setIsLoggedIn]=useState(false)
  return (
    <>
    <AddressProvider>
      <ShopProvider>
        <Router>
          <Nav />
          <Routes>
            <Route path='/' element={<Home/>}></Route>
            <Route path='/products/:category' element={<ProductList/>} />
            <Route path='/products/details/:id' element={<ProductDetails/>} />
            <Route path='/wishlist' element={<WishList/>}/>
            <Route path='/cart' element={<Cart/>}/>
            <Route path='/address' element={<AddressPage/>}/>
            <Route path='/profile' element={<UserProfile/>} />
            <Route path='/orders' element={<OrderHistory/>} />
          </Routes>
        </Router>
      </ShopProvider>
    </AddressProvider>
    <ToastContainer 
        position="top-right"
        autoClose={3000} // 3 seconds
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  )
}

export default App
