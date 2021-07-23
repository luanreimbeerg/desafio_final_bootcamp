/// <reference types="cypress"/>

import req from '../support/api/request'
import assert from '../support/api/assertions'

context('Ping', () => {
    it('GET Healthcheck @healthcheck', () => {
        
        req.getPing().then(getPingResponse => {
            assert.should(getPingResponse, 201)

        })

    });
});


