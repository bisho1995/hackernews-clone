const moment = require('moment');

module.exports = (params) => {
  let {
 sort, prefix, page, dateRange, type, query 
} = params;
  const url =    sort === 'byDate'
      ? 'http://hn.algolia.com/api/v1/search_by_date'
      : 'http://hn.algolia.com/api/v1/search';
  page = page || '0';
  query = query || '';
  let numericFilters = '';
  switch (dateRange) {
    case 'all':
      break;
    case 'last24h':
      numericFilters = moment()
        .subtract(1, 'days')
        .unix();
      break;
    case 'pastWeek':
      numericFilters = moment()
        .subtract(1, 'weeks')
        .unix();
      break;
    case 'pastMonth':
      numericFilters = moment()
        .subtract(1, 'months')
        .unix();
      break;
    case 'pastYear':
      numericFilters = moment()
        .subtract(1, 'years')
        .unix();
      break;
    default:
      numericFilters = '';
  }
  const tags = type;

  const api = `${url}?query=${query}&tags=${tags}&numericFilters=created_at_i>${numericFilters}&page=${page}`;
  console.log(api);
};
