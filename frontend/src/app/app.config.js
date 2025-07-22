// get the country id
let currCountry = localStorage.getItem("active_country_id") || 231;
currCountry = Number(currCountry);
module.exports = {
  country_id: currCountry,
};
