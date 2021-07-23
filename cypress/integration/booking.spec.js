/// <reference types="cypress"/>


import req from  '../support/api/request'
import schemas from  '../support/api/schemas'
import assertions from  '../support/api/assertions'

context('Booking', () => {
    before(() => {
        req.doauth()
    });

    it('Validar o contrato do GET Booking @contract', () => {
        
        req.getBooking().then(getBookingResponse => {
            assertions.validateContractOf(getBookingResponse, schemas.getBookingSchema())
            
        })
    });
    it('Criar uma reserva com sucesso @functional', () => {
        
        req.postBooking().then(postBookingResponse => {
            assertions.should(postBookingResponse, 200)
            assertions.bookingIdIsNotNull(postBookingResponse)
            assertions.shouldHaveDefaultHeaders(postBookingResponse)
            assertions.shouldHaveContentType(postBookingResponse)
            assertions.shouldDuration(postBookingResponse)    
        })

        
    });

    it('Tentar alterar uma reserva sem token @functional', () => {
        req.postBooking().then(postBookingResponse => {
            req.updateBooking(postBookingResponse).then(putBookingResposnse => {
                assertions.should(putBookingResposnse, 403)
        });
       })
        
    });
    
    it('Tentar alterar uma reserva inexistente @functional', () => {
        req.postBooking().then(postBookingResponse => {
            req.updateBookingInexit(postBookingResponse).then(putBookingResposnse => {
                assertions.should(putBookingResposnse, 405)
        });
       })
        
    });

    it('Alterar uma reserva com sucesso @functional', () => {
        req.postBooking().then(postBookingResponse => {
            req.updateBookingSucess(postBookingResponse).then(putBookingResposnse => {
                assertions.should(putBookingResposnse, 200)
        });
       })
    });

    

    it('Excluir com sucesso @functional', () => {
        req.postBooking().then(postBookingResponse => {
            req.deleteBooking(postBookingResponse).then(deleteBookingResponse => {
                assertions.should(deleteBookingResponse, 201)
            })
        })
    });
    
    it('Excluir uma reserva que não existe @functional', () => {
        req.postBooking().then(postBookingResponse => {
            req.deleteBookingIne(postBookingResponse).then(deleteBookingResponse => {
                assertions.should(deleteBookingResponse, 405)
            })
        })
    });
    
    it('Excluir sem passar o token @functional', () => {
        req.postBooking().then(postBookingResponse => {
            req.deleteBookingNotToken(postBookingResponse).then(deleteBookingResponse => {
                assertions.should(deleteBookingResponse, 403)
            })
        })
    });
    
    it('Excluir com token vazio @functional', () => {
        req.postBooking().then(postBookingResponse => {
            req.deleteBookingTokenInvalid(postBookingResponse).then(deleteBookingResponse => {
                assertions.should(deleteBookingResponse, 403)
            })
        })
    });


});

/*
{
  "firstname": "Susan",
  "lastname": "Ericsson",
  "totalprice": 763,
  "depositpaid": true,
  "bookingdates": {
    "checkin": "2020-02-07",
    "checkout": "2021-01-13"
  }
}
*/