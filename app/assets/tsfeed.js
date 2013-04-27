var addFeedButton = document.getElementById("add-feed-button");
var feedUrlInput = document.getElementById("feed-url-input");
var feedsContainer = document.getElementById("feeds");

var loadedFeeds = [];

function getSpaceName() {

    var status = tiddlyweb.status;
    if(status.space) {
        return status.space.name;
    } else {
        return status.username;
    }
}

function getFeedsTiddlerUrl() {
    return "bags/" + getSpaceName() + "_public/tiddlers/tsfeeds";
}

function putTiddler(data, callback) {

    var request = new XMLHttpRequest();
    request.onreadystatechange = function () {
        if (request.readyState === 4 && request.status === 204) {
            if(callback) {
                callback();
            }
        }
    };
    request.open("PUT", getFeedsTiddlerUrl(), true);
    request.setRequestHeader("Content-type","application/json");
    request.send(JSON.stringify({ text: data, type: "text/plain" }));
}

function saveFeed(url) {

    loadedFeeds.push(url);
    var feeds = loadedFeeds.join("\n");
    putTiddler(feeds, function () {
        alert("added");
    });
}

function removeFeed() {
    var button = this;
    var url = button.getAttribute("data");

    var feeds = loadedFeeds.filter(function (element) {
        return (element !== url);
    });
    feeds = feeds.join("\n");
    putTiddler(feeds, function () {
        button.parentNode.parentNode.parentNode.removeChild(button.parentNode.parentNode);
    });
}

function createEntryItem(entry) {

    var entryItem = document.createElement("article");
    var entryHeader = document.createElement("header");
    var entryTitle = document.createElement("h1");
    var entryContent = document.createElement("p");
    var entryLink = document.createElement("a");
    var entryFooter = document.createElement("footer");
    var ul = document.createElement("ul");
    var entryAuthor = document.createElement("li");
    var entryDate = document.createElement("li");
    var entryTags = document.createElement("li");

    entryTitle.appendChild(document.createTextNode(entry.title));
    entryLink.setAttribute("href", entry.link);
    entryLink.setAttribute("target", "_blank");
    entryLink.appendChild(entryTitle);

    entryContent.appendChild(document.createTextNode(entry.contentSnippet));

    entryAuthor.appendChild(document.createTextNode("author: " + entry.author));
    entryDate.appendChild(document.createTextNode("published: " + entry.publishedDate));

    var tags = entry.categories.join(", ");
    entryTags.appendChild(document.createTextNode("tags: " + tags));

    ul.appendChild(entryAuthor);
    ul.appendChild(entryDate);
    ul.appendChild(entryTags);
    entryFooter.appendChild(ul);

    entryHeader.appendChild(entryLink);
    entryItem.setAttribute("class", "entry");
    entryItem.appendChild(entryHeader);
    entryItem.appendChild(entryContent);
    entryItem.appendChild(entryFooter);

    return entryItem;
}

function createFeed(title, entries, url) {

    var feedContainer = document.createElement("section");
    var feedHeader = document.createElement("header");
    var feedTitle = document.createElement("h1");
    var removeButton = document.createElement("button");

    feedContainer.setAttribute("class", "feed");
    feedTitle.appendChild(document.createTextNode(title));
    feedHeader.appendChild(feedTitle);
    removeButton.appendChild(document.createTextNode("X"));
    removeButton.setAttribute("class", "negative");
    removeButton.setAttribute("data", url);
    removeButton.addEventListener("click", removeFeed);
    feedHeader.appendChild(removeButton);
    feedContainer.appendChild(feedHeader);

    for (var i = 0; i < entries.length; i++) {
        feedContainer.appendChild(createEntryItem(entries[i]));
    }

    feedsContainer.appendChild(feedContainer);
}

function addFeed(feedUrl, save) {

    var feed  = new google.feeds.Feed(feedUrl);
    feed.setNumEntries(20);

    feed.load(function (result) {
        if(result.error) {
            alert(result.error.message);
        } else {
            createFeed(result.feed.title, result.feed.entries, result.feed.feedUrl);
            if(save) {
                saveFeed(result.feed.feedUrl);
            }
        }
    });
}

function loadFeeds() {
    var request = new XMLHttpRequest();
    request.onreadystatechange = function () {
        if(request.readyState === 4 && request.status === 200) {
            var feeds = request.responseText.split("\n");
            loadedFeeds = feeds;
            for(var i = 0; i < feeds.length; i++) {
                addFeed(feeds[i]);
            }
        }
    };
    request.open("GET", getFeedsTiddlerUrl(), true);
    request.send();
}

addFeedButton.setAttribute("class", "positive");
addFeedButton.addEventListener("click", function () {

    addFeed(feedUrlInput.value, true);
});

google.load("feeds", "1");
google.setOnLoadCallback(loadFeeds);