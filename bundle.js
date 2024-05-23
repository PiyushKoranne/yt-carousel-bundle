

(function() {
  console.log("Script loaded");
  var parent = document.getElementById("shopify-section-feature-row");
  var container = document.createElement('div');
  container.id = 'carousel-container';
  container.className = 'container'; // Bootstrap class
  container.style.paddingBottom = "100px";
  var header = document.createElement('h2');
  header.className = 'my-4'; // Bootstrap class for margin
  header.innerText = 'Top 5 Videos';

  container.appendChild(header);
  parent.appendChild(container);

  // Fetch YouTube videos
  fetch('/apps/proxy-fetch', {
    redirect: "manual",
    headers:{
      "Access-Control-Allow-Origin": "*",
    }
  })
    .then(response => response.json())
    .then(data => {
      if (data.videos) {
        var videoList = document.createElement('div');
        videoList.className = 'video-list'; // Bootstrap class for list styling

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
        console.error('Failed to fetch videos:', data.error);
      }
    })
    .catch(error => {
      console.error('Error fetching videos:', error);
    });
})();
