import React, { createContext, useContext, useReducer, useState }from "react";

// creating cart context
let CartContext = createContext();

let ItemCartCountContext = createContext();

//initialize the Cart State
export const cartState = {
    cartItems: []
}

// export const totalItemCountState = {
//     totalItem: 0
// }


//add and update
export const reducer=(state, action) => {
    switch(action.type){
        case "add_cart":
        return {cartItems: [...action.data]}
        break;
        case "delete_cart":
        break;
        default:
            return state;
    }
}


// export const counterReducer = (state, action) => {
//     switch(action.type){
//         case "increase_counter":
//             return {
//                 ...state,
//                 totalItem: state.totalItem + 1
//             }
//         case "decrease_counter":
//             return{
//                 ...state,
//                 totalItem: state.totalItem - 1
//             }    
//         case "reset":
//             return{
//                 totalItem: 0
//             }
//         default:
//             return state
//     }
// } 

export const ContextProvider=({cartState, reducer, children}) => {
    return(
        <CartContext.Provider value={useReducer(reducer, cartState)}>
            {children}
        </CartContext.Provider>
    )
}

// export const CounterProvider=({totalItemCountState, counterReducer, children}) => {
//     return(
//         <ItemCartCountContext.Provider value={useReducer(counterReducer, totalItemCountState)}>
//             {children}
//         </ItemCartCountContext.Provider>
//     )
// }

 
//accesing the cart context inside the component
export const CartContextValue = () => useContext(CartContext);

export const ItemCartCountValue = () => useContext(ItemCartCountContext)
