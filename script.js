// Function to navigate to a section when a card is clicked
function navigateToSection(sectionId) {
    document.querySelector(sectionId).scrollIntoView({
        behavior: 'smooth'
    });
}

const leftPlane = document.querySelector('.plane-image.left');
const rightPlane = document.querySelector('.plane-image.right');

// Function to detect when a section is in view
function checkSectionInView() {
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        const rect = section.getBoundingClientRect();
        if (rect.top <= window.innerHeight && rect.bottom >= 0) {
            // Trigger plane animation when section is in view
            leftPlane.style.animation = 'planeMove 8s ease-out forwards';
            rightPlane.style.animation = 'planeMove 8s ease-out forwards';
        }
    });
}

// Function to reset the plane animation when clicked
function resetPlaneAnimation(plane) {
    plane.style.animation = 'none';  // Remove current animation
    plane.classList.add('fade');     // Apply fade effect

    // After fade-out, reset the plane to bottom with opacity and transparency
    setTimeout(() => {
        plane.classList.remove('fade');
        plane.style.bottom = '10px';  // Reset position to the bottom
        plane.style.opacity = '1';    // Reset opacity
        plane.style.transition = 'none'; // Disable transition to immediately reset
        setTimeout(() => {
            plane.style.transition = 'transform 10s ease-out forwards'; // Re-enable transitions
            plane.style.animation = 'planeMove 10s ease-out forwards'; // Trigger animation from bottom to top
        }, 10);
    }, 1000); // Duration to wait for the fade effect to finish
}

// Function to restart the animation when clicked (move from bottom to top)
function restartPlaneAnimation(plane) {
    plane.style.animation = 'none';  // Remove any ongoing animation
    plane.offsetHeight; // Force reflow to restart animation
    plane.style.animation = 'planeMove 10s ease-out forwards'; // Trigger the animation to start from bottom to top
}

// Event listeners for planes on click
leftPlane.addEventListener('click', () => restartPlaneAnimation(leftPlane));
rightPlane.addEventListener('click', () => restartPlaneAnimation(rightPlane));

// Trigger animation when page loads to move planes from bottom to top very slowly
window.addEventListener('load', () => {
    leftPlane.style.animation = 'planeMove 10s ease-out forwards'; // Slower animation on load
    rightPlane.style.animation = 'planeMove 10s ease-out forwards'; // Slower animation on load
});

// Event listeners for scrolling to check if section is in view
window.addEventListener('scroll', checkSectionInView);

