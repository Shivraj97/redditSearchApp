import reddit from "./redditapi";

const searchForm = document.getElementById("search-form");
const searchInput = document.getElementById("search-input");

// Form Event Listener
searchForm.addEventListener("submit", (e) => {
  // Get search term
  const searchTerm = searchInput.value;
  // Get sort
  const sortBy = document.querySelector('input[name="sortby"]:checked').value;
  // Get limit
  const searchLimit = document.getElementById("limit").value;
  e.preventDefault();

  // Check input
  if (searchTerm === "") {
    //show message
    showMessage("Please add a search term", "alert-danger");
  }

  // Clear input
  searchInput.value = "";

  // Search Reddit
  reddit.search(searchTerm, searchLimit, sortBy).then((results) => {
    console.log(results);

    let output = `<div class="card-columns">`;
    // Loop through posts
    results.forEach((post) => {
      // Check for image
      let image = post.preview
        ? post.preview.images[0].source.url
        : "https://blog.en.uptodown.com/files/2019/02/reddit-featured.jpg";
      output += `<div class="card">
        <img class="card-img-top" src="${image}" alt="Card image cap">
        <div class="card-body">
          <h5 class="card-title">${post.title}</h5>
          <p class="card-text">${truncateText(post.selftext, 100)}</p>
          <a href="${
            post.url
          }" target="_blank" class="btn btn-primary">Read More</a>
          <hr>
          <span class="badge badge-secondary">Subreddit: ${
            post.subreddit
          } </span>
          <span class="badge badge-dark">Subreddit: ${post.score} </span>
        </div>
      </div>`;
    });
    output += `</div>`;
    document.getElementById("results").innerHTML = output;
  });
});

// Show message
function showMessage(message, className) {
  // Create div
  const div = document.createElement("div");
  div.className = `alert ${className}`;
  // Add text
  div.appendChild(document.createTextNode(message));
  // Get parent
  const searchContainer = document.getElementById("search-container");
  // Get search
  const search = document.getElementById("search");
  // insert Message
  searchContainer.insertBefore(div, search);
  // Timeout alert
  setTimeout(() => {
    document.querySelector(".alert").remove();
  }, 3000);
}

// Truncate text
function truncateText(text, limit) {
  const shortened = text.indexOf(" ", limit);
  if (shortened == -1) return text;
  return text.substring(0, shortened);
}
