//Global variables
const express = require('express'); // Require Express to run server and routes
const bodyParser = require('body-parser'); /*Will help communication with the server*/
const cors = require('cors'); // Setup of Cors as requested
const data = []; //this is used for the post route response
let projectData = {}; /* Setup empty JS object to act as endpoint for all routes*/
// End of global variables

//Main section
const app = express(); // This will initialize the app
app.use(bodyParser.urlencoded({ extended: false })); /*setting the app to use body-parser*/
app.use(bodyParser.json()); /* The middleware bodyparser is configured*/
app.use(cors()); //setting the app to use cors
// This will make the folder accessible to the server
app.use(express.static('website'));

const serverSetup = app.listen(8080, function portListening() {
    console.log(`Server is running at 8080`);
}); /*setup of the server, this works because of the method listen*/

// For the post route 
app.post('/api', apiInfo);
//The values for Date, Time and the Content will be displayed dynamically
function apiInfo(req, res) {
  projectData['date'] = req.body.date;
  projectData['temp'] = req.body.temp;
  projectData['content'] = req.body.content;
  res.send(projectData);
}

// This is a callback function directed to completely get the '/resultPage'.
app.get('/resultPage', function getApiInfo(req, res) {
    res.send(projectData);
  });

/* I documented everything that I did right from the start to the end*/

// References
//https://developer.mozilla.org
//https://dev.to/gbudjeakp/how-to-connect-your-client-side-to-your-server-side-using-node-and-express-2i71
//https://www.freecodecamp.org/news/javascript-async-await-tutorial-learn-callbacks-promises-async-await-by-making-icecream/
//nodemon: I like using nodemon because there is no need to restart the server



