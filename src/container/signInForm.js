import React, {useState, useContext} from 'react'
import {useHistory } from 'react-router-dom'
import Form from '../components/form/index'
import {FirebaseContext} from '../context/firebase'
import * as ROUTES from '../constants/routes'

export default function FormContainer() {
    const [error, setError] = useState('')
    
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const history = useHistory()
    const {firebase} = useContext(FirebaseContext)
    

    const isInvalid =  password === '' || email === ''
    const handleSignUp = (event) => {
        event.preventDefault()
        firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then(res=> {
            history.push(ROUTES.BROWSE)
        })
        .catch(error => {
            setEmail('')
            setPassword('')
            console.log(error)
            setError(error.message)
        })
    }

    return (
        <Form>
            <Form.Title>
                Sign In
            </Form.Title>
            {error && <Form.Error>{error}</Form.Error>}
            <Form.Base onSubmit = {handleSignUp} method = "POST">
                
                <Form.Input placeholder = "Email address"
                            value = {email}
                            onChange = {({target}) => setEmail(target.value)}/>

                <Form.Input placeholder = "Password"
                            value = {password}
                            autoComplete = "off"
                            type = "password"
                            onChange = {({target}) => setPassword(target.value)}/>
                
                <Form.Submit disabled = {isInvalid}>
                    Sign In
                </Form.Submit>
                <Form.Text>
                    New To Myflix? <Form.Link to ="/signup">Sign Up Now</Form.Link> 
                </Form.Text>
                <Form.TextSmall>
                    This page is protected by Google reCAPTCHA to ensure you're not a bot. Learn more.
                </Form.TextSmall>
            </Form.Base>
        </Form>
    )
}
