console.log("Content script is running.");

// Check if the watchlist is being retrieved
chrome.storage.local.get({ watchlist: [] }, function (data) {
  let watchlist = data.watchlist;
  if (watchlist.length > 0) {
    let pageText = document.body.innerText;
    console.log("Page text captured:", pageText);

    // Send text and watchlist to the Python API for spoiler detection
    fetch('http://127.0.0.1:5000/check-spoiler', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        text: pageText,
        watchlist: watchlist
      })
    })
    .then(response => response.json())
    .then(data => {
      console.log("Spoiler detection response:", data);
      if (data.isSpoiler) {
        blockSpoilers(data.spoilerPositions);
      }
    })
    .catch(error => {
      console.error("Error:", error);
    });
  }
});

function blockSpoilers(spoilerPositions) {
  spoilerPositions.forEach(pos => {
    const block = document.createElement('div');
    block.style.position = 'absolute';
    block.style.left = `${pos.left}px`;
    block.style.top = `${pos.top}px`;
    block.style.width = `${pos.width}px`;
    block.style.height = `${pos.height}px`;
    block.style.backgroundColor = 'rgba(255, 0, 0, 1)';
    block.style.zIndex = '9999';
    block.textContent = "Spoiler Alert!";
    block.style.color = "white";
    block.style.textAlign = "center";
    block.style.lineHeight = `${pos.height}px`; // Center text vertically
    block.style.cursor = "pointer";
    block.onclick = function() {
      this.remove(); // Allow the user to remove the block
    };
    document.body.appendChild(block);
  });
}
