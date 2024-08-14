import React, { useContext,useState,useEffect } from 'react';
import {   getAllInventories,getProductCategory } from './../../services/InventoryService'
import { newOrder, saveOrder, getActiveOrderId, getCartData } from './../../services/OrderService'
import Cart from './Cart';

const ProductList = (props) => {
  const [orderNumber, setOrderNumber] = useState([])

    function getNerOrder() {
      newOrder(props.email).then((response) => { 
          setOrderNumber(response.data);
          getCartDataList(response.data);
      }).catch(error => {
            console.error(error);
        })
    }

    const handleNewOrder = (event) => {
        getNerOrder();
    }

    const [cart, setCart] = useState([]);
    useEffect(() => {
        getCartDataList(orderNumber);
    }, [])

    function getCartDataList(orderNumber) {
        console.log('orderNumber' + orderNumber);
        getCartData(props.email, orderNumber ).then((response) => {
            setCart(response.data);
        }).catch(error => {
            console.error(error);
        })
    }

    function itemRefresh() {
        console.log('orderNumber' + orderNumber);
        getCartData(props.email, orderNumber).then((response) => {
            setCart(response.data);
        }).catch(error => {
            console.error(error);
        })
    }

  useEffect(() => {
        getActiveOrderIdForUser();
    }, [])

  function getActiveOrderIdForUser() {
      getActiveOrderId(props.email).then((response) => { 
     
       if(response.data!==''){
           setOrderNumber(response.data);
           getCartDataList(response.data);
          }
      }).catch(error => {
            console.error(error);
        })
    }


  const [products, setProducts] = useState([])
  const [quantity, setQuantity] = useState([])
  const [orderItem, setOrderItem] = useState({
    email: '',
    product: '',
    orderId: '',
    quantity: ''
  });

  const handleQuantityChange = () => (event) => {
      console.log(event.target.value);
      setQuantity(event.target.value);
       
  }

  const addItemToCart = (productName,quantity) =>{
       orderItem.email = props.email;
       orderItem.product = productName;
       orderItem.orderId=orderNumber;
       orderItem.quantity=quantity;
       saveOrder(orderItem).then((response) => {
           console.log(response.data)
           getCartDataList(orderNumber);
           setQuantity('');
            }).catch(error => {
                console.error(error);
            });
        

  }

  
    useEffect(() => {
        listProducts('all');
    }, [])
    
    function listProducts(foodCategory){
        getAllInventories(foodCategory).then((response) => {
            setProducts(response.data);           
        }).catch(error => {
            console.error(error);
        })
    }

    //Get Dropdown Data
    const [items,setItems] = useState(['All']);
    
    useEffect(() => {
        getFoodCategory();
    }, [])

    function getFoodCategory() {
      getProductCategory().then((response) => { 
      setItems([...items,...response.data]);
      }).catch(error => {
            console.error(error);
        })
    }

    const handleFoodCategoryChange = (event) => {
    const value = event.target.value;
    listProducts(value);
    console.log(value);
  };
   
 
    return (
        <div>
            <div class="form-group row">
                <button className='col-sm-1  btn btn-primary' onClick={handleNewOrder}>New Order</button>
                 <h5 class="col-sm-10"> #Order Number {orderNumber} </h5>
            </div>
            <div class="form-group row">
                <label for="selectfood" class="col-sm-2 col-form-label">Select Food Category </label>
          
                    <select class="col-sm-2" onChange={handleFoodCategoryChange}>
                        {
                            items.map((item) => (
                                <option label={item} value={item} >{item}</option>
                            ))}
                    </select>
             
            </div>

      <h4>Food Items </h4>
      
          <table className="table">
            <thead>
                <tr>
                    <th>Sr.No</th>
                    <th>Item Name</th>
                    <th>Price</th>
                    <th>Quntity</th>
                </tr>
            </thead>
            <tbody>
            {
                products.map((product, index)=>{
                    return(
                        <tr key={index}>
                            <td>{index+1}</td>
                            <td>{product.name}</td>
                            <td>{product.price}</td>
                            <td><input type="number" onChange={handleQuantityChange()} /></td>
                            <td><button className='btn btn-primary' onClick={() => addItemToCart(product.name,quantity)}>Add to Cart</button></td>
                        </tr>
                    )
                })
            }
            </tbody>
        </table>
            <Cart email={props.email} cart={cart} itemRefresh={itemRefresh} />
    </div>
  );
};

export default ProductList;