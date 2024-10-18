function renderWatchlist() {
    const watchlistContainer = document.getElementById('watchlist');
    watchlistContainer.innerHTML = ''; // Clear the existing list
  
    chrome.storage.local.get({ watchlist: [] }, function(data) {
      data.watchlist.forEach((show, index) => {
        const listItem = document.createElement('li');
        listItem.textContent = show;
  
        const removeButton = document.createElement('button');
        removeButton.textContent = '−'; // Minus sign for removal
        removeButton.onclick = function() {
          removeShow(index);
        };
  
        listItem.appendChild(removeButton);
        watchlistContainer.appendChild(listItem);
      });
    });
  }
  
  function removeShow(index) {
    chrome.storage.local.get({ watchlist: [] }, function(data) {
      data.watchlist.splice(index, 1); // Remove the show from the watchlist
      chrome.storage.local.set({ watchlist: data.watchlist }, function() {
        renderWatchlist(); // Re-render the watchlist
      });
    });
  }
  
  document.getElementById('add-show').onclick = function() {
    const showName = document.getElementById('showInput').value;
    if (showName) {
      chrome.storage.local.get({ watchlist: [] }, function(data) {
        data.watchlist.push(showName);
        chrome.storage.local.set({ watchlist: data.watchlist }, function() {
          alert("Show added to watchlist!");
          document.getElementById('showInput').value = ""; // Clear input field
          renderWatchlist(); // Re-render the watchlist
        });
      });
    }
  };
  
  // Render the watchlist on load
  renderWatchlist();
  