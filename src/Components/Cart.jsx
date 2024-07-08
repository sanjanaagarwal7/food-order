import Modal from "../UI/Modal";
import {useContext} from "react";


import { currencyFormatter } from "../util/currency";
import CartContext from "../store/CartContext";
import UserProgressContext from "../store/UserProgressContext";
import Button from "../UI/Button";
import CartItem from "./CartItem.jsx"
function Cart(){
    
    const cartCtx=useContext(CartContext);
    const userProgressCtx=useContext(UserProgressContext);
    const cartTotal=cartCtx.items.reduce((totalPrice,item)=>{
        return totalPrice+(item.quantity*item.price)
    },0)
    function handleHideCart(){
        userProgressCtx.hideCart();
    }
    function handleShowCheckout(){
        userProgressCtx.showCheckout();
    }
    return(
        <Modal className="cart" open={userProgressCtx.progress=="cart"}>
            <h2>You cart</h2>
            <ul>{cartCtx.items.map((item)=>(
               <CartItem key={item.id} name={item.name} quantity={item.quantity} price={item.price} onIncrease={()=>cartCtx.addItem(item)} onDecrease={()=>cartCtx.removeItem(item.id)}/>
            ))}</ul>
            <p className="cart-total">{currencyFormatter.format(cartTotal)}</p>
            <p className="modal-actions">
                <Button textOnly onClick={handleHideCart}>Close</Button>
                {cartCtx.items.length>0 && (<Button onClick={handleShowCheckout}>Go to Checkout</Button>) }
            </p>
        </Modal>
    )
}

export default Cart;