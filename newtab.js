window.onload = () => {
  // Fade in on load
  document.body.style.opacity = "1";

  // Change theme
  changeTheme();

  // Save user's theme to localStorage
  if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark");
  }

  // Get Chrome bookmarks tree
  chrome.bookmarks.getTree((itemTree) => {
    let dom = {
      html: "",
    };

    itemTree[0].children[0].children.forEach((child) => {
      ProcessBookmarkNode(child, dom);
    });

    const bookmarks = document.getElementById("bookmarks");
    bookmarks.insertAdjacentHTML("afterbegin", dom.html);
    folderAnimation();
  });
};

// This function makes string shorter
const ShortenString = (str, length) => {
  return str.length > length ? str.substr(0, length - 3) + "..." : str;
};

// This function makes string shorter
const FirstLetter = (str) => {
  if (str[0]) {
    return str[0];
  } else {
    return "";
  }
};

const ProcessBookmarkNode = (node, dom) => {
  // Writing folder
  if (node.children) {
    dom.html += `
      <div class="folder">
        <div class="folder-apps">`;
    node.children.forEach((child) => {
      ProcessBookmarkNode(child, dom);
    });
    dom.html += `
        </div>
        <div class="folder-name">${ShortenString(node.title, 18)}</div>
        <div class="x-touch">Close</div>
        <div class="bg-blur"></div>
      </div>`;
  }

  // Writing app icon
  if (node.url) {
    dom.html += ` <a class="app" href="${node.url}">
                        <div class="app-icon">
                        <img class="app-icon-img" src="chrome://favicon/${
                          node.url
                        }"/>
                        <div class="app-icon-letter">${FirstLetter(
                          node.title
                        )}</div>
                        </div>
                        <div class="app-name">${ShortenString(
                          node.title,
                          18
                        )}</div>
                      </a>`;
  }
};

// Animation of open/close
const folderAnimation = () => {
  const folderApps = document.querySelectorAll(".folder-apps");
  const xTouch = document.querySelectorAll(".x-touch");

  // open
  folderApps.forEach((el) => {
    el.addEventListener("click", () => {
      el.classList.toggle("expand");
    });
  });

  // close
  xTouch.forEach((el) => {
    el.addEventListener("click", () => {
      for (let item of folderApps) {
        item.classList.remove("expand");
      }
    });
  });
};

// dark theme
const changeTheme = () => {
  const themeToggleButton = document.getElementById("theme-toggle");
  themeToggleButton.addEventListener("click", () => {
    document.body.classList.toggle("dark");
    localStorage.setItem(
      "theme",
      document.body.classList.contains("dark") ? "dark" : "light"
    );
  });
};
