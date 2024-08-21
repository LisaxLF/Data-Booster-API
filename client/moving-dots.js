// variables
let numberOfCircles = 3;

// Function to create circles with a specified amount
export function createCircles(numberOfCircles) {
    const container = document.querySelector('.moving-circles-bg');
    if (!container) {
        console.error('Container not found');
        return;
    }

    // Clear any existing circles
    container.innerHTML = '';

    // Creating the articles
    for (let i = 0; i < numberOfCircles; i++) {
        const circle = document.createElement('div');
        circle.classList.add('circle');
        container.appendChild(circle);

        // Add a random starting position
        const posX = `${Math.floor(Math.random() * 50)}%`;
        const posY = `${Math.floor(Math.random() * 100)}%`;

        // Add a random end position
        const endPosX = `${Math.floor(Math.random() * 50)}%`;
        const endPosY = `${Math.floor(Math.random() * 100)}%`;

        // Add a random size animation
        const size = Math.floor(Math.random() * 300) + 200;
        circle.style.width = `${size}px`;
        circle.style.height = `${size}px`;

        // Add a random blur
        const blur = Math.floor(Math.random() * 50) + 50;
        circle.style.filter = `blur(${blur}px)`;

        // Create a unique animation name
        const animationName = `move${i}`;

        // Create the keyframe animation
        const moveKeyframes = `
            @keyframes ${animationName} {
                0%, 100% {
                    left: ${posX};
                    top: ${posY};
                }
                50% {
                    left: ${endPosX};
                    top: ${endPosY};
                }
            }
        `;

        // Add the animation to the style tag
        const style = document.createElement('style');
        style.innerHTML = moveKeyframes;
        document.head.appendChild(style);

        // Add the animation to the circle
        circle.style.animation = `${animationName} 30s infinite linear`;
    }
}

createCircles(numberOfCircles);