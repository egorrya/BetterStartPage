$(function()
{
	chrome.bookmarks.getTree(function(itemTree)
	{
		var dom = { html: '' };
		itemTree[0].children[0].children.forEach(function(child)
		{
			ProcessBookmarkNode(child, dom);
		});
		$('#bookmarks').html(dom.html);
	});
});

function ProcessBookmarkNode(node, dom)
{
	if (node.children)
	{
		dom.html += '<li><h2>' + node.title + '</h2><ul>';
		node.children.forEach(function(child)
		{
			ProcessBookmarkNode(child, dom);
		});
		dom.html += '</ul></li>';
	}
	if (node.url)
	{
		dom.html += '<li><a href="' + node.url + '" title="' + node.url + '"><img src="chrome://favicon/' + node.url + '" />' + ShortenString(node.title, 30) + '</a></li>';
	}
}

function ShortenString(str, length)
{
	return str.length > length ? str.substr(0, length - 3) + '...' : str;
}