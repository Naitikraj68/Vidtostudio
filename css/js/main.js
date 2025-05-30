// js/main.js

document.addEventListener("DOMContentLoaded", async () => {
  const userForm = document.getElementById("user-form");
  const username = localStorage.getItem("vidtoUser");

  if (!username) {
    userForm.style.display = "block";
  } else {
    userForm.style.display = "none";
    loadContent();
  }
});

function saveUser() {
  const name = document.getElementById("username").value;
  if (name.trim()) {
    localStorage.setItem("vidtoUser", name);
    document.getElementById("user-form").style.display = "none";
    loadContent();
  }
}

async function loadContent() {
  const videos = await fetchVideos(20);
  if (!videos.length) return;

  // Split into categories
  const longVideos = videos.filter(v => !v.snippet.title.toLowerCase().includes("shorts"));
  const shorts = videos.filter(v => v.snippet.title.toLowerCase().includes("shorts"));

  // Latest video
  const latest = videos[0];
  renderVideo(latest, "latest-video-container");

  // Longs
  longVideos.slice(0, 5).forEach(video => renderVideo(video, "long-videos"));
  longVideos.forEach(video => renderVideo(video, "all-long"));

  // Shorts
  shorts.slice(0, 5).forEach(video => renderVideo(video, "short-videos"));
  shorts.forEach(video => renderVideo(video, "all-shorts"));
}

function renderVideo(video, containerId) {
  const container = document.getElementById(containerId);
  const videoId = video.id.videoId;
  const title = video.snippet.title;

  const card = document.createElement("div");
  card.className = "video-card";

  card.innerHTML = `
    <iframe src="https://www.youtube.com/embed/${videoId}" allowfullscreen></iframe>
    <div style="padding: 10px;">
      <p style="font-size: 14px;">${title}</p>
    </div>
  `;

  container.appendChild(card);
}
