var addFeedButton = document.getElementById("add-feed-button");
var feedUrlInput = document.getElementById("feed-url-input");
var feedsContainer = document.getElementById("feeds");

google.load("feeds", "1");

addFeedButton.addEventListener("click", function () {

    addFeed(feedUrlInput.value);
});

function addFeed(feedUrl) {

    var feed  = new google.feeds.Feed(feedUrl);
    feed.setNumEntries(20);

    feed.load(function (result) {
        if(result.error) {
            alert(result.error.message);
        } else {
            var feedContainer = document.createElement("section");
            feedContainer.setAttribute("class", "feed");
            for (var i = 0; i < result.feed.entries.length; i++) {
                feedContainer.appendChild(createEntryItem(result.feed.entries[i]));
            }
            feedsContainer.appendChild(feedContainer);
        }
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
    entryItem.appendChild(entryHeader);
    entryItem.appendChild(entryContent);
    entryItem.appendChild(entryFooter);

    return entryItem;
}