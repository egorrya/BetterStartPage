// Fade in on load
window.onload = () => {
  document.body.style.opacity = "1";
};

// Wait till page is loaded
document.addEventListener("DOMContentLoaded", () => {
  // Get Chrome bookmarks tree
  chrome.bookmarks.getTree((itemTree) => {
    let dom = {
      html: "",
    };

    itemTree[0].children[0].children.forEach((child) => {
      ProcessBookmarkNode(child, dom);
    });

    bookmarks.innerHTML = dom.html;
  });

  // Draw the DOM tree
  const ProcessBookmarkNode = (node, dom) => {
    // Drawing folders
    if (node.children) {
      dom.html += `
      <div class="folder">
          <div class="folder-apps" tabindex="0">`;
      node.children.forEach((child) => {
        ProcessBookmarkNode(child, dom);
      });
      dom.html += `
          </div>
          <div class="bg-blur"></div>
          <div class="folder-name">${ShortenString(node.title, 14)}</div>
        </div>`;
    }

    // Drawing app icon
    // <img src="chrome://favicon/${node.url}"/>
    if (node.url) {
      dom.html += ` <a class="app" href="${node.url}">
                      <div class="app-icon"></div>
                      <div class="app-name">${ShortenString(
                        node.title,
                        14
                      )}</div>
                    </a>`;
    }
  };

  // This function makes string shorter
  const ShortenString = (str, length) => {
    return str.length > length ? str.substr(0, length - 3) + "..." : str;
  };

  // Change theme
  const themeToggleButton = document.getElementById("theme-toggle");

  themeToggleButton.addEventListener("click", () => {
    document.body.classList.toggle("dark");
    localStorage.setItem(
      "theme",
      document.body.classList.contains("dark") ? "dark" : "light"
    );
  });

  // Save user's theme to localStorage
  if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark");
  }
});
