import React from 'react'
import faqsData from '../fixtures/faqs.json'
import Accordion from '../components/accordion/index'
import OptForm from '../components/opt-form'

export default function FaqsContainer() {

    return (
        <Accordion>
            <Accordion.Title>Frequently Asked Question</Accordion.Title>
            {faqsData.map(item => (
                <Accordion.Item key = {item.id}>
                    <Accordion.Header>{item.header}</Accordion.Header>
                    <Accordion.Body>{item.body}</Accordion.Body>
                </Accordion.Item>
            ))}
            <OptForm>
                <Accordion.Item/>
                <OptForm.Input placeholder = "Email address"/>
                
                <OptForm.Button>Try it now</OptForm.Button>
                <OptForm.Break />
                <OptForm.Text>
                    Ready to watch? Enter your email to create or restart your membership
                </OptForm.Text>
              
            </OptForm>
        </Accordion>
    )
}