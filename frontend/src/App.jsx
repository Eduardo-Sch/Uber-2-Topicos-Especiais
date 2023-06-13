import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './layout/Layout';
import Home from './paginas/Home';
import Motoristas from './paginas/Motoristas';
import Cadastros from './paginas/Cadastros';
import Corridas from './paginas/Corridas';
import Sobre from './paginas/Sobre';

function App() {
  return (
    <>
      <Routes>
          <Route path='/' element={<Layout><Home/></Layout>} />
          <Route path='/cadastros' element={<Layout><Cadastros/></Layout>} />   
          <Route path='/motoristas' element={<Layout><Motoristas/></Layout>} />   
          <Route path='/corridas' element={<Layout><Corridas/></Layout>} />   
          <Route path='/sobre' element={<Layout><Sobre/></Layout>} />
      </Routes>     
    </>
  );
}
export default App;
