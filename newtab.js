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
    if (node.children) {
      dom.html += `<li class="bookmarks__folder">
        <label class="bookmarks__folder--icon">
          <input type="checkbox"/>
          <span></span>
        </label>
        <h2>${node.title}</h2>
        <ul class="bookmarks__folder__inner" >`;
      node.children.forEach((child) => {
        ProcessBookmarkNode(child, dom);
      });
      dom.html += `</ul></li>`;
    }

    if (node.url) {
      dom.html += `<li class="bookmarks__book">
                    <a href="${node.url}">
                    <img src="chrome://favicon/${node.url}"/>
                    ${ShortenString(node.title, 20)} 
                    </a>
                  </li>`;
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
