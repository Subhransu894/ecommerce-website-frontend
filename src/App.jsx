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
import UserProfile from './pages/UserProfile'
import OrderHistory from './pages/OrderHistory'
import { ShopProvider } from './context/ShopContext'
import { AddressProvider } from './context/AddressContext'
import AddressPage from './pages/AddressPage'
import Footer from './components/Footer'

import Register from './pages/Register'
import Login from './pages/Login'
import ProtectedRoutes from './components/ProtectedRoutes'

import { ToastContainer } from "react-toastify";


function App() {
  return (
    <>
    <div style={{minHeight:"100vh",  display: "flex",flexDirection: "column"}}>
    <AddressProvider>
      <ShopProvider>
        <Router>
          <Nav />
          <div style={{ flex: 1 }}>
          <Routes>
            <Route path='/' element={<Home/>}></Route>

            <Route path='/login' element={<Login/>}/>
            <Route path='register' element={<Register/>}/>
            
            <Route path='/products/:category' element={<ProductList/>} />
            <Route path='/products/details/:id' element={<ProductDetails/>} />
            <Route path='/wishlist' element={<ProtectedRoutes><WishList/></ProtectedRoutes>}/>
            <Route path='/cart' element={<Cart/>}/>
            <Route path='/address' element={<ProtectedRoutes><AddressPage/></ProtectedRoutes>}/>
            <Route path='/profile' element={<ProtectedRoutes><UserProfile/></ProtectedRoutes>} />
            <Route path='/orders' element={<ProtectedRoutes><OrderHistory/></ProtectedRoutes>} />
          </Routes>
          </div>
          <Footer/>
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
      </div>
    </>
  )
}

export default App
