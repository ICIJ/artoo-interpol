/*global artoo*/

;(function($) {
	'use strict';

	var firstPage;
	var throttle = artoo.settings.throttle || 5000;

	var scraper = {
		iterator: '.wanted',
		data: {
			first_name: {
				sel: '.titre',
				method: function($) {
					var html = $(this).html().trim();

					return html.substr(html.indexOf('<br>') + 4);
				}
			},
			last_name: {
				sel: '.titre',
				method: function($) {
					var html = $(this).html().trim();

					return html.substr(0, html.indexOf('<br>'));
				}
			},
			url: {
				sel: '.links a.details',
				attr: 'href'
			}
		}
	};

	var nextUrl = function($page) {
		return $page.find('.pagenavigator .select').next('.other').find('a').attr('href');
	};

	artoo.log.debug('Starting the scraper...');
	firstPage = artoo.scrape(scraper);

	artoo.ajaxSpider(
		function(i, $data) {
			var url = nextUrl(!i ? artoo.$(document) : $data);

			artoo.log.debug('Scraping URL "' + url + '"...');
			return url;
		},
		{
			scrape: scraper,
			concat: true,
			throttle: throttle
		},
		function(data) {
			artoo.log.debug('Finished retrieving data. Downloading...');

			artoo.saveCsv(firstPage.concat(data), {
				filename: 'interpol.csv'
			});
		}
	);

})(this, artoo.$);
