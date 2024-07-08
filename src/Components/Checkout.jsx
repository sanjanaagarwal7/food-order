import {useContext} from "react";
import CartContext from "../store/CartContext";
import { currencyFormatter } from "../util/currency";
import Input from "./Input";
import UserProgressContext from "../store/UserProgressContext";
import Modal from "../UI/Modal";
import Button from "../UI/Button";
import useHttp from "../http/useHttp";
import Error from "./Error";
const requestConfig={
    method:"POST",
    headers:{
        "Content-Type":"application/json"
    }
}
function Checkout(){
    const userProgressCtx=useContext(UserProgressContext);
    const cartCtx=useContext(CartContext);
    const cartTotal=cartCtx.items.reduce((totalPrice,item)=>{
        return totalPrice+(item.quantity*item.price)
    },0)
    const {data,isLoading:isSending,error,sendRequest,clearData}= useHttp("http://localhost:3000/orders",requestConfig)
    function handleClose(){
        userProgressCtx.hideCheckout();
    }
    function handleSubmit(e){
        e.preventDefault();

        const fd=new FormData(e.target);
        const customerData=Object.fromEntries(fd.entries());

        sendRequest(JSON.stringify({
            order:{
                items:cartCtx.items,
                customer:customerData

            }
        }))

    }

       function handleFinish(){
        userProgressCtx.hideCheckout();
        cartCtx.clearCart();
        clearData();
       }

       let actions = (<><Button textOnly type="button" onClick={handleClose}>Close</Button>
                <Button>Submit Order</Button></>);
                if(isSending){
               actions = <span>Sending order data...</span>
                }
    if(data && !error){
        return(
            <Modal open={userProgressCtx.progress=="checkout"}>
                <h2>success</h2>
                <p>Your order was submitted successfully</p>
                <p className="modal-actions">
                    <Button onClick={handleFinish}>Okay</Button>
                </p>
            </Modal>
        )
    }
    return(
        <Modal open={userProgressCtx.progress=="checkout"}>
            <form onSubmit={handleSubmit}>
            <h2>Checkout</h2>
            <p>Total Amount:{currencyFormatter.format(cartTotal)}</p>
            <Input label="Full Name" id="name" type="text" />
            <Input label="E-mail Address" id="email" type="email"/>
            <Input label="Street" id="street" type="text" />
            <div className="control-row">
            <Input label="Postal code" id="postal-code" type="text" />
            <Input label="City" id="city" type="text" />
            </div>
            {error && <Error title="Failed to submit order" message={error}/>}
            <p className="modal-actions">
                {actions}
            </p>
            </form>
        </Modal>
    )
}

export default Checkout;