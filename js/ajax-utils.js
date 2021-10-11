(function(global){

	// set up a namespace for our utility
	var ajaxUtils = {};

	// Makes an Ajax GET request to 'requestUrl'
	ajaxUtils.sendGetRequest = function (requestUrl, responseHandler, isJsonResponse) {
		var request = new XMLHttpRequest();
		request.onreadystatechange = function () {

				if ((request.readyState == 4) && (request.status == 200)) {
					
					if(isJsonResponse == undefined) {
						isJsonResponse = true;
					}
					if (isJsonResponse) {
						responseHandler(JSON.parse(request.responseText));
					}
					else {
						responseHandler(request.responseText);
					}
			}
		};
		request.open("GET", requestUrl, true);    //true is for asynchonous, fasle- block the browser until response processed
		request.send(null); //send request to server using GET(e.g., send()) or POST(i.e., send(string)).
	}

	// Expose utility to the global object
	global.$ajaxUtils = ajaxUtils;

})(window);