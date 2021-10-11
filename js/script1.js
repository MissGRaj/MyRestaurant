

// (function(window){
// 	var erinGreeter = {};
// 	erinGreeter.name = " Erin Chou";
// 	var greeting = "Hurray";
// 	erinGreeter.sayHi = function () {
// 		console.log(greeting + erinGreeter.name);
// 	}

// 	window.erinGreeter = erinGreeter;
// })(window);


                                     // //scrip2.js    **code**

// ishGreeter.sayHello();
// erinGreeter.sayHi();

                                   
                                  

                                    // //script.js   ****code****

                               // //Immediately invoked function expression (IIFE)
// (function (name) {
// 	console.log("hi!! " + name);
// })("Athul");

// (function(window) {
// 	var ishGreeter = {};
// 	ishGreeter.name = " Ishita";
// 	var greeting = "Namaste";
// 	ishGreeter.sayHello = function () {
// 	console.log(greeting + ishGreeter.name);
// 	}

// 	window.ishGreeter = ishGreeter;
// })(window);

                                                    
                                                

                                                    // // Event Handling

// document.addEventListener("DOMContentLoaded",
// 	function (event) {
// 		function sayHello() {
// 			console.log(event);

// 	var name = document.getElementById("name").value;
// 	var msg = "<h2>Hello " + name + "</h2>";

// 	// document.getElementById("content").textContent =  msg;
// 	document.getElementById("content").innerHTML =  msg;

// 	if (name === "student") {
// 		var x = document.getElementById("title").value;
// 		var x = document.querySelector("#title").textContent;  // css selector
// 		var x = document.querySelector("h1").textContent;      // first H1
// 		document.getElementById("title").innerHTML = x + " Student's Page";
// 	}
// 	this.textContent = "Hurray";
// }

// // onclick alternative in html button

// document.querySelector("button").addEventListener("click", sayHello);
// // document.querySelector("button").onclick = sayHello;

// document.querySelector("html").addEventListener("mousemove",
// 	function (event) {
// 		if (event.shiftKey === true) {
// 			console.log(event.clientX);
// 			console.log(event.clientY);
// 		}
// 		// console.log("demm "+event.clientX);
// 		// 	console.log(event.clientY);
		
// 	}
// 	);

// 	}
// 	);

                              


                              // // Ajax original code from coursers

// (function(global){

// 	// set up a namespace for our utility
// 	var ajaxUtils = {};

// 	// Returns an HTTP request object
// 	function getRequestObject() {
// 		if (window.XMLHttpRequest) {
// 			return (new XMLHttpRequest());
// 		}
// 		else{
// 			global.alert("Ajax is not supported!");
// 			return (null);
// 		}
// 	}

// 	// Makes an Ajax GET request to 'requestUrl'
// 	ajaxUtils.sendGetRequest = function (requestUrl, responseHandler) {
// 		var request = getRequestObject();
// 		request.onreadystatechange = function () {
// 			handleResponse(request, responseHandler);
// 		};
// 		request.open("GET", requestUrl, true);    //true is for asynchonous, fasle- block the browser until response processed
// 		request.send(null); //send request to server using GET(e.g., send()) or POST(i.e., send(string)).
// 	}


// 	// Only calls user provided 'responseHandler' function
// 	// if response is ready and not an error
// 	function handleResponse(request, responseHandler) {
// 		if ((request.readyState == 4) && (request.status == 200)) {
// 			responseHandler(request);
// 		}
// 	}

// 	// Expose utility to the global object
// 	global.$ajaxUtils = ajaxUtils;

// })(window);







                    // // ******** script.js code for accessing json file from server **********


// // Event Handling
// document.addEventListener("DOMContentLoaded",
// 	function (event) {

// 		document.querySelector("button").addEventListener("click", function() {

// 			// call server to get the name
// 			$ajaxUtils.sendGetRequest("/data/name.json", 
// 				function (resObj) {
// 					var msg = resObj.firstName.f + " " + resObj.lastName + " ";
// 					if (resObj.likesChineseFood) {
// 						msg+= "likes Chinese Food ";
// 					}
// 					else {
// 						msg+= "Does'nt likes Chinese Food ";
// 					}

// 					msg+= " Time she spent on course is ";
// 					msg+= resObj.timeSpent + 2;


// 					document.getElementById("content").innerHTML = "<h3>" + msg + "</h3>";
// 				});

// 		});
// 	}
// 	)

                   

                    // // ****** corresponding ajax code for json file access *******

// (function(global){

// 	// set up a namespace for our utility
// 	var ajaxUtils = {};

// 	// Makes an Ajax GET request to 'requestUrl'
// 	ajaxUtils.sendGetRequest = function (requestUrl, responseHandler, isJsonResponse) {
// 		var request = new XMLHttpRequest();
// 		request.onreadystatechange = function () {

// 				if ((request.readyState == 4) && (request.status == 200)) {
					
// 					if(isJsonResponse == undefined) {
// 						isJsonResponse = true;
// 					}
// 					if (isJsonResponse) {
// 						responseHandler(JSON.parse(request.responseText));
// 					}
// 					else {
// 						responseHandler(request.responseText);
// 					}
// 			}
// 		};
// 		request.open("GET", requestUrl, true);    //true is for asynchonous, fasle- block the browser until response processed
// 		request.send(null); //send request to server using GET(e.g., send()) or POST(i.e., send(string)).
// 	}

// 	// Expose utility to the global object
// 	global.$ajaxUtils = ajaxUtils;

// })(window);
	
