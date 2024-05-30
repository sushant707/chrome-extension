const extractProfileData = () => {
  const name = document.querySelector('.top-card-layout__title').innerText;
  const location = document.querySelector('.top-card__subline-item').innerText;
  const about = document.querySelector('.core-section-container__content').innerText;
  const bio = document.querySelector('.top-card__headline').innerText;
  const followerCount = parseInt(document.querySelector('.follower-count').innerText.replace(/\D/g, ''));
  const connectionCount = parseInt(document.querySelector('.connection-count').innerText.replace(/\D/g, ''));

  return { name, location, about, bio, followerCount, connectionCount };
};

const postData = async (data) => {
  const response = await fetch('http://localhost:3000/profiles', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });
  return response.json();
};

const data = extractProfileData();
postData(data).then(response => {
  console.log('Profile data posted:', response);
  // Close the tab after posting
  chrome.runtime.sendMessage({ action: 'closeTab' });
});
