import React from 'react'
import { Container } from 'react-bootstrap';
import Header from './components/Header';
import Footer from './components/Footer';
import { Outlet } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import {ToastContainer} from 'react-toastify';

const App = () => {
  return (
    <>
    <Header />
    <main className='py-3'>
      <Container>
        <Outlet />
      </Container>
    </main>
    <Footer/>
    <ToastContainer/>
    </>
  )
}

export default App
