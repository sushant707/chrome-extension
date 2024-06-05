// Log a message indicating that the content script is loaded
console.log('Content script loaded.');

// Listen for messages from the background script
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  // Extract like and comment counts from the request
  const { likeCount, commentCount } = request;
  console.log('Received message:', request);

  // Initialize variables to track remaining likes and comments
  let likesRemaining = likeCount;
  let commentsRemaining = commentCount;

  // Define a generic comment to be used
  const genericComment = 'CFBR';

  // Function to wait for elements to be present in the DOM
  function waitForElements(selector, callback, maxRetries = 10, interval = 1000) {
    let retries = 0;
    const intervalId = setInterval(() => {
      const elements = document.querySelectorAll(selector);
      if (elements.length) {
        clearInterval(intervalId);
        callback(elements);
      } else if (retries >= maxRetries) {
        clearInterval(intervalId);
        console.error(`Elements not found: ${selector}`);
      } else {
        retries++;
        console.log(`Retry ${retries}: Waiting for elements: ${selector}`);
      }
    }, interval);
  }

  // Function to like posts
  function likePosts() {
    console.log('Attempting to like posts...');
    waitForElements('button[aria-label="React Like"]', (buttons) => {
      buttons.forEach((button) => {
        if (likesRemaining > 0) {
          console.log('Liking post:', button);
          button.click();
          likesRemaining--;
        }
      });
      console.log(`Remaining likes: ${likesRemaining}`);
      setTimeout(commentOnPosts, 1000); // Delay before starting to comment
    });
  }

  // Function to comment on posts
  function commentOnPosts() {
    console.log('Attempting to comment on posts...');
    waitForElements('button[aria-label="Comment"]', (buttons) => {
      buttons.forEach((button) => {
        if (commentsRemaining > 0) {
          console.log('Commenting on post:', button);
          button.click();
          setTimeout(() => {
            // Wait for the comment box to be available
            waitForElements('.ql-editor[contenteditable="true"]', (commentBoxes) => {
              if (commentBoxes.length > 0) {
                const commentBox = commentBoxes[0];
                // Type the generic comment in the comment box
                commentBox.innerHTML = genericComment;
                commentBox.dispatchEvent(new Event('input', { bubbles: true }));
                console.log(`Commented with: ${genericComment}`);

                setTimeout(() => {
                  // Wait for the submit button and click it
                  waitForElements('button.comments-comment-box__submit-button', (submitButtons) => {
                    if (submitButtons.length > 0) {
                      const submitButton = submitButtons[0];
                      submitButton.click();
                      commentsRemaining--;
                      console.log(`Remaining comments: ${commentsRemaining}`);
                    } else {
                      console.error('Submit button not found.');
                    }
                  });
                }, 500); // Add a delay before clicking the submit button

              } else {
                console.error('Comment box not found.');
              }
            });
          }, 1000); // Add a delay before typing in the comment box
        }
      });
    });
  }

  // Check if the DOM content is still loading
  if (document.readyState === 'loading') {
    // Wait for DOM content to be fully loaded before executing
    document.addEventListener('DOMContentLoaded', () => {
      likePosts(); // Start liking posts
    });
  } else {
    likePosts(); // Start liking posts
  }

  // Send a response to the background script
  sendResponse({ status: 'Actions started' });
});
