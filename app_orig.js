'use strict';

var searchForm = document.getElementById('searchForm');
var searchBar = document.getElementById('searchBar');
var recentSearchList = document.getElementById('recentSearchList');
var clearButton = document.getElementById('clearStorage');

// Initialize display list
var recentSearches = getRecentSearches();

recentSearches.forEach(function(searchString) {
  appendListItem(recentSearchList,searchString);
});

function supportsLocalStorage() {
}

function getRecentSearches() {
}

function saveSearchString() {
}

function removeSearches() {
}

// Create an li, given string contents, append to the supplied ul
function appendListItem(listElement, string) {
  var listItemElement = document.createElement('LI');
  listItemElement.textContent = string;
  listElement.appendChild(listItemElement);
}

// Empty the contents of an element (ul)
function clearList(listElement) {
  while(listElement.firstChild){
    this.removeChild(this.firstChild);
}
}

// Set event handlers
searchForm.addEventListener('submit', function(event) {
  var searchString = searchBar.value;
  if (saveSearchString(searchString)) {
    appendListItem(recentSearchList, searchString);
  }
});

clearButton.addEventListener('click', function(event) {
  removeSearches();
  clearList(recentSearchList);
});