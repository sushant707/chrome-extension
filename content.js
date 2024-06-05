// Function to extract profile data from the LinkedIn profile page
const extractProfileData = () => {
  // Extract name from the profile title section, default to empty string if not found
  const name = document.querySelector('.top-card-layout__title')?.innerText || '';
  
  // Extract location from the profile subline section, default to empty string if not found
  const location = document.querySelector('.top-card__subline-item')?.innerText || '';
  
  // Extract about information from the profile content section, default to empty string if not found
  const about = document.querySelector('.core-section-container__content')?.innerText || '';
  
  // Extract bio from the profile headline section, default to empty string if not found
  const bio = document.querySelector('.top-card__headline')?.innerText || '';
  
  // Extract follower count from the follower count section, default to 0 if not found
  const followerCount = parseInt(document.querySelector('.follower-count')?.innerText.replace(/\D/g, '') || '0');
  
  // Extract connection count from the connection count section, default to 0 if not found
  const connectionCount = parseInt(document.querySelector('.connection-count')?.innerText.replace(/\D/g, '') || '0');

  // Return an object containing the extracted profile data
  return { name, location, about, bio, followerCount, connectionCount };
};
