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
    const [firstName, setFirstName] = useState('')
    const {firebase} = useContext(FirebaseContext)
    

    const isInvalid = firstName === '' || password === '' || email === ''
    const handleSignUp = (event) => {
        event.preventDefault()
        firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then(res=> {
            res.user.updateProfile({
                displayName: firstName,
                photoURL: Math.floor(Math.floor(Math.random() * 5)) + 1,

            })
        })
        .then(() => {
            history.push(ROUTES.BROWSE)
        })
        .catch(error => {
            setFirstName('')
            setEmail('')
            setPassword('')
            console.log(error)
            setError(error.message)
        })
    }

    return (
        <Form>
            <Form.Title>
                Sign Up
            </Form.Title>
            {error && <Form.Error>{error}</Form.Error>}
            <Form.Base onSubmit = {handleSignUp} method = "POST">

                <Form.Input placeholder = "First name"
                            value = {firstName}
                            onChange = {({target}) => setFirstName(target.value)}/>

                <Form.Input placeholder = "Email address"
                            value = {email}
                            onChange = {({target}) => setEmail(target.value)}/>

                <Form.Input placeholder = "Password"
                            value = {password}
                            autoComplete = "off"
                            type = "password"
                            onChange = {({target}) => setPassword(target.value)}/>
                
                <Form.Submit disabled = {isInvalid}>
                    Sign Up
                </Form.Submit>
                <Form.Text>
                    Already Have An Account <Form.Link to ="/signin">Sign In</Form.Link> 
                </Form.Text>
                <Form.TextSmall>
                    This page is protected by Google reCAPTCHA to ensure you're not a bot. Learn more.
                </Form.TextSmall>
            </Form.Base>
        </Form>
    )
}
