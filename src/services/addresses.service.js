const db = require("../app.js");

const AddressesService = {

    createAddress(params) {

        return db.Address.create(
            {
                id: null,
                city: params.city,
                district: params.district,
                zip_code: params.zip_code,
                street: params.street,
                number: params.number,
                complement: params.complement,
                patients_id: params.patients_id
            });


    }

}

module.exports = AddressesService;
