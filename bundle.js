

(function() {
  console.log("Script loaded");

   function getQueryParams() {
    const params = {};
    const queryString = window.location.search.substring(1);
    const queryArray = queryString.split('&');
    queryArray.forEach((param) => {
      const [key, value] = param.split('=');
      params[decodeURIComponent(key)] = decodeURIComponent(value);
    });
    return params;
  }

  const params = getQueryParams();

  
  var parent = document.getElementById("shopify-section-feature-row");
  var container = document.createElement('div');
  container.id = 'carousel-container';
  container.className = 'container page-width'; // Bootstrap class
  container.style.paddingBottom = "100px";
  var header = document.createElement('h2');
  header.className = 'h1'; // Bootstrap class for margin
  header.innerText = 'What People Say About Us';
  header.style.textAlign = "center";
  header.style.paddingTop = "25px";
  header.style.paddingBottom = "25px";
  
  container.appendChild(header);
  parent.appendChild(container);

  // Fetch YouTube videos
  fetch(`https://citsapptesting.myshopify.com/apps/proxy-fetch?_data=routes/fetch-youtube-data?channel=${params.channel}`, {
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
        videoList.style.alignItems = "stretch";
        videoList.style.justifyContent = "center";
        videoList.style.flexWrap = "wrap";
        videoList.style.marginTop = "10px";
        videoList.style.gap = "50px";
        
        
        
        data.videos.forEach(video => {
          var videoItem = document.createElement('div');
          videoItem.className = 'video-item'; 
          videoItem.style.width = "275px";
          videoItem.style.display = "flex";
          videoItem.style.flexDirection = "column";
          videoItem.style.boxShadow = "4px 4px 16px 3px rgba(0,0,0,0.2)";
          videoItem.style.borderBottomLeftRadius = "15px";
          videoItem.style.borderBottomRightRadius = "15px";
          videoItem.style.background = "#f0f1f1";
          videoItem.style.minHeight = "290px";
          
          
          var thumbnail = document.createElement('img');
          thumbnail.src = video.thumbnail;
          thumbnail.style.width = "100%";
          videoItem.appendChild(thumbnail);

          var title = document.createElement('p');
          title.innerText = video.title;
          title.style.padding = "15px";
          title.style.fontSize = "15px";
          title.style.color = "#000000";
          title.style.borderBottomLeftRadius = "15px";
          title.style.borderBottomRightRadius = "15px";
          
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
