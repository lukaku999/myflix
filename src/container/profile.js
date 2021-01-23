import React from 'react'
import * as ROUTES from '../constants/routes'
import logo from '../logo.svg'
import Header from '../components/header/index'
import Profiles from '../components/profiles/index'

export default function SelectProfileContainer({user, setProfile}) {
   
    return <>
                <Header bg = {false}>
                    <Header.Frame>
                        <Header.Logo to = {ROUTES.HOME} src = {logo} alt = "Netflix"/>
                            
                        
                    </Header.Frame>
                </Header>

                <Profiles>
                    <Profiles.Title>Who's watching</Profiles.Title>
                    <Profiles.List>
                        <Profiles.Item onClick = {() => setProfile({displayName: user.displayName, photoURL: user.photoURL})}>
                            <Profiles.Picture src = {user.photoURL}/>

                            <Profiles.Name>{user.displayName}</Profiles.Name>
                        </Profiles.Item>
                    </Profiles.List>
                </Profiles>
            </>
}
