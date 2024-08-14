import React, { useState,useEffect } from 'react';
import {   deleteCartItem } from './../../services/OrderService'

const Cart = (props) => {
    
    const cart = props.cart;

  const removeItemFromCart = (id) =>{
      deleteCartItem(id).then((response) => {
          let s = response.data; 

          props.itemRefresh();
            console.log(s);
        }).catch(error => {
            console.error(error);
        })
        
  }
  const getTotalPrice = ()=>{
  const sum =  cart.reduce(
    (sum, cart) => sum + cart.amount,
    0
  )
  console.log(sum);
 return sum;
  }

  return (
    <div>
          <h4>Ordered Items List</h4>

          <table className="table">
              <thead>
                  <tr>
                      <th>Sr.No</th>
                      <th>Item Name</th>
                      <th>Quntity</th>
                      <th>Amount</th>
                  </tr>
              </thead>
              <tbody>
                  {
                      cart.map((item, index) => {
                          return (
                              <tr key={index}>
                                  <td>{index + 1}</td>
                                  <td>{item.foodName}</td>
                                  <td>{item.quantity}</td>
                                  <td>{item.amount}</td>
                                  <td><button className='btn btn-primary' onClick={() => removeItemFromCart(item.id)}>Remove</button></td>
                              </tr>
                          )
                      })
                  }
              </tbody>
          </table>

          
      <h2>Total: ${getTotalPrice()}</h2>
    </div>
  );
};

export default Cart;