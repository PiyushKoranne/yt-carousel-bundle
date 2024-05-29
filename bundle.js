(function() {
  console.log("Script loaded");

  const cssUrl = 'https://unpkg.com/swiper/swiper-bundle.min.css';
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = cssUrl;
  document.head.appendChild(link);
  
  const cssUrl2 = 'https://piyushkoranne.github.io/yt-carousel-bundle/bundle.css';
  const link2 = document.createElement('link');
  link2.rel = 'stylesheet';
  link2.href = cssUrl2;
  document.head.appendChild(link2);

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
  header.style.marginTop = "50px";
  
  container.appendChild(header);
  parent.appendChild(container);

  // Create Swiper container
  var swiperContainer = document.createElement('div');
  swiperContainer.className = 'swiper-container';
  swiperContainer.style.overflowX = 'hidden';
  swiperContainer.style.padding = "10px 0px";
  var swiperWrapper = document.createElement('div');
  swiperWrapper.className = 'swiper-wrapper';
  swiperContainer.appendChild(swiperWrapper);
  container.appendChild(swiperContainer);

  // Fetch YouTube videos
  fetch(`https://citsapptesting.myshopify.com/apps/proxy-fetch?_data=routes/fetch-youtube-data&channel=${params.channel}&shop=${params.store}`, {
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
          
          // Create the main card div
const card = document.createElement('div');
card.className = 'card border-0';

// Create the position-relative text-white div
const positionRelativeDiv = document.createElement('div');
positionRelativeDiv.className = 'position-relative text-white';
positionRelativeDiv.style.position = "relative";
          
// Create the card-img-overlay div with badge
const cardImgOverlay = document.createElement('div');
cardImgOverlay.className = 'card-img-overlay three';
cardImgOverlay.style.backgroundImage = `url(${video.thumbnail})`;
const badge = document.createElement('span');
badge.className = 'badge badge-light text-uppercase';
badge.textContent = 'Famous';
cardImgOverlay.appendChild(badge);

// Create the card-smooth-caption div
const cardSmoothCaption = document.createElement('div');
cardSmoothCaption.className = 'card-smooth-caption';

// Create the d-flex div inside card-smooth-caption
const dFlexDiv = document.createElement('div');
dFlexDiv.className = 'd-flex justify-content-between align-items-center';

// Create the mr-auto div
const mrAutoDiv = document.createElement('div');
mrAutoDiv.className = 'mr-auto';

// Create the h5 and h6 elements
const cardTitle = document.createElement('h5');
cardTitle.className = 'card-title text-white';
cardTitle.textContent = 'Youtube';
cardTitle.style.color = "white";

const cardSubtitle = document.createElement('h6');
cardSubtitle.className = 'card-subtitle text-white';
cardSubtitle.textContent = video.uploadDate + ' ago';
cardSubtitle.style.color = 'white';

// Append h5 and h6 to mr-auto div
mrAutoDiv.appendChild(cardTitle);
mrAutoDiv.appendChild(cardSubtitle);

// Append mr-auto div to d-flex div
dFlexDiv.appendChild(mrAutoDiv);

// Append d-flex div to card-smooth-caption
cardSmoothCaption.appendChild(dFlexDiv);

// Append card-img-overlay and card-smooth-caption to position-relative div
positionRelativeDiv.appendChild(cardImgOverlay);
positionRelativeDiv.appendChild(cardSmoothCaption);

// Append position-relative div to card
card.appendChild(positionRelativeDiv);

// Create the card-body div
const cardBody = document.createElement('div');
cardBody.className = 'card-body';

// Create the card-text p element
const cardText = document.createElement('p');
cardText.className = 'card-text';
cardText.textContent = video.title;

// Append card-text to card-body
cardBody.appendChild(cardText);

// Append card-body to card
card.appendChild(cardBody);

// Create the card-footer div
const cardFooter = document.createElement('div');
cardFooter.className = 'card-footer';

// Create the media div
const media = document.createElement('div');
media.className = 'media align-items-center';

// Create the media-body div
const mediaBody = document.createElement('div');
mediaBody.className = 'media-body';

// Create the Read More link
const readMoreLink = document.createElement('a');
readMoreLink.className = 'card-link text-primary read-more';
readMoreLink.href = 'javascript://';
readMoreLink.textContent = 'Watch';

// Append Read More link to media-body
mediaBody.appendChild(readMoreLink);

// Create the footerright div
const footerRight = document.createElement('div');
footerRight.className = 'footerright';

// Create the tnlink3 divs with icons
const heartDiv = document.createElement('div');
heartDiv.className = 'tnlink3';
const heartIcon = document.createElement('i');
heartIcon.className = 'fas fa-heart';
heartIcon.setAttribute('aria-hidden', 'true');
heartDiv.appendChild(heartIcon);

const shareDiv = document.createElement('div');
shareDiv.className = 'tnlink3';
const shareIcon = document.createElement('i');
shareIcon.className = 'fas fa-share-nodes';
shareIcon.setAttribute('aria-hidden', 'true');
shareDiv.appendChild(shareIcon);

// Append icons to footerright
footerRight.appendChild(heartDiv);
footerRight.appendChild(shareDiv);

// Append media-body and footerright to media
media.appendChild(mediaBody);
media.appendChild(footerRight);

// Append media to card-footer
cardFooter.appendChild(media);

// Append card-footer to card
card.appendChild(cardFooter);

          swiperSlide.appendChild(card);
          swiperWrapper.appendChild(swiperSlide);
        });

        // Initialize Swiper
        new Swiper('.swiper-container', {
          slidesPerView: 4,
          spaceBetween: 30,
          loop: true,
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
