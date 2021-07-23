class Assertions {
    
    should(response, status) {
        expect(response.status, `status is ${status}`).to.eq(status)
    }

    validateContractOf(response, schema){
        return cy.wrap(response.body).should(
            schema
        )
    }

    bookingIdIsNotNull(response){
        expect(response.body.bookingid, 'bookingid exist').to.not.be.null
    }

    shouldHaveDefaultHeaders(response){
        expect(response.headers, 'default headers include').to.include({
            server: 'Cowboy',
            connection: 'keep-alive',
            'x-powered-by': 'Express'
        })
    }

    shouldHaveContentType(response){
        expect(response.headers, 'content type include').to.include({
            'content-type': 'application/json; charset=utf-8'
        })
    }

    shouldDuration(response){
        expect(response.duration, 'response durations').lessThan(900)
    }


}

export default new Assertions();