const db = require("../app.js");

const ContactService = {

    createAddress(params) {

        return db.Contact.create(
            {
                id: null,
                email: params.email,
                phone: params.phone,
            })


    }

}

module.exports = ContactService;
