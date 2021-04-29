const express = require('express');

const PORT = process.env.PORT || 3001;
const app = express();

// Express middleware
// dont look so deeply
app.use(express.urlencoded( {extended: false }));
// youre getting json-ed
app.use(express.json());


// Default response for any other request (Not Found)
// PLACEMENT IS IMPORTANT!! IF IT IS ABOVE ANY GET ROUTES, IT WILL OVERRIDE THE ONES BELOW IT!!!
app.use((req, res) => {
    res.status(404).end();
});


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});