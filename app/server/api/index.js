const moment = require('moment');
const axios = require('axios');

module.exports = params => new Promise((resolve, reject) => {
    let {
 sort, prefix, page, dateRange, type, query 
} = params;
    const url =      sort === 'byDate'
        ? 'http://hn.algolia.com/api/v1/search_by_date'
        : 'http://hn.algolia.com/api/v1/search';
    page = page || '0';
    query = query || '';
    let numericFilters = '';
    switch (dateRange) {
      case 'all':
        break;
      case 'last24h':
        numericFilters = `created_at_i>${moment()
          .subtract(1, 'days')
          .unix()}`;
        break;
      case 'pastWeek':
        numericFilters = `created_at_i>${moment()
          .subtract(1, 'weeks')
          .unix()}`;
        break;
      case 'pastMonth':
        numericFilters = `created_at_i>${moment()
          .subtract(1, 'months')
          .unix()}`;
        break;
      case 'pastYear':
        numericFilters = `created_at_i>${moment()
          .subtract(1, 'years')
          .unix()}`;
        break;
      default:
        numericFilters = '';
    }
    const tags = type;

    const api = `${url}?query=${query}&tags=${tags}&numericFilters=${numericFilters}&page=${page}`;
    console.log(api);
    axios
      .get(api)
      .then(data => data.data)
      .then((data) => {
        resolve(data);
      })
      .catch((err) => {
        console.log(err);
        reject(err);
      });
  });
