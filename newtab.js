const ready = (callback) => {
  if (document.readyState != "loading") callback();
  else document.addEventListener("DOMContentLoaded", callback);
};

ready(() => {
  chrome.bookmarks.getTree((itemTree) => {
    let dom = {
      html: "",
    };

    itemTree[0].children[0].children.forEach((child) => {
      ProcessBookmarkNode(child, dom);
    });

    document.getElementById("bookmarks").innerHTML = dom.html;
  });
});

const ProcessBookmarkNode = (node, dom) => {
  if (node.children) {
    dom.html +=
      '<li class="bookmarks__folder"><label class="bookmarks__folder--icon"><input type="checkbox"/><span></span></label><h2>' +
      node.title +
      "</h2><ul>";

    node.children.forEach((child) => {
      ProcessBookmarkNode(child, dom);
    });
    dom.html += "</ul></li>";
  }

  if (node.url) {
    dom.html +=
      '<li class="bookmarks__book"><a href="' +
      node.url +
      '"><img src="chrome://favicon/' +
      node.url +
      '" />' +
      ShortenString(node.title, 30) +
      "</a></li>";
  }
};

const ShortenString = (str, length) => {
  return str.length > length ? str.substr(0, length - 3) + "..." : str;
};
