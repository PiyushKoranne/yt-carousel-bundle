(function() {
  console.log("Script loaded");

  const cssUrl = 'https://unpkg.com/swiper/swiper-bundle.min.css';
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = cssUrl;
  document.head.appendChild(link);

  function getScriptQueryParams() {
    const scripts = document.getElementsByTagName('script');
    let src;
    
    for (let i = 0; i < scripts.length; i++) {
      if (scripts[i].src && scripts[i].src.includes('https://piyushkoranne.github.io/')) {
        src = scripts[i].src;
        break;
      }
    }

    if (!src) {
      return null;
    }

    const queryString = src.split('?')[1];
    const params = new URLSearchParams(queryString);

    const queryParams = {};
    params.forEach((value, key) => {
      queryParams[key] = value;
    });

    return queryParams;
  }

  const params = getScriptQueryParams();
  console.log("Params : ", params);
  
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

  // Create Swiper container
  var swiperContainer = document.createElement('div');
  swiperContainer.className = 'swiper-container';
  swiperContainer.style.overflowX = 'hidden';
  swiperContainer.style.padding = "10px";
  
  var swiperWrapper = document.createElement('div');
  swiperWrapper.className = 'swiper-wrapper';
  swiperContainer.appendChild(swiperWrapper);
  container.appendChild(swiperContainer);

  // Fetch YouTube videos
  fetch(`https://citsapptesting.myshopify.com/apps/proxy-fetch?_data=routes/fetch-youtube-data&channel=${params.channel}`, {
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
        
        data.videos.forEach(video => {
          var swiperSlide = document.createElement('div');
          swiperSlide.className = 'swiper-slide';
          
          var videoItem = document.createElement('div');
          videoItem.className = 'video-item'; 
          videoItem.style.boxShadow = "4px 4px 16px 3px rgba(0,0,0,0.2)";
          videoItem.style.borderRadius = "15px";
          videoItem.style.background = "#ffffff";
          videoItem.style.display = "flex";
          videoItem.style.flexDirection = "column";
          
          
          var thumbnail = document.createElement('img');
          thumbnail.src = video.thumbnail;
          thumbnail.style.width = "100%";
          thumbnail.style.borderTopLeftRadius = "15px";
          thumbnail.style.borderTopRightRadius = "15px";
          
          videoItem.appendChild(thumbnail);

          var title = document.createElement('p');
          title.innerText = video.title;
          title.style.padding = "15px";
          title.style.paddingTop = "7px";
          title.style.fontSize = "15px";
          title.style.color = "#000000";
          title.style.fontWeight = '600';
          title.style.borderBottomLeftRadius = "15px";
          title.style.borderBottomRightRadius = "15px";
          
          videoItem.appendChild(title);

          swiperSlide.appendChild(videoItem);
          swiperWrapper.appendChild(swiperSlide);
        });

        // Initialize Swiper
        new Swiper('.swiper-container', {
          slidesPerView: 4,
          spaceBetween: 30,
          loop: true,
          autoplay: {
            delay: 2000, // autoplay with a delay of 2 seconds
          },
          navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
          },
          pagination: {
            el: '.swiper-pagination',
            clickable: true,
          },
        });
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
