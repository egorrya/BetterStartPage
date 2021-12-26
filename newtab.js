(function () {
  // add text if there's nothing
  document.querySelector(".apps__text").textContent =
    "Open Bookmark Manager in your browser to add your first bookmark.";

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

    if (dom.html) {
      document.querySelector(".apps__text").remove();
    }

    folderAnimation();
  });
})();

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
        
        <div class="bg-blur"></div>
      </div>`;
  }

  // Writing app icon
  if (node.url) {
    dom.html += ` <a class="app" href="${node.url}">
                    <div class="app-icon">
                      <div class="app-icon-letter">${FirstLetter(
                        node.title
                      )}</div>
                    </div>
                    <div class="app-name">${ShortenString(node.title, 18)}</div>
                  </a>`;
  }
};

// Animation of open/close
const folderAnimation = () => {
  const folderApps = document.querySelectorAll(".folder-apps");
  const bgBlur = document.querySelectorAll(".bg-blur");

  // open
  folderApps.forEach((el) => {
    el.addEventListener("click", () => {
      // adding .expand class
      el.classList.toggle("expand");

      topFunction();
      disableScroll();
    });
  });

  // close
  bgBlur.forEach((el) => {
    el.addEventListener("click", () => {
      for (let item of folderApps) {
        item.classList.remove("expand");

        enableScroll();
      }
    });
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

// back to top
const topFunction = () => {
  document.body.scrollTop = 0; // For Safari
  document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
};

// disable scroll
const disableScroll = () => {
  document.body.classList.add("stop-scrolling");
};

const enableScroll = () => {
  document.body.classList.remove("stop-scrolling");
};
