import axios from "axios";

const API_URL = "http://localhost:8080/api/addtocart/"

class CartService {
    
    addToCart(itemId, userId, quantity, price){
        return axios
        .post(API_URL + "addItem", {itemId, userId, quantity, price})
        .then((response) => {
            localStorage.setItem("add_to_cart", JSON.stringify(response.data));
            
            return response.data;
        })
        
    }
}
export default new CartService();