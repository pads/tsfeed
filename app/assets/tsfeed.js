var addFeedButton = document.getElementById("add-feed-button");
var feedUrlInput = document.getElementById("feed-url-input");
var feedsContainer = document.getElementById("feeds");

google.load("feeds", "1");

addFeedButton.addEventListener("click", function () {

    addFeed(feedUrlInput.value);
});

function removeFeed() {
    this.parentNode.parentNode.parentNode.removeChild(this.parentNode.pare);
}

function addFeed(feedUrl) {

    var feed  = new google.feeds.Feed(feedUrl);
    feed.setNumEntries(20);

    feed.load(function (result) {
        if(result.error) {
            alert(result.error.message);
        } else {
            createFeed(result.feed.title, result.feed.entries);
        }
    });
}

function createFeed(title, entries) {

    var feedContainer = document.createElement("section");
    var feedHeader = document.createElement("header");
    var feedTitle = document.createElement("h1");
    var removeButton = document.createElement("button");

    feedContainer.setAttribute("class", "feed");
    feedTitle.appendChild(document.createTextNode(title));
    feedHeader.appendChild(feedTitle);
    removeButton.appendChild(document.createTextNode("X"));
    removeButton.addEventListener("click", removeFeed);
    feedHeader.appendChild(removeButton);
    feedContainer.appendChild(feedHeader);

    for (var i = 0; i < entries.length; i++) {
        feedContainer.appendChild(createEntryItem(entries[i]));
    }

    feedsContainer.appendChild(feedContainer);
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