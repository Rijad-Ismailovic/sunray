import React from 'react'
import { Container } from 'react-bootstrap'
import AddEmailsComponent from '../components/AddEmailsComponent'

function Homepage() {
  return (
      <Container className="py-5">
          <AddEmailsComponent></AddEmailsComponent>
        </Container>
  )
}

export default Homepage