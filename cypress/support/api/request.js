class Requests {

    getPing(){
        return cy.request({
            method: 'GET',
            url: '/ping'
        })
    }

    getBooking(){
        return cy.request({
            method: 'GET',
            url: 'booking/1'
        })
    }

    postBooking(){
        return cy.request({
            method: 'POST',
            url: 'booking',
            body:{
                "firstname" : "Jim",
                "lastname" : "Brown",
                "totalprice" : 111,
                "depositpaid" : true,
                "bookingdates" : {
                    "checkin" : "2020-01-01",
                    "checkout" : "2020-01-02"
                },
                "additionalneeds" : "Breakfast"
            }
        })
    }

    updateBooking(response ){
        const id = response.body.bookingid

        return cy.request({
            method: 'PUT',
            url: `/booking/${id}`,
            body:{
                "firstname": "Jim",
                "lastname": "James",
                "totalprice": 111,
                "depositpaid": false,
                "bookingdates": {
                  "checkin": "2020-01-01",
                  "checkout": "2020-01-02"
                },
                "additionalneeds": "Breakfast"
              }, 
              failOnStatusCode: false
        })
    }

    updateBookingInexit(response ){
        const id = 123456789

        return cy.request({
            method: 'PUT',
            url: `/booking/${id}`,
            headers: {
                Cookie: `token=${Cypress.env('token')}`
            },
            body:{
                "firstname": "Jim",
                "lastname": "James",
                "totalprice": 111,
                "depositpaid": false,
                "bookingdates": {
                  "checkin": "2020-01-01",
                  "checkout": "2020-01-02"
                },
                "additionalneeds": "Breakfast"
              }, 
              failOnStatusCode: false
        })
    }
    updateBookingSucess(response ){
        const id = response.body.bookingid

        return cy.request({
            method: 'PUT',
            url: `/booking/${id}`,
            headers: {
                Cookie: `token=${Cypress.env('token')}`
            },
            body:{
                "firstname": "Jim",
                "lastname": "James",
                "totalprice": 111,
                "depositpaid": false,
                "bookingdates": {
                  "checkin": "2020-01-01",
                  "checkout": "2020-01-02"
                },
                "additionalneeds": "Breakfast"
              }, 
              failOnStatusCode: false
        })
    }
    postAuth(){
        return cy.request({
            method: 'POST',
            url: 'auth',
            body:{
                "username" : "admin",
                "password" : "password123"
            }
        })
    }

    doauth(){
        this.postAuth().then(authResponse =>{
            const token = authResponse.body.token;

            Cypress.env('token', token);
        })
    }

    deleteBooking(response){
        const id = response.body.bookingid

        return cy.request({
            method: 'DELETE',
            url: `booking/${id}`,
            headers: {
                Cookie: `token=${Cypress.env('token')}`
            },
            failOnStatusCode: false
        });
    }

    deleteBookingIne(response){
        const id = 1234567890

        return cy.request({
            method: 'DELETE',
            url: `booking/${id}`,
            headers: {
                Cookie: `token=${Cypress.env('token')}`
            },
            failOnStatusCode: false
        });
    }

    deleteBookingNotToken(response){
        const id = 1234567890

        return cy.request({
            method: 'DELETE',
            url: `booking/${id}`,
            failOnStatusCode: false
        });
    }
    
    deleteBookingTokenInvalid(response){
        const id = response.body.bookingid

        return cy.request({
            method: 'DELETE',
            url: `booking/${id}`,
            headers: {
                Cookie: ''
            },
            failOnStatusCode: false
        });
    }
}

export default new Requests();