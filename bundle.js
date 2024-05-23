

(function() {
  console.log("Script loaded");
  var parent = document.getElementById("shopify-section-feature-row");
  var container = document.createElement('div');
  container.id = 'carousel-container';
  container.className = 'container page-width'; // Bootstrap class
  container.style.paddingBottom = "100px";
  var header = document.createElement('h2');
  header.className = 'my-4 h3'; // Bootstrap class for margin
  header.innerText = 'Top 5 Videos';
  header.style.textAlign = "center";
  header.style.paddingY = "25px";
  
  container.appendChild(header);
  parent.appendChild(container);

  // Fetch YouTube videos
  fetch('https://citsapptesting.myshopify.com/apps/proxy-fetch?_data=routes/fetch-youtube-data', {
    method: "POST",
    redirect: "manual",
    headers:{
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    }
  })
   .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
    .then(data => {
      console.log("data received from backend");
      console.log(data);
      if (data.videos) {
        console.log("videos are available");
        var videoList = document.createElement('div');
        videoList.className = 'video-list'; // Bootstrap class for list styling
        videoList.style.display = "flex";
        videoList.style.alignItems = "center";
        videoList.style.justifyContent = "space-evenly";
        videoList.style.flexWrap = "wrap";
        videoList.style.gap = "10px";
        videoList.style.marginTop = "10px";
        
        
        data.videos.forEach(video => {
          var videoItem = document.createElement('div');
          videoItem.className = 'video-item'; // Bootstrap class for item styling
          
          var thumbnail = document.createElement('img');
          thumbnail.src = video.thumbnail;
          videoItem.appendChild(thumbnail);

          var title = document.createElement('p');
          title.innerText = video.title;
          videoItem.appendChild(title);

          videoList.appendChild(videoItem);
        });

        container.appendChild(videoList);
      } else {
        var emptyElement = document.createElement("div");
        emptyElement.style.display = "flex";
        emptyElement.style.alignItems = "center";
        emptyElement.style.justifyContent = "center";
        emptyElement.innerHTML = "<p>No videos found</p>"
        container.appendChild(emptyElement);
        console.error('Failed to fetch videos:', data.error);
      }
    })
    .catch(error => {
      console.error('Error fetching videos:', error);
    });
})();
