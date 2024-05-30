document.getElementById('start').addEventListener('click', () => {
    chrome.storage.local.get('profileLinks', (data) => {
      chrome.runtime.sendMessage({ action: 'openLinks', links: data.profileLinks }, (response) => {
        console.log(response.status);
      });
    });
  });1
  
  document.getElementById('save').addEventListener('click', () => {
    const links = document.getElementById('links').value.split('\n');
    chrome.storage.local.set({ profileLinks: links }, () => {
      console.log('Links saved');
    });
  });
  