import image from "../assets/logo.jpg";
import Button from "../UI/Button.jsx"



import {useContext} from "react";
import CartContext from "../store/CartContext.jsx";
import UserProgressContext from "../store/UserProgressContext.jsx";
function Header(){
    const cartCtx=useContext(CartContext);
    const userProgressCtx=useContext(UserProgressContext);
    const total = cartCtx.items.reduce((totalNumberOfItem,item)=>{
        return totalNumberOfItem+item.quantity;
    },0)
    function handleShowCart(){
        userProgressCtx.showCart();
    }
    return(
    <header id="main-header">
        <div id="title">
        <img src={image} alt="logo"/>
        <h1>REACTFOOD</h1>
        </div>
        <nav>
        <Button textOnly={true} onClick={handleShowCart} >Cart({total})</Button>
        </nav>
    </header>
    )
}

export default Header;
