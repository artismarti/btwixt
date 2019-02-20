class API {
  static init() {
    // TODO: Make sure URL is correct
    this.baseURL = 'http://localhost:3000'
    this.signinURL = this.baseURL + '/signin'
    this.signupURL = this.baseURL + '/signup'
    this.validateURL = this.baseURL + '/validate'
    this.meetingsURL = this.baseURL + '/mymeetings'
    this.contactsURL = this.baseURL + '/mycontacts'
    this.createMeetingURL = this.baseURL + '/meetings'
    this.updateInviteeURL = this.baseURL + '/user_meetings/update'
    this.updateMidpointURL = this.baseURL + '/midpoint'
    this.getVenuesURL = this.baseURL + '/venues'
    this.userURL = this.baseURL + '/users'
    this.deleteMeetingURL = this.baseURL + '/meetings/delete'
  }

  static signin(user) {
    return fetch(this.signinURL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(user),
    }).then(response => response.json())
  }
  static signup(user) {
    return fetch(this.signupURL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(user),
    }).then(response => response.json())
  }

  static get(url) {
    const token = localStorage.getItem('token')
    return fetch(url, {
      headers: {
        Authorization: token,
      },
    })
      .then(response => response.json())
      .catch(console.log)
  }

  static validate() {
    return this.get(this.validateURL)
  }

  static getMeetings() {
    return this.get(this.meetingsURL)
  }
  static getUser() {
    return this.get(this.userURL)
  }

  static getContacts() {
    return this.get(this.contactsURL)
  }

  static createMeeting(meeting) {
    const token = localStorage.getItem('token')
    return fetch(this.createMeetingURL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: token },
      body: JSON.stringify(meeting),
    })
  }

  static updateInviteeStatus(inviteeDecision) {
    const token = localStorage.getItem('token')
    return fetch(this.updateInviteeURL, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json', Authorization: token },
      body: JSON.stringify(inviteeDecision),
    })
  }

  static updateUserProfile(user) {
    console.log('Updating user')
    const token = localStorage.getItem('token')
    return fetch(`${this.userURL}/${user.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json', Authorization: token },
      body: JSON.stringify(user),
    })
  }

  static delete(meeting) {
    const token = localStorage.getItem('token')
    return fetch(this.deleteMeetingURL, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json', Authorization: token },
      body: JSON.stringify(meeting),
    })
  }

  static changeMidpoint(locationDetails) {
    const token = localStorage.getItem('token')
    return fetch(this.updateMidpointURL, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json', Authorization: token },
      body: JSON.stringify(locationDetails),
    })
  }

  static getVenues() {
    return this.get(this.getVenuesURL)
  }
}

API.init()

export default API
