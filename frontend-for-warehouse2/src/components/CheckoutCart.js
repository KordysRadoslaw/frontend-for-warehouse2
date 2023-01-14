import { CartContextValue } from "./ContextProvider";
import { httpPostwithToken } from "../configs/HttpConfig";
import ControlledForm from "./ControlledForm";
import "./Checkout.css"

export default function CheckoutCart() {
	const [cartData, dispatch] = CartContextValue();
	const user = JSON.parse(localStorage.getItem("user"))
	const getTotalAmount = () => {

		return cartData.cartItems.reduce((prevValue, currentValue) => prevValue + (currentValue.quantity * currentValue.price), 0);
	}

	const deleteItem = (item) => {
		
		let obj = { "userId": user.id, "cartId": item.id }

		return httpPostwithToken("addtocart/removeItemFromCart", obj)
			.then((res) => {
				res.json().then(data => {
					

					if (res.ok) {
						dispatch({
							"type": "add_cart",
							"data": data

						})
						alert("A item is deleted");
						//push to this address after the correct execute query
						// history.push("/");

					} else {


						alert(data.message)
					}
				})
			})
	}

	return (
		<div className="container">
			<div className="container-fluid">
				<div className="row align-items-start">
					<div className="col-sm-6">
						{/* <div className="card-scroll scroll"> */}
						<div className="checkout-card overflow-auto">
							{cartData.cartItems.length === 0 ? (<h2>The cart is empty</h2>
							) : (cartData.cartItems.map((item, index) => (
								<h4 key={item.id}>{item.quantity} x {item.itemName} <button type="button" className="btn-close btn-close-size" onClick={() => deleteItem(item)}></button></h4>
							)))}
							{console.log(cartData)}
						</div>
					</div>
					<div className="col">
						<div className="checkout-card text-center">
							<h2>Cart summary</h2>
							{getTotalAmount()}
						</div>
					</div>
				</div>
			</div>
			<ControlledForm
				data={getTotalAmount()}
			/>
		</div>
	);
}
