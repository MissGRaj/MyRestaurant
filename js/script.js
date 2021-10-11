//using $function of jQuery, name of jquery function is $,
// as collapse functionality defined by bootstrap is dependent
// on jquery, so can'nt use js completely.

// $(function () { //same as document.addEventListener("DOMContentLoaded"....


// 	//same as document.querySelector("#navbarToggle").addEventListener("blur", function() { });
// 	$("#navbarToggle").blur(function (event) {  
// 		var screenWidth = window.innerWidth;
// 		if (screenWidth < 768) {
// 			$("#collapsable-nav").collapse('hide');
// 		}
// 	});
// });


(function(global){

	var ka = {};

	var homeHtmlUrl = "snippets/home-snippet.html";
	var awardsHtmlUrl = "snippets/awards-snippet.html";
	var aboutHtmlUrl = "snippets/about-snippet.html";
	var allCategoriesUrl = "data/categories.json";
	var categoriesTitleHtmlUrl = "snippets/categories-title-snippet.html";
	var categoryHtmlUrl = "snippets/category-snippet.html";
	var menuItemsUrl = "data/categories/";
	var menuTitleHtml = "snippets/menu-items-title.html";
	var menuItemHtml = "snippets/menu-item.html";

	// function for inserting innerHTML for 'selector'
	var insertHtml = function (selector, html) {
		document.querySelector(selector).innerHTML = html;
	}

	// Show loading icon inside element "selector"
	var showLoading = function (selector) {
		var html = "<div class='text-center'>";
		html += "<img src='images/ajax-loader.gif'> </div>";
		insertHtml(selector, html);
	}

	// Return substitute of '{{propName}}'
	// with propValue in given 'string'
	var insertProperty = function (string, propName, propValue) {
		var propToReplace = "{{" + propName + "}}";
		string = string.replace(new RegExp(propToReplace, "g"), propValue);
		return string;
	}

	// remove 'active' cls from home button and switch to menu button
	var switchMenuToActive = function () {
		// remove 'active' class from home button 
		var classes = document.querySelector("#navHomeButton").className;
		classes = classes.replace(new RegExp("active", "g"), "");
		document.querySelector("#navHomeButton").className = classes;

		// remove 'active' class from About button 
		classes = document.querySelector("#navAboutButton").className;
		classes = classes.replace(new RegExp("active", "g"), "");
		document.querySelector("#navAboutButton").className = classes;

		// remove 'active' class from Awards button 
		classes = document.querySelector("#navAwardsButton").className;
		classes = classes.replace(new RegExp("active", "g"), "");
		document.querySelector("#navAwardsButton").className = classes;

		console.log(classes);
		// add 'active' to menu button if not already there
		classes = document.querySelector("#navMenuButton").className;
		if (classes.indexOf("active") == -1) {
			classes += " active";
			document.querySelector("#navMenuButton").className = classes;
		}
	};

	// On page load, before loading images, css
	document.addEventListener("DOMContentLoaded", function (event) {
		
		// on first load, show home view
		showLoading("#main-content");
		$ajaxUtils.sendGetRequest(homeHtmlUrl, 
			function (responseText) {
			document.querySelector("#main-content").innerHTML = responseText;
		},
		false);

	});

	// Load Awards page snippet
	ka.loadAwardsPage = function () {
		showLoading("#main-content");
		var classes = document.querySelector("#navMenuButton").className;
		if (classes.indexOf("active") != -1) {
			classes = classes.replace(new RegExp("active", "g"), "");
			document.querySelector("#navMenuButton").className = classes;
		}

		classes = document.querySelector("#navHomeButton").className;
		if (classes.indexOf("active") != -1) {
			classes = classes.replace(new RegExp("active", "g"), "");
			document.querySelector("#navHomeButton").className = classes;
		}

		classes = document.querySelector("#navAboutButton").className;
		if (classes.indexOf("active") != -1) {
			classes = classes.replace(new RegExp("active", "g"), "");
			document.querySelector("#navAboutButton").className = classes;
		}

		classes = document.querySelector("#navAwardsButton").className;
		if (classes.indexOf("active") == -1) {
			classes += " active";
			document.querySelector("#navAwardsButton").className = classes;
		}

		$ajaxUtils.sendGetRequest(awardsHtmlUrl, 
			function (responseText) {
			document.querySelector("#main-content").innerHTML = responseText;
		},
		false);
	}

	// Load About page snippet
	ka.loadAboutPage = function () {
		showLoading("#main-content");
		var classes = document.querySelector("#navMenuButton").className;
		if (classes.indexOf("active") != -1) {
			classes = classes.replace(new RegExp("active", "g"), "");
			document.querySelector("#navMenuButton").className = classes;
		}

		classes = document.querySelector("#navHomeButton").className;
		if (classes.indexOf("active") != -1) {
			classes = classes.replace(new RegExp("active", "g"), "");
			document.querySelector("#navHomeButton").className = classes;
		}
		
		classes = document.querySelector("#navAwardsButton").className;
		if (classes.indexOf("active") != -1) {
			classes = classes.replace(new RegExp("active", "g"), "");
			document.querySelector("#navAwardsButton").className = classes;
		}

		classes = document.querySelector("#navAboutButton").className;
		if (classes.indexOf("active") == -1) {
			classes += " active";
			document.querySelector("#navAboutButton").className = classes;
		}

		$ajaxUtils.sendGetRequest(aboutHtmlUrl, 
			function (responseText) {
			document.querySelector("#main-content").innerHTML = responseText;
		},
		false);
	}

	// Load the menu categories view
	ka.loadMenuCategories = function () {
		showLoading("#main-content");
		switchMenuToActive();
		$ajaxUtils.sendGetRequest(allCategoriesUrl,
			buildAndShowCategoriesHTML);
	};


	// Load menu items view, 'categoryShort' is short name for category
	ka.loadMenuItems = function (categoryShort) {
		showLoading("#main-content");
		switchMenuToActive();
		// console.log(menuItemsUrl + categoryShort+ ".json"); //data/menu_items.json?category=L
		// data/categories/L.json
		$ajaxUtils.sendGetRequest(menuItemsUrl + categoryShort + ".json",
			buildAndShowMenuItemsHTML);
	};


	// Builds HTML for categories page based on the data from the server
	function buildAndShowCategoriesHTML(categories) {
		
		// Loads title snippet of categories page
		$ajaxUtils.sendGetRequest(categoriesTitleHtmlUrl,
			function (categoriesTitleHtmlUrl) {
				// retrieve single category snippet 
				$ajaxUtils.sendGetRequest(categoryHtmlUrl,
					function (categoryHtmlUrl) {
						var categoriesViewHtml = buildCategoriesViewHtml(categories,
																		 categoriesTitleHtmlUrl,
																		 categoryHtmlUrl);
						insertHtml("#main-content", categoriesViewHtml);
					},
					false);
			},
			false);
	}


	// Using categories data and snippets html
	// build categories view HTML to be inserted into page
	function buildCategoriesViewHtml(categories, categoriesTitleHtmlUrl, categoryHtmlUrl) {
		
		var finalHtml = categoriesTitleHtmlUrl;
		finalHtml += "<section class='row'>";

		// Loop over categories
		for (var i =0; i < categories.length; i++) {
			// Insert category values
			var html = categoryHtmlUrl;
			var name = "" + categories[i].name;
			var short_name = categories[i].short_name;
			html = insertProperty(html, "name", name);
			html = insertProperty(html, "short_name", short_name);
			finalHtml += html;
		}
		finalHtml += "</section>";
		return finalHtml;
	}


	// Builds HTML for single category page based on data frm server
	// categoryMenuItems = data/categories/L.json
	function buildAndShowMenuItemsHTML(categoryMenuItems) {
		// Loading Title snippet of menu items page
		$ajaxUtils.sendGetRequest(menuTitleHtml, 
			function (menuTitleHtml) {

				// Retrieve single menu item snippet 
				$ajaxUtils.sendGetRequest(menuItemHtml, 
					function (menuItemHtml) {
						var menuItemsViewHtml =
						  buildMenuItemsViewHtml(categoryMenuItems,
						  						 menuTitleHtml,
						  						 menuItemHtml);
						  insertHtml("#main-content", menuItemsViewHtml);
					},
					false);
			},
			false);
	}


	// using category and menu items data and snippets html,
	// build menu items view html to be inserted into page
	// data/categories/L.json =categoryMenuItems
	function buildMenuItemsViewHtml(categoryMenuItems,
									menuTitleHtml,
									menuItemHtml) {
		menuTitleHtml = insertProperty(menuTitleHtml,"name", categoryMenuItems.category.name);
		var finalHtml = menuTitleHtml;
		finalHtml += "<section class='row'>";

		// Loop over menu items
		var menuItems = categoryMenuItems.menu_items;
		var catShortName = categoryMenuItems.category.short_name;
		
		for (var i =0; i < menuItems.length; i++) {
			
			// Insert menu items
			var html = menuItemHtml;
			html = insertProperty(html, "short_name", menuItems[i].short_name);
			html = insertProperty(html, "catShortName", catShortName);
			html = insertProperty(html, "name", menuItems[i].name);
			html = insertProperty(html, "description", menuItems[i].description);

			if (i % 2 != 0) {
				html += 
				"<div class='clearfix visible-lg-block clearfix visible-md-block'></div>";
			}
			finalHtml += html;
		}

		finalHtml += "</section>";
		return finalHtml;
	}


	global.$ka = ka;
})(window);