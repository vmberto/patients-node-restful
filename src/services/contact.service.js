const db = require("../models/index.js");

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
