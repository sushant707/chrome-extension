document.getElementById('getTitleButton').addEventListener('click', () => {
    // Get the current tab
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        const currentTab = tabs[0];
        const titleDisplay = document.getElementById('titleDisplay');
        titleDisplay.textContent = currentTab.title;
    });
});
