// web scraper
    // axios - learn more about this
    // cheerio - learn more about this
    // puppeteer - learn more about this

// axios : get html of webpage I want to scrape
const axios = require('axios');
const cheerio = require('cheerio');

// current url - start date and end date can be modified directly in the url
const url = 'https://www.expedia.com/Hotel-Search?adults=1&destination=Tomahawk&endDate=2020-03-22&latLong=45.470963%2C-89.732101&regionId=7320&rooms=1&semdtl=&sort=RECOMMENDED&startDate=2020-03-21&theme=&useRewards=true&userIntent';

// create connection to url
axios(url)
  // if there is a successful response...
  .then(response => {
      // get html into var
      const html = response.data;
      // use cherrio to parse html (html must be in a variable)
      const $ = cheerio.load(html);

      // find search results class - this may need a try/catch method later
        // ok so 21 results....not sure why or how or whateverthefuck is going on here.
        // figure it out after working with the first 21 successful results...

      // filter results to only listings that have prices - no wierd ads included  
      const searchresults = $('.listing').not('[data-stid="messaging-card"]');

      const prices = [];

      // i think this is an array of objects which is why i console.log(price) works inside the scope
      // possibly have to figure out how to print the value of an attribute of an objects in the array of objects..?
      searchresults.each(function () {
          const hotel = $(this).find('h3[data-stid="content-hotel-title"]').not('[aria-hidden="false"]').text();
          const price = $(this).find('span[data-stid="content-hotel-lead-price"]').text();

          prices.push({
            hotel,
            price
        });
      });

      // different way to run a function for each element in prices array
      // for each key and value (object.entries) in the object...
      // print them to the console
      prices.forEach(function (entry) {
        for (let [hotel, price] of Object.entries(entry)) {
          console.log(`${hotel} : ${price}`);
        }
      });
  })
  .catch(console.error);

// grab prices from other sites
// create table showing prices and from which site
// add functionality for choosing dates of stays
