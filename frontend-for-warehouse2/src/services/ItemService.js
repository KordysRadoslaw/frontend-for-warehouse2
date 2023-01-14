import axios from "axios";

const API_URL = "http://localhost:8080/api/test/";

class ItemService{

    getAllItems(){
        return axios.get(API_URL + "item");
    
    }
}
export default new ItemService();