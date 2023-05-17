let nextPage = 0;
let currentSlide = 0;
let currentDot = 0;
let products = [];
let loading = false;
const urlParams = new URLSearchParams(window.location.search);
const urlCategories = urlParams.get("category") || "all";
const mobileMaxWidth = 1280;
const women = document.querySelector(".women");
const men = document.querySelector(".men");
const accessories = document.querySelector(".accessories");
const logo = document.querySelector(".logo");
const userInput = document.querySelector(".input");
const mobileSearchBtnOutside = document.querySelector(
  ".mobile-search-btn-outside"
);
const mobileSearch = document.querySelector(".mobile-search");
const mobileInput = document.querySelector(".mobile-input");
const mobileSearchBtnInside = document.querySelector(
  ".mobile-search-btn-inside"
);

window.onload = function () {
  for (const [key, value] of urlParams) {
    if (key === "search") {
      userInput.value = value;
      mobileInput.value = value;
      state = "search";
      getKeywordData(value);
    } else if (key === "category") {
      state = value;
      getData(value);
    }
  }
};

carouselData();
function carouselData() {
  loading = true;
  fetch(`https://api.appworks-school.tw/api/1.0/marketing/campaigns`)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      document.querySelector(".banner-container").innerHTML = "";
      // carousels = data.data;
      // carouselIndex = data.id;
      carouselRender(data.data);
    })
    .catch((error) => {
      // eslint-disable-next-line no-console
      console.error("Error:", error);
    });
}

function carouselRender(data) {
  let newHTML = "";
  const result = document.querySelector(".banner-container");
  for (let i = 0; i < data.length; i++) {
    const carousel = data[i];
    newHTML += `
      <div class="banner">
        <div class="banner-img">
          <a href="/?id=${carousel.product_id}">
            <img src="${carousel.picture}" alt="banner">
          </a>
          <p class="line1">${carousel.story
            .split("\r\n", 3)
            .join("<br />")}</p> 
          <p class="line2">${carousel.story.split("\r\n", 4)[3]}</p> 
        </div>
      </div>`;
  }
  newHTML += `<div class="dots">`;
  data.forEach(() => {
    newHTML += `<div class="dot"></div>`;
  });
  newHTML += `</div>`;
  result.innerHTML += newHTML;
  showSlideImg();
  showSlideDot();
  // 監聽點點的點擊事件，設置點點與輪播圖的對應
  const dot = document.querySelectorAll(".dot");
  dot.forEach((a, index) => {
    a.addEventListener("click", () => {
      currentSlide = index;
      showSlideDot();
      showSlideImg();
    });
  });
}

function showSlideImg() {
  const slides = document.querySelectorAll(".banner");
  slides.forEach((slide, index) => {
    if (index === currentSlide) {
      slide.style.display = "block";
    } else {
      slide.style.display = "none";
    }
  });
}

function showSlideDot() {
  const dot = document.querySelectorAll(".dot");
  dot.forEach((a, index) => {
    if (index === currentSlide) {
      a.classList.add("active");
    } else {
      a.classList.remove("active");
    }
  });
}

setInterval(() => {
  const slides = document.querySelectorAll(".banner-img");
  currentSlide = currentSlide < slides.length - 1 ? currentSlide + 1 : 0;
  showSlideImg();
  const dots = document.querySelectorAll(".dots");
  currentDot = currentDot < dots.length - 1 ? currentDot + 1 : 0;
  showSlideDot();
}, 5000);

mobileSearchBtnOutside.addEventListener("click", (e) => {
  e.preventDefault();
  mobileSearch.style.display = "block";
  mobileSearchBtnOutside.style.display = "none";
});

mobileSearchBtnInside.addEventListener("click", (e) => {
  e.preventDefault();
  mobileSearch.style.display = "none";
  mobileSearchBtnOutside.style.display = "block";
});

userInput.addEventListener("keypress", handleKeypress);
mobileInput.addEventListener("keypress", handleKeypress);

function handleKeypress(e) {
  loading = true;
  if (e.key === "Enter") {
    e.preventDefault();
    const input = e.target.value;
    const newUrl = `${location.protocol}//${location.host}${location.pathname}?search=${input}`;
    window.history.replaceState({}, "", newUrl);
    getKeywordData(input);
    e.target.placeholder = "";
  }
}

logo.addEventListener("click", () => {
  getData();
});

function errorMsg() {
  const cantFind = document.querySelector(".contents");
  const msg = `<div class="error"><h3>Oooops!<br>您搜尋的商品不存在，請重新搜尋</h3></div>`;
  cantFind.style.textAlign = "center";
  cantFind.innerHTML = msg;
}

function getKeywordData(keyword) {
  if (keyword === "" || keyword === undefined) {
    errorMsg();
  } else {
    fetch(
      `https://api.appworks-school.tw/api/1.0/products/search?keyword=${keyword}`
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        products = data.data;
        nextPage = data.next_paging;
        render(data.data);
        // mobileSearchBtnOutside.style.display="none";
      })
      .catch((error) => {
        // eslint-disable-next-line no-console
        console.error("Error:", error);
      });
  }
}

function getData() {
  categories = urlCategories; //這邊需要帶入參數
  fetch(
    `https://api.appworks-school.tw/api/1.0/products/${categories}?paging=${nextPage}`
  )
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      products = data.data;
      nextPage = data.next_paging;
      loading = false;
      render(data.data);
    })
    .catch((error) => {
      // eslint-disable-next-line no-console
      console.error("Error:", error);
      loading = false;
    });
}

function render(data) {
  let newHTML = "";
  const result = document.querySelector(".items");
  if (userInput.value !== "" || mobileInput.value !== "") {
    result.innerHTML = "";
  }
  for (let i = 0; i < data.length; i++) {
    const product = data[i];
    newHTML += `
        <div class="item1">
          <a class="dress-img" href="/?id=${product.id}">
            <img class="contents-img" src="${product.main_image}">
          </a><div class="color-pads">`;
    product.colors.forEach((color) => {
      newHTML += ` <div class="color-pad" style="background-color:#${color.code};"></div>`;
    });
    newHTML += `</div>
          <div class="title">${product.title}</div>
          <div class="price">TWD.${product.price}</div>
        </div>`;
  }
  result.innerHTML += newHTML;
  clickChange(categories); //這邊需要帶入參數
}

function clickChange(categories) {
  if (window.innerWidth > mobileMaxWidth) {
    if (categories === "women") {
      women.style.color = "#8b572a";
    } else if (categories === "men") {
      men.style.color = "#8b572a";
    } else if (categories === "accessories") {
      accessories.style.color = "#8b572a";
    }
  } else if (window.innerWidth < mobileMaxWidth) {
    if (categories === "women") {
      women.style.color = "#ffffff";
    } else if (categories === "men") {
      men.style.color = "#ffffff";
    } else if (categories === "accessories") {
      accessories.style.color = "#ffffff";
    }
  }
}

window.addEventListener("scroll", () => {
  if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1) {
    if (!loading && typeof nextPage === "number") {
      loading = true;
      getData();
    }
  }
});

const cart = JSON.parse(localStorage.getItem("cart"));

let totalCount = 0;
cart.forEach((item) => {
  totalCount += item.qty;
});

document.querySelector(".cart-number").textContent = totalCount.toString();
document.querySelector(".mobile-cart-number").textContent =
  totalCount.toString();
