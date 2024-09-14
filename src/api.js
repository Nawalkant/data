const API_KEY = 'YOUR_GOOGLE_PAGESPEED_API_KEY'; // Replace with your API key

const fetchPageSpeed = async (url) => {
  const mobile = `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${url}&strategy=mobile&key=${API_KEY}`;
  const desktop = `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${url}&strategy=desktop&key=${API_KEY}`;

  const mobileResponse = await fetch(mobile);
  const desktopResponse = await fetch(desktop);

  const mobileData = await mobileResponse.json();
  const desktopData = await desktopResponse.json();

  return {
    mobile: mobileData.lighthouseResult.categories.performance.score * 100,
    desktop: desktopData.lighthouseResult.categories.performance.score * 100
  };
};
