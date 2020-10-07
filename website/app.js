/* Global Variables */
const baseURL = 'https://api.openweathermap.org/data/2.5/weather?zip='
const apiKey = '&APPID=d73946388d98ee33c464c625756851e2&units=imperial'
const zipCode = document.getElementById('zip').value;
//const zipCode = '07310';

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();


	const getZipDemo = async (baseURL, zipCode, apiKey) => {
		// const getZipDemo = async (apiURL, zip, key) => {  - "Trial and Error"
		// const res = await fetch (baseURL + zipCode + '&APPID=' + apiKey); - "Trying out different scenarios"
		// const res = await fetch (baseURL, zipCode, apiKey); - "My mistake"
		const res = await fetch (baseURL + zipCode + apiKey);
		// console.log(res)
		try {
			const data = await res.json();
			return data;
		}
		catch (error){
			console.log("ERROROROR :", error);
		};
	};


	// Chaining Promise
	document.getElementById('generate').addEventListener('click', bringAction);

	/* Function called by event listener */
	function bringAction(event) {
	    const zipCode = document.getElementById('zip').value;
	    const userResponse = document.getElementById('feelings').value;


	    getZipDemo(baseURL, zipCode, apiKey)
	    .then(function(data) {
	  	console.log(data) 
	    	    // This console.log is NOW working that means data is being received here
	  	postData('/add', {temp: data.main.temp, date: newDate, userResponse: userResponse});
	    })

	    .then(function(data){
	    updateUI()
	    });
	};

		const postData = async (url = '', data  = {}) =>{
			const response  = await fetch(url, {
				method: "POST",
			    credentials: "same-origin",
			    headers: {
			      'Content-Type': 'application/json',
			      // 'Accept': 'application/json'
			    },
			    body: JSON.stringify(data),
			});
			try {
				const newData = await response.json();
				console.log(newData);
				return newData;
			}
			catch (error) {
				console.log("error", error);
			};
		};

 // Chain another Promise that updates the UI dynamically
		const updateUI = async () => {
		  const request = await fetch('/all');
		  try{
		  	const allData = await request.json();
		  	console.log(allData)
		  	document.getElementById('temp').innerHTML = allData.temp;
		    document.getElementById('date').innerHTML = allData.date;
		    document.getElementById('content').innerHTML = allData.userResponse;
		    }
		    catch(error){
		    console.log("error", error);
		  };
		};