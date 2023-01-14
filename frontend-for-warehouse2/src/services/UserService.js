import axios from "axios";
import authHeader from "./AuthHeader";

const API_URL = "http://localhost:8080/api/test/";

class UserService {
  getPublicContent() {
    return axios.get(API_URL + "all");
  }

  getGreetings() {
    return axios.get(API_URL + "greeting", { headers: authHeader() });
  }

  getOrders(){
    return axios.get("http://localhost:8080/api/checkoutControl/" + "orderList",  { headers: authHeader() });
  }

  //it was test
  getOrders2(){
    let userDetails = JSON.parse(localStorage.getItem('user'))
    return axios.post("http://localhost:8080/api/addtocart/orderList", {userId: 2}, {headers:{
      'Content-Type': 'application/json' ,
      "Authorization":"Bearer " + userDetails.accessToken }});
  }
  getOrders3(url, param){
    
      let userDetails = JSON.parse(localStorage.getItem('user'))
      param['userId'] = userDetails.id
      const requestOptions = {
          method: 'POST',
          headers: { 
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(param)
         
      };
      return fetch(url,requestOptions)
  }
}

export default new UserService();

