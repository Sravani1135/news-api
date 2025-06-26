const API_KEY = "5789e5bec60e0671490afa546e50e539"; // Replace with your actual GNews API key

async function fetchNews(keyword = "") {
  const searchInput = document.getElementById("searchInput");

  const query = keyword || searchInput.value.trim() || "top";

  // ✅ Do NOT update the search input when using menu clicks
  if (!keyword) {
    searchInput.value = query;
  }
  const url = `https://gnews.io/api/v4/search?q=${encodeURIComponent(query)}&lang=en&max=10&apikey=${API_KEY}`;

  const newsContainer = document.getElementById("newsContainer");
  newsContainer.innerHTML = "<p>Loading...</p>";

  try {
    const res = await fetch(url);
    const data = await res.json();

    if (!data.articles || data.articles.length === 0) {
      newsContainer.innerHTML = "<p>No news found for your search.</p>";
      return;
    }

    const cardsHTML = data.articles
      .map(article => `
        <div class="news-card">
          ${article.image ? `<img src="${article.image}" alt="News image">` : ""}
          <h4>${article.title}</h4>
          <p>${article.description || "No description available."}</p>
          <a href="${article.url}" target="_blank">Read more</a>
        </div>
      `)
      .join("");

    newsContainer.innerHTML = cardsHTML;
  } catch (error) {
    console.error(error);
    newsContainer.innerHTML = `<p style="color:red;">Error fetching news: ${error.message}</p>`;
  }
}


// Load top headlines on first visit
window.addEventListener("DOMContentLoaded", fetchNews);
window.onload = () => {
  fetchNews("live"); // 👈 Show live news by default on page load
};
function toggleDarkMode() {
  document.body.classList.toggle("dark");
}
