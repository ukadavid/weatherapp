/* Start of Global Variables */
const entryHolder = document.querySelector('#entryHolder');
const zip = document.getElementById('zip');
const date = document.getElementById('date');
const temp = document.getElementById('temp');
const form_content = document.querySelector('.form');
// I used Constent so that it will be different from the Content that is limited by function scope
const constent = document.getElementById('content');
const submit = document.getElementById('generate');
const baseUrl = 'http://api.openweathermap.org/data/2.5/weather?zip='; //The baseurl that will fetch APi
const apiKey = '&appid=e56276a89c7b633c5f55178d4b1361bc&units=imperial'; /*The API key that will enable us to fetch the weather API, Without it, there will be a 404 error */
let d = new Date();
let newDate = d.toDateString(); // I used the date method here to get the date
//End of Global Variables


// Event listener to add function to existing HTML DOM element
submit.addEventListener('click', executeAction);

/* The executeAction function calling the eventlistener so that it can get the API */
function executeAction(e) {
    // To stop the submit button from doing its default operation
  e.preventDefault();
  // get user input values
  const newZip = zip.value;
//  Wanted to declare this as a global variable but I received an uncaught (in promise) TypeError: Failed to fetch
// It would be better I leave it like this, and get the solution later.
  const content = document.getElementById('feelings').value;

//   The getWeatherAPI will combine the different variables to get the API
  getWeatherAPI(baseUrl, newZip, apiKey)
    .then(function (userData) {
      // api data to POST request
      postData('/api', { date: newDate, temp: userData.main.temp, content })
    }).then(function (newData) {
      // The function call of updateInterface to dynamically update the interface
      updateInterface()
    })

    
  // This will readjust the form
  form_content.reset();
}

/* Function to GET Web API Data*/
const getWeatherAPI = async (baseUrl, newZip, apiKey) => {
  // res will equal the result of await fetch function, the await will enable us get data in real
  const res = await fetch(baseUrl + newZip + apiKey);
  try {
    // This will transform into JSON whereby the userData will equal the result of fetched function
    const userData = await res.json();
    return userData;
  } catch (error) {
    //always remember to catch the error
    console.log("error", error);
  }
}

/* Function expression coupled with arrow function will help  to POST data */
const postData = async (url = '', data = {}) => {
  const req = await fetch(url, {
    method: "POST",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json;charset=UTF-8"
    },
    body: JSON.stringify({
      date: data.date,
      temp: data.temp,
      content: data.content
    })
  })

  try {
    const newData = await req.json();
    return newData;
  }
  catch (error) {
    console.log(error);
    //always remember to catch the error
  }
};

/* This will update the UI dynamically */
const updateInterface = async () => {
  const request = await fetch('/resultPage');
  try {
     // This will transform into JSON
    const allData = await request.json()
    // update new entry values
    date.innerHTML = allData.date;
    temp.innerHTML = allData.temp;
    constent.innerHTML = allData.content;
  }
  catch (error) {
    console.log("error", error);
     // This will appropriately handle the error
  }
};


// References
//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toDateString
