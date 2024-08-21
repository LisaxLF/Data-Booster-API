const express = require('express');
require('dotenv').config();
const cors = require('cors');

const app = express();
const port = 3000;

// Middleware
app.use(express.static('../client'));
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST']
}));

// Route to handle the challenge API
app.get('/dataApiAssigment', async (req, res) => {
    try {
        let challengesArray = [];
        const url = 'https://flag-gilt.vercel.app/api/challenge';
        let options = {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${process.env.API_KEY}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({})
        };

        await fetchAllChallenges(url, options, challengesArray);
        res.json(challengesArray);

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred' });
    }
});

async function fetchAllChallenges(url, options, challengesArray) {
    try {
        let hasNextCursor = true;
        
        while (hasNextCursor) {
            let response = await fetch(url, options);
            let APIdata = await response.json();

            challengesArray.push(APIdata);

            let nextCursor = APIdata.nextCursor;
            hasNextCursor = nextCursor !== undefined;

            if (hasNextCursor) {
                options.body = JSON.stringify({ cursor: nextCursor });
            }
        }
    } catch (error) {
        console.error(error);
        throw error;
    }
}


// Start the server
app.listen(port, () => console.log(`Server running on http://localhost:${port}`));