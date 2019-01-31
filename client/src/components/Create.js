import React from 'react'
import { Container, Button, Checkbox, Form } from 'semantic-ui-react'

import API from '../API'

class Create extends React.Component {
  state = {
    contacts: [],
  }

  getContacts() {
    // API.getContacts().then(data => console.log(data.map(d => d.contacts)))
    API.getContacts().then(data => this.createContacts(data))
  }

  createContacts = data => {
    let contacts = data.map(d => {
      return d.contacts
    })
    let uniqueContacts = Object.values(
      contacts
        .flat()
        .reduce((acc, cur) => Object.assign(acc, { [cur.id]: cur }), {})
    )

    this.setState({ contacts: [...uniqueContacts] })
  }
  componentDidMount() {
    // if a user is not signed in, redirect to sign in
    const { email, history } = this.props
    if (!email) {
      history.push('/signin')
    } else {
      this.getContacts()
    }
  }
  render() {
    const { contacts } = this.state
    return (
      <React.Fragment>
        <Form size="small">
          <Form.Field required width="six">
            <label>Title</label>
            <input placeholder="title" />
          </Form.Field>
          <Form.Field required width="six">
            <label>Start Location:</label>
            <input placeholder="start location" />
          </Form.Field>
          <Form.Field>
            {contacts.length === 0 && <div>No contacts</div>}
            {contacts.map(contact => (
              <Checkbox label={contact.first_name + ' ' + contact.last_name} />
            ))}
          </Form.Field>
          <Button type="submit">Submit</Button>
        </Form>
      </React.Fragment>
    )
  }
}

export default Create
