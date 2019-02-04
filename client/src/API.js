class API {
  static init() {
    // TODO: Make sure URL is correct
    this.baseURL = 'http://localhost:3000'
    this.signinURL = this.baseURL + '/signin'
    this.validateURL = this.baseURL + '/validate'
    this.meetingsURL = this.baseURL + '/mymeetings'
    this.contactsURL = this.baseURL + '/mycontacts'
    this.createMeetingURL = this.baseURL + '/meetings'
  }

  static signin(user) {
    return fetch(this.signinURL, {
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

  static getContacts() {
    return this.get(this.contactsURL)
  }

  static createMeeting(meeting) {
    const token = localStorage.getItem('token')
    return fetch(this.createMeetingURL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: token },
      body: JSON.stringify(meeting),
    }).then(data => console.log(data))
  }
}

API.init()

export default API
