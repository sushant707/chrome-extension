chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'openLinks') {
      request.links.forEach((link, index) => {
        setTimeout(() => {
          chrome.tabs.create({ url: link });
        }, index * 5000);
      });
      sendResponse({ status: 'links opened' });
    } else if (request.action === 'closeTab') {
      chrome.tabs.remove(sender.tab.id);
    }
  });
  