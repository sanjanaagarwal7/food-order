import { currencyFormatter } from "../util/currency"
import {useContext} from "react";


import CartContext from "../store/CartContext";
function CartItem({name,quantity,price,onIncrease,onDecrease}) {
    const cartCtx=useContext(CartContext);
    return (
        <li className="cart-item">
        <p>
            {name} - {quantity} x {currencyFormatter.format(price)}
        </p>  
        <p className="cart-item-actions">
            <button onClick={onDecrease}>-</button>
            <span>{quantity}</span>
            <button onClick={onIncrease}>+</button>
        </p>
        </li>
    )
}

export default CartItem;