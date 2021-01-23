import React, {useContext, useState, useEffect} from 'react'
import Fuse from 'fuse.js'
import SelectProfileContainer from '../container/profile'
import {FirebaseContext} from '../context/firebase'
import Loading from '../components/loading/index'
import Header from '../components/header/index'
import CardContainer from './card'

import * as ROUTES from '../constants/routes'
import logo from '../logo.svg'
import FooterContainer from './footer'

export default function BrowserContainer({slides}) {
    const [searchTerm, setSearchTerm] = useState('')
    const [profile, setProfile] = useState({})
    const [loading, setLoading] = useState(true)
    const [category, setCategory] = useState('series')
    const {firebase} = useContext(FirebaseContext)
    const user = firebase.auth().currentUser
    
    const [slideRows, setSlideRows] = useState([])

    useEffect(() => {
        setSlideRows(slides[category])
        
    }, [slides, category])
   

    useEffect (() => {
      
        setTimeout(() => {
            setLoading(false)
        }, 3000)
    }, [profile.displayName])


    useEffect(() => {
       
       const fuse = new Fuse(slideRows, {keys: ['data.description', 'data.title', 'data.genre']})
       
       const results = fuse.search(searchTerm).map(({item}) => item)
       
      
       if (slideRows.length > 0 && searchTerm.length > 3 && results.length){
            setSlideRows(results)
       }
       else {
           setSlideRows(slides[category])
       }
    }, [searchTerm])


return profile.displayName ? (loading ? <Loading src = {user.photoURL}/> :
                                         <> 
                                            <Loading.ReleaseBody/> 
                                                
                                                <Header src = "joker1" dontShowOnSmallViewPort>
                                                    <Header.Frame>
                                                        <Header.Group>
                                                            <Header.Logo to = {ROUTES.HOME} src = {logo} alt = "Netflix"/>
                                                            <Header.TextLink active = {category === 'series' ? 'true' : 'false'}  onClick = {() => setCategory('series')}> 
                                                                    Series {console.log("active is", category)}
                                                            </Header.TextLink>
                                                            <Header.TextLink active = {category === 'films' ? 'true' : 'false'}  onClick = {() => setCategory('films')}>
                                                                    Films
                                                            </Header.TextLink>
                                                        </Header.Group>
                                                        <Header.Group>
                                                            <Header.Search searchTerm = {searchTerm} setSearchTerm = {setSearchTerm}>

                                                            </Header.Search>
                                                            <Header.Profile>
                                                                <Header.Picture src = {user.photoURL}/>
                                                                <Header.Dropdown>
                                                                    <Header.Group>
                                                                        <Header.Picture src = {user.photoURL}/>
                                                                        <Header.TextLink>
                                                                            {user.displayName}
                                                                        </Header.TextLink>
                                                                    </Header.Group>
                                                                        
                                                                            <Header.TextLink onClick = {() => {firebase.auth().signOut(); }}>Sign Out</Header.TextLink> 
                                                                        
                                                                </Header.Dropdown>
                                                            </Header.Profile>
                                                        </Header.Group>
                                                        
                                                    </Header.Frame>
                                                       <Header.Feature>
                                                           <Header.FeatureCallOut>
                                                               Watch Joker Now
                                                               <Header.Text>
                                                                        Forever alone in a crowd, failed comedian Arthur Fleck seeks connection as he walks the streets of Gotham City. 
                                                                        Arthur wears two masks -- the one he paints for his day job as a clown, 
                                                                        and the guise he projects in a futile attempt to feel like he's part of the world around him. 
                                                                        Isolated, bullied and disregarded by society, 
                                                                        Fleck begins a slow descent into madness as he transforms into the criminal mastermind known as the Joker.
                                                               </Header.Text>
                                                               <Header.PlayButton>
                                                                        Play
                                                                </Header.PlayButton>
                                                           
                                                           </Header.FeatureCallOut>
                                                       </Header.Feature>
                                                </Header> 
                                                <CardContainer category = {category} slides = {slides} slideRows = {slideRows}>

                                                </CardContainer>
                                                <FooterContainer/>
                                        </>
                             ) :(
        <div>  
            <SelectProfileContainer user = {user === null ? {photoURL: "", displayName: ""} : user} setProfile = {setProfile}/>
        </div>  
    )
}
