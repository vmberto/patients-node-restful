/**
 * 
 * @param {number} total Total number of values in the table
 * @param {number} count Total number of values that were fetched
 * @param {number} limit Max number of values to be fetched
 * @param {number} page Current page
 * @param {object[]} filters [optional] Object array with filters to be applied 
 */
const listMetaBuilder = function (total, count, limit, page, filters = []) {
    
    const paginationConfig = {
        "total": total,
        "count": count,
        "per_page": parseInt(limit),
        "current_page": parseInt(page),
        "total_pages": total < limit || total === count ? 1 : Math.ceil(total / limit),
    };

    const filterConfig = {}
    
    filters.forEach(filter => {
        filterConfig[filter.title] = filter.value;
    });

    let meta = { paginationConfig };
    if (filterConfig) meta = {...meta, filterConfig};

    return meta;
}

module.exports = listMetaBuilder;
