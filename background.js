// Log message to indicate script execution
console.log('in background js ............');

// Listen for messages from the popup or content scripts
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  // Extract likeCount and commentCount from the request
  const { likeCount, commentCount } = request;

  // Log the received counts for debugging
  console.log('Received counts:', likeCount, commentCount);

  // Create a new tab with the LinkedIn feed URL
  chrome.tabs.create({ url: 'https://www.linkedin.com/feed/' }, (tab) => {
    // Log the details of the created tab
    console.log('Creating tab:', tab);

    // Add a listener for tab updates
    chrome.tabs.onUpdated.addListener(function listener(tabId, changeInfo, tab) {
      // Check if the update is for the created tab and it's fully loaded
      if (tabId === tab.id && changeInfo.status === 'complete') {
        // Log a message indicating tab loading completion
        console.log('Tab loading complete.');

        // Inject the content script into the tab
        chrome.scripting.executeScript({
          target: { tabId: tab.id },
          files: ['linkedinScript.js']
        }, () => {
          // Check for script injection errors
          if (chrome.runtime.lastError) {
            console.error('Script injection error:', chrome.runtime.lastError.message);
          } else {
            // Log a message if script is injected successfully
            console.log('Script injected.');

            // Ensure the script is injected before sending the message
            setTimeout(() => {
              // Send a message to the content script with likeCount and commentCount
              chrome.tabs.sendMessage(tab.id, { likeCount, commentCount }, (response) => {
                // Handle errors in message sending
                if (chrome.runtime.lastError) {
                  console.error('Message sending error:', chrome.runtime.lastError.message);
                } else {
                  // Log message sent successfully
                  console.log('Message sent:', response);
                }
              });
            }, 1000); // Add a delay to ensure the script is ready
          }
        });

        // Remove the listener once the script is injected
        chrome.tabs.onUpdated.removeListener(listener);
      }
      // Log if the tab is not ready or it's a different tab
      console.log('Tab not ready or different tab.');
    });
  });
});
