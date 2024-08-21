import {
    createCircles
} from './moving-dots.js';

const loadingIndicator = document.querySelector('#loader-container');
const content = document.querySelector('#content');
const body = document.querySelector('body');

if (!content) {
    console.error('Content not found');
} else {
    fetch('http://localhost:3000/dataApiAssigment') // Fetch data from the server
        .then(response => response.json())
        .then(data => {
            const container = document.querySelector('.container-challenge');

            // STYLES
            // Toggle visibility of loading indicator and content
            content.style.display = 'none';
            loadingIndicator.style.display = 'flex';

            // change height of body to 100%
            body.style.height = '100%';

            // variables for dots
            let numberOfCircles = 5;
            createCircles(numberOfCircles);

            // Remove duplixates from the data
            const uniqueChallenges = data.filter((challenge, index, self) =>
                index === self.findIndex((t) => (
                    t.message === challenge.message
                ))
            );

            if (uniqueChallenges === null || uniqueChallenges.length === 0) {
                loadingIndicator.style.display = 'block';
                content.style.display = 'none'; // Verberg content als er geen data is
            } else {
                loadingIndicator.style.display = 'none'; // Verberg de loader
                content.style.display = 'block'; // Toon de content

                console.log('All the unique messages are', uniqueChallenges);

                const html = uniqueChallenges.map(challenge => {
                    return `
                    <div class="challenge">
                        <p>${challenge.message}</p>
                        ${challenge.flag ? `<p class="flag">${challenge.flag}</p>` : ''}
                    </div>
                `;
                }).join('');

                container.innerHTML = html;
            }
        })
        .catch(error => {
            console.error('Error fetching data:', error);
            loadingIndicator.style.display = 'none'; // Verberg de loader bij een fout
        });
}