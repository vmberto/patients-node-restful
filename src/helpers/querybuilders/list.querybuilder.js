const Op = require('sequelize').Op;

let listQueryBuilder = function (params) {
    
    const listQuery = {};

    if (params.search) {
        if(!listQuery.where) listQuery.where = [];
        listQuery.where.push({ name: params.search }) 
    }

    if (params.sortedBy && params.orderBy) {
        listQuery.order = [];
        listQuery.order.push([params.orderBy, params.sortedBy]);
    }

    if (params.limit) {
        listQuery.limit = {};
        listQuery.limit = parseInt(params.limit);
    }

    if (params.page) {
        listQuery.offset = params.limit * (parseInt(params.page) - 1);
    }

    if (params.min_date && params.max_date) {

        if(!listQuery.where) listQuery.where = [];
        listQuery.where.push({
            attendance_at: {
                [Op.between]: [new Date(params.min_date), new Date(params.max_date)]
            }
        });

    }
    

    return listQuery;
}

module.exports = listQueryBuilder;