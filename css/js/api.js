
const API_KEY = "AIzaSyCMQKnwMDWK0Cq9waA58elTYu-PmTLwdBU";
const CHANNEL_ID = "UC-cFscwYAV2uyVY4pGoLJvw"; // Vidto Studio channel ID

const BASE_URL = "https://www.googleapis.com/youtube/v3";

/**
 * Fetch videos from channel
 * @param {number} maxResults
 * @returns {Promise<Array>} Video items
 */
async function fetchVideos(maxResults = 10) {
  const url = `${BASE_URL}/search?key=${API_KEY}&channelId=${CHANNEL_ID}&part=snippet,id&order=date&maxResults=${maxResults}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    return data.items.filter(item => item.id.kind === "youtube#video");
  } catch (err) {
    console.error("Failed to fetch videos", err);
    return [];
  }
