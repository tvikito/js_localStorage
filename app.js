/*====================================================================
    DECLARATION
====================================================================*/

const searchForm = document.getElementById('searchForm');
const searchBar = document.getElementById('searchBar');
const recentSearchList = document.getElementById('recentSearchList');
const clearButton = document.getElementById('clearStorage');

/*====================================================================
    BASIC FUNCTIONS
====================================================================*/

/* CHECK for support local storage
===============================================*/

function supportsLocalStorage() {
  try {
    return 'localStorage' in window && window['localStorage'] !== null;
  } catch(e){
    return false;
  }
}

/* CREATE element
===============================================*/

function createElement(element, text, classes) {
  let elem = document.createElement(element);
  elem.textContent = text;
  if (classes) {
    elem.className = classes;
  }
  return elem;
}

/* CREATE and ADD list item to the Searches list
===============================================*/

function appendToSearchList(list, listText) {
  let li = createElement("LI", "", "search-item");
  let button = createElement("BUTTON", "x", "delete-button");
  let span = createElement("SPAN", listText, "search-item--text");
  li.appendChild(span);
  li.appendChild(button);
  list.appendChild(li);
}

/* CLEAN Searches list
===============================================*/

function cleanSearchList(listElement) {
  while(listElement.firstChild){
    listElement.removeChild(listElement.firstChild);
  }
}

/* DELETE child from parent after button click
===============================================*/

function deleteFromParent(button, list) {
  let li = button.parentNode;
  list.removeChild(li);
}

/* GET all elements by selector
===============================================*/

function getAll(selector) {  
  let spans = document.querySelectorAll(selector);
  let array = Array.prototype.map.call(spans, (event) => event.innerText);
  return array;
}

/*====================================================================
    LOCALSTORAGE
====================================================================*/

/* GET local storage item
===============================================*/

function getStorage(property) {
  return localStorage.getItem(property);  
}

/* SET local storage item
===============================================*/

function setStorage(property, value) {
  localStorage.setItem(property, value);
}

/* UPDATE local storage item
===============================================*/

function updateSearchStorage() {
  let value = getAll("span.search-item--text");  
  setStorage("search", JSON.stringify(value));
}

/* CLEAN storage item
===============================================*/

function cleanStorage(property) {
  if(property) {
    delete localStorage.removeItem(property);
  } else {
    localStorage.clear();
  }
}

/* LOAD local storage to search list
===============================================*/

function loadSearchToList(property) {
  let propertyValue = localStorage.getItem(property);
  let propertyObject = JSON.parse(propertyValue);
  
  propertyObject.forEach((e) => appendToSearchList(recentSearchList, e));
}

/*====================================================================
    EVENT LISTENERS
====================================================================*/

window.onload = function() {
  
  if (supportsLocalStorage()) {
  
    /* SEARCH FORM listener
    ===============================================*/
    
    searchForm.addEventListener("submit", (e) => {
      e.preventDefault();
      
      if (!searchBar.value) {
        alert("You have to enter some search phrase!");
      } else {
        appendToSearchList(recentSearchList, searchBar.value);
        updateSearchStorage();
        searchBar.value = "";
      }
    });
    
    /* SEARCH LIST listener
    ===============================================*/
    
    recentSearchList.addEventListener("click", (e) => {
      let but = e.target;
      
      if (but.className === "delete-button") {
        deleteFromParent(but, recentSearchList);
        updateSearchStorage();
      }
    });
    
    /* CLEAR BUTTON listener
    ===============================================*/
    
    clearButton.addEventListener("click", (e) => {
      e.preventDefault();
      cleanStorage("search");
      cleanSearchList(recentSearchList);
    });
    
    /*====================================================================
        RUN IMMEDIATELY
    ====================================================================*/
    
    if (localStorage.search) {
      loadSearchToList("search");
    }
      
  } //end if support localstorage
} // end of window.onload
