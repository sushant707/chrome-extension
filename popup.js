// Wait for the DOM content to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Get references to the input fields and start button
    const likeCountInput = document.getElementById('likeCount');
    const commentCountInput = document.getElementById('commentCount');
    const startButton = document.getElementById('startButton');

    // Function to update the state of the start button based on input values
    function updateButtonState() {
        if (likeCountInput.value && commentCountInput.value) {
            startButton.disabled = false; // Enable the button if both inputs have values
        } else {
            startButton.disabled = true; // Disable the button if any input is empty
        }
    }

    // Add event listeners to input fields to trigger button state update
    likeCountInput.addEventListener('input', updateButtonState);
    commentCountInput.addEventListener('input', updateButtonState);

    // Add click event listener to the start button
    startButton.addEventListener('click', function() {
        // Extract like and comment counts from input fields
        const likeCount = parseInt(likeCountInput.value);
        const commentCount = parseInt(commentCountInput.value);

        // Send a message to the background script with like and comment counts
        chrome.runtime.sendMessage({ likeCount, commentCount });
    });
});
