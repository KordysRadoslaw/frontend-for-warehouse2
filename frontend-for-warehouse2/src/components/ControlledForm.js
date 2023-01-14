import { useEffect, useState } from "react";
import { CartContextValue2 } from "./ContextProvider";
import { httpPostwithToken } from "../configs/HttpConfig";
import { useHistory } from "react-router-dom"
import { Row, Col, Form, Card, Button } from "react-bootstrap";


const initialValues = {
    firstName: "",
    lastName: "",
    city: "",
    postcode: "",
    emailAddress: "",
    confirmEmailAddress: "",
    additionalInfo: ""

}

const ControlledForm = (totalAmountOfCart) => {

    const [values, setValues] = useState(initialValues);
    const [errors, setErrors] = useState({})

    const [validated, setValidated] = useState(false);
    let history = useHistory();

    const handleInputForm = (e) => {
        const { name, value } = e.target;

        setValues({
            ...values,
            [name]: value,
        });
        

        //reset fields if error   
        if(!!errors[name]) setErrors({
            errors,
            [name] : null
        })
        
    }
    
    const checkoutOrder = () => {
        
        let totalAmount = totalAmountOfCart.data;
        console.log(totalAmount)
        console.log(totalAmountOfCart)
        // let obj = { "total_price": totalAmount, "pay_type": "cash", "deliveryAddress": "testing address" }
        let obj = { "total_price": totalAmount, "pay_type": "cash", "deliveryAddress": values.firstName + " " + values.lastName + " "
        + values.city + " " + values.postcode + " " + values.emailAddress + " " + values.additionalInfo}
        httpPostwithToken("order/checkoutOrder", obj)
            .then((res) => {
                res.json().then(data => {
                    console.log(obj)
                    if (res.ok) {
                        alert("Order successfully placed....")
                        history.push("/user");
                    } else {
                        // alert(data.message)
                        alert("The Order List is empty")
                    }
                })
            }).catch(function (res) {
                // console.log("Error ", res);
                alert(res.message);
            }
            )
    }

    const validate = () => {
        // console.log("validate in progress...")

        let errors = {};

        //first name field
        if (!values.firstName) {
            errors.firstName = "First name is required"
        }

        //last name field
        if (!values.lastName) {
            errors.lastName = "Last name is required"
        }

        //city field
        if (!values.city) {
            errors.city = "City is required"
        }

        //postcode field
        if (!values.postcode) {
            errors.postcode = "Postcode is required"
        }

        //email field
        if (!values.emailAddress) {
            errors.emailAddress = "Email is required"
        } else if (!/\S+@\S+\.\S+/.test(values.emailAddress)) {
            errors.emailAddress = "Email is invalid"
        }

        //confirm email address field
        if (!values.confirmEmailAddress) {
            errors.confirmEmailAddress = "Confirm email address is required"

        } else if (values.emailAddress !== values.confirmEmailAddress) {
            errors.confirmEmailAddress = "Emails must be the same"
            errors.emailAddress = "Emails must be the same"
        }

        setErrors(errors);
        if (Object.keys(errors).length === 0) {
            console.log("the form is correct")
            return true;
            
        } else {
            console.log("the form is incorrect")
            return false;
        }
    }


    const handleSubmit = (event) => {

        event.preventDefault();
        const form = event.currentTarget;
        
        if (form.checkValidity() === false) {
            validate(values)
            console.log("check validity...")
            event.preventDefault();
            event.stopPropagation();
            
        } else {
            
            if(totalAmountOfCart !== 0){
                checkoutOrder();
            }
        }

        setValidated(true);
    };

    return (
        <div className="container-fluid">
            <div className="row align-items-start">
                
                <Form noValidate validated={validated} onSubmit={handleSubmit}>
                    <Form.Check
                        required
                        label="Agree to confirm your Order List"
                        feedback="You must agree before submitting."
                        feedbackType="invalid"
                    />
                    <Row className="mb-3">
                        <Row className="mb-3">
                            <Form.Group as={Col} sm="6" controlId="validationFirstName">
                                <Form.Label>First Name</Form.Label>
                                <Form.Control
                                    required
                                    name="firstName"
                                    type="text"
                                    value={values.firstName}
                                    onChange={handleInputForm}
                                    placeholder="First Name" />
                                <Form.Control.Feedback>Great!</Form.Control.Feedback>
                                <Form.Control.Feedback type="invalid">{errors.firstName}</Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group as={Col} sm="6" controlId="validationLastName">
                                <Form.Label>Last Name</Form.Label>
                                <Form.Control
                                    required
                                    name="lastName"
                                    type="text"
                                    value={values.lastName}
                                    onChange={handleInputForm}
                                    placeholder="Last Name" />
                                <Form.Control.Feedback>Great!</Form.Control.Feedback>
                                <Form.Control.Feedback type="invalid">{errors.lastName}</Form.Control.Feedback>
                            </Form.Group>
                        </Row>
                        <Row className="mb-3">
                            <Form.Group as={Col} sm="6" controlId="validationCity">
                                <Form.Label>City</Form.Label>
                                <Form.Control
                                    required
                                    name="city"
                                    type="text"
                                    value={values.city}
                                    onChange={handleInputForm}
                                    placeholder="City and Country" />
                                <Form.Control.Feedback>Great!</Form.Control.Feedback>
                                <Form.Control.Feedback type="invalid">{errors.city}</Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group as={Col} sm="6" controlId="validationPostcode">
                                <Form.Label>Postcode</Form.Label>
                                <Form.Control
                                    required
                                    name="postcode"
                                    type="text"
                                    value={values.postcode}
                                    onChange={handleInputForm}
                                    placeholder="Postcode" />
                                <Form.Control.Feedback>Great!</Form.Control.Feedback>
                                <Form.Control.Feedback type="invalid">{errors.postcode}</Form.Control.Feedback>
                            </Form.Group>
                        </Row>
                        <Row className="mb-3">
                            <Form.Group as={Col} sm="6" controlId="validationEmail">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control
                                    required
                                    name="emailAddress"
                                    type="email"
                                    value={values.emailAddress}
                                    onChange={handleInputForm}
                                    placeholder="name@example.com" />
                                {/* <Form.Control.Feedback type="invalid">You have to insert the same email adress</Form.Control.Feedback> */}
                                <Form.Control.Feedback type="invalid">{errors.emailAddress}</Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group as={Col} sm="6" controlId="validationConfirmEmail">
                                <Form.Label>Confirm Email address</Form.Label>
                                <Form.Control
                                    required
                                    name="confirmEmailAddress"
                                    type="email"
                                    value={values.confirmEmailAddress}
                                    onChange={handleInputForm}
                                    isInvalid={!!errors.confirmEmailAddress}
                                    placeholder="name@example.com" />
                                    
                                <Form.Control.Feedback type="invalid">{errors.confirmEmailAddress}</Form.Control.Feedback>
                            </Form.Group>
                        </Row>

                        <Form.Group as={Col} sm="12" controlId="validationAdditionalInformation">
                            <Form.Label>Additional Informations for delivery</Form.Label>
                            <Form.Control
                                name="additionalInfo"
                                as="textarea"
                                type="text"
                                value={values.additionalInfo}
                                onChange={handleInputForm}
                                rows={2} />
                        </Form.Group>
                    </Row>
                    <Form.Group className="mb-3">
                        <Form.Check
                            required
                            label="Agree to terms and conditions"
                            feedback="You must agree before submitting."
                            feedbackType="invalid"
                        />
                    </Form.Group>
                    <Button type="submit">Submit form</Button>
                </Form>
            </div>
        </div>
    );
}
export default ControlledForm