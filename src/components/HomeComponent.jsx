import React from 'react';
import Cart from './order/Cart';
import ProductList from './order/ProductList';
import { getLoggedInUser } from '../services/AuthService'

const HomeComponent = () => {
    const email = getLoggedInUser();

   return (
       <div  className="main">
      <div>
        <ProductList email={email}/>
       
      </div>
    </div>
  );
   
}

export default HomeComponent