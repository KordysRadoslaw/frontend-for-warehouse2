import React, { useEffect, useState } from "react";
import ItemService from "../services/ItemService";
import { httpPostwithToken } from "../configs/HttpConfig";
import { CartContextValue } from "./ContextProvider";
import Offcanvas from 'react-bootstrap/Offcanvas';
import Button from 'react-bootstrap/Button';
import "./Store.css";

export default function Item() {

    const [cartData, dispatch] = CartContextValue();
    const [items, setItems] = useState([]);
    const [inputField, setInputField] = useState([]);
    const [show, setShow] = useState(false);

    const [selectedItem, setSelectedItem] = useState([]);
    const handleClose = () => setShow(false);
    // const handleShow = () => setShow(true);
    const handleShow = (obj) => {
        setSelectedItem(obj)
        setShow(true)
    }


    useEffect(() => {
        getCartApi()
    }, [])

    useEffect(() => {
        ItemService.getAllItems()
            .then((res) => (
                setItems(res.data)
            ))
    }, [])



    const renderButtonOffcanvas = (obj) => {
        if (String(obj.inStock) === "true") {
            return (
                //<Button variant="primary" onClick={handleShow}>
                <Button variant="primary" onClick={() => handleShow(obj)}>
                    Add to Cart
                </Button>
            )
        } else {
            return (
                <Button variant="dark" disabled>
                    Add to Cart
                </Button>
            )
        }
    }

    const getCartApi = () => {

        httpPostwithToken("addtocart/getCartsByUserId", {})
            .then((res) => {
                res.json().then(data => {
                    if (res.ok) {                    
                        const newData = data.map(obj => ({ ...obj, addedValue: "" }))
                        dispatch({
                            "type": "add_cart",
                            "data": newData
                        })

                    } else {
                        alert(data.message)
                    }
                })
            }, error => {
                alert(error.message);
            }
            )
    }

    const addCartApi = (selectedItem) => {
        let objAdd = {
            "itemId": selectedItem.itemId,
            // "quantity" : itemObj.quantity,
            "quantity": inputField,
            "price": selectedItem.price
        }

        let objUpdate = {

            "quantity": inputField,
            "price": selectedItem.price
        }

        cartData.cartItems.map((item) => {
            return objUpdate = { ...objUpdate, "cartId": item.id }
        })


        if (cartData.cartItems.length === 0) {
            return httpPostwithToken("addtocart/addItem", objAdd)
                .then((res) => {
                    res.json().then(data => {
                        // console.log(data)
                        // console.log(objAdd)
                        if (res.ok) {
                            dispatch({
                                "type": "add_cart",
                                "data": data

                            })
                            alert("An item is added")
                            setInputField("")
                            setShow(false)
                        } else {
                            alert(data.message)
                        }
                    })
                })
        } else {
            cartData.cartItems.map((item, i) => {
                if (item.itemName === selectedItem.name) {
                    return httpPostwithToken("addtocart/updateQuantityForCart", objUpdate)
                        .then((res) => {
                            res.json().then(data => {
                                // console.log(data)
                                // console.log(objUpdate)
                                if (res.ok) {
                                    dispatch({
                                        "type": "add_cart",
                                        "data": data

                                    })
                                    alert("The cart is updated")
                                    setInputField("")
                                    setShow(false)
                                } else {
                                    alert(data.message)
                                }
                            })
                        })
                } else {
                    return httpPostwithToken("addtocart/addItem", objAdd)
                        .then((res) => {
                            res.json().then(data => {
                                // console.log(data)
                                // console.log(objAdd)
                                if (res.ok) {
                                    dispatch({
                                        "type": "add_cart",
                                        "data": data
                                    })
                                    alert("An item is added")
                                    setInputField("")
                                    setShow(false)
                                } else {
                                    alert(data.message)
                                }
                            })
                        })
                }
            })
        }
    }

    const handleChange = (e, item, index) => {

        const result = e.target.value.replace(/\D/g, '');
        const updatedValue = result

        setInputField(updatedValue)
    }

    const handleSubmit = (e) => {
        
        e.preventDefault();
    }

    return (
        <div className="container">
            <div className="row">
            </div>
            {items.map(
                (item, index) => (
                    <div className="store-card text-center" key={index}>
                        <div className="container responsive-width float-start ">
                            <div className="row row-cols-1 row-cols-md-5">
                                <div className="col">Item name</div>
                                <div className="col">Price</div>
                                <div className="col">In Stock</div>
                                <div className="col">Quantity</div>
                                <div className="col">Description</div>
                            </div>
                        </div>

                        <div className="container ">
                            <div className="row row-cols-1 row-cols-md-5">

                                <div className="col">{item.name}</div>
                                <div className="col">{item.price}</div>
                                <div className="col">{String(item.inStock) === "true" ? "yes" : "no"}</div>
                                <div className="col">{item.quantity}</div>
                                <div className="col">{item.description}</div>

                            </div>
                        </div>
                        <div className="row">
                            <div className="col text-center">
                                <form onSubmit={handleSubmit}>

                                    {renderButtonOffcanvas(item)}

                                    <Offcanvas show={show} onHide={handleClose} backdrop="static" placement="end">
                                        <Offcanvas.Header closeButton>
                                            <Offcanvas.Title>Add Item</Offcanvas.Title>
                                        </Offcanvas.Header>
                                        <Offcanvas.Body>

                                            <input id={item.itemId} type='text' inputMode="decimal" value={inputField} onChange={e => handleChange(e, item)} />
                                            <button type="submit" className="btn btn-danger btn-sm" onClick={() => (addCartApi(selectedItem))}>Add to Cart</button>
                                            <button type="submit" className="btn btn-danger btn-sm" onClick={() => setShow(false)}>Decline</button>
                                        </Offcanvas.Body>
                                    </Offcanvas>
                                </form>
                            </div>
                        </div>
                        {/* {console.log(cartData)} */}
                    </div>
                )
            )}
        </div>
    )
}