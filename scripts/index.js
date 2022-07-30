function constructTopInformatives(json) {
  const $wrapper = document.querySelector(".header__top-informatives--wrapper");

  for (const completeText of json) {
    $wrapper.innerHTML += `
      <span class="header__top-informatives--text${
        completeText.firstBold ? "-strong" : ""
      }">
    <div class="header__top-informatives-position">   
       ${completeText.text} 
        <span class="header__top-informatives--text${
          completeText.firstBold === false ? "-strong" : "-margin"
        }">
          ${completeText.bold}
        </span>
     `;
  }
}

function topInformatives() {
  fetch("src/../mocks/TOP_INFORMATIVES.json")
    .then(function (response) {
      return response.json();
    })
    .then(function (json) {
      constructTopInformatives(json);
    });
}

function constructMenuDesktop(json) {
  let structureMenu = "";
  const $containerMenu = document.querySelector(".header__menu");

  for (const menu of json) {
    structureMenu += `<div class="header__menu-wrapper">
    <a href="${menu.url}" class="header__menu-department">${menu.name}</a>
    ${
      menu.children
        ? `
    <div class="header__menu-items 
      ${menu.name === "Turmalina" ? "turmalina" : ""} 
      ${menu.name === "Outros" ? "others" : ""}">
       ${menu.children
         .map(function (child) {
           return `
        <div class="header__menu-wrapper-category ${
          menu.name === "Turmalina" ? "turmalina" : ""
        }">
          <a href=${child.url} class="header__menu-category">
          ${child.name}
          </a>
          ${
            child.children
              ? `
          <div class="header__menu-sub-category ${
            menu.name === "Turmalina" ? "turmalina-sub-category" : ""
          }">
            ${child.children
              .map(function (subChild) {
                return `
              <div class="header__menu-sub-category-wrapper">
                <a href=${subChild.url} class="header__menu-category">
                ${subChild.name}
                </a>
              </div>
              `;
              })
              .join("")}
          </div>
          `
              : ``
          }
        </div>
         `;
         })
         .join("")}
    </div>
    `
        : ``
    }
      </div>`;
  }

  $containerMenu.innerHTML = structureMenu;
}

function handleMenuMobileCategory() {
  const $departments = document.querySelectorAll(
    ".header__menu-mobile-with-child"
  );

  $departments.forEach(function ($department) {
    const $iconClick = $department.querySelector(".header__menu-iconArrow");
    const $category = $department.querySelector(
      ".header__menu-mobile-color-type-items"
    );

    $iconClick.addEventListener("click", function () {
      $category.classList.toggle("active");
      $iconClick.classList.toggle("active");
    });
  });
}

function constructMenuMobile(json) {
  let structureMenu = "";
  const $containerMenu = document.querySelector(
    ".header__menu-mobile-department"
  );

  json.map(function (menu) {
    structureMenu += `
    <div class="header__menu-mobile-items ${
      menu.children ? "header__menu-mobile-with-child" : ""
    }">
      <div class="header__menu-color-type">
        <a 
          href=${menu.url} 
          class="header__menu-text-color-type"
        >
        ${menu.name}
        </a>
        <div class="header__menu-color-type-arrow">
          <img class="header__menu-iconArrow" src="./assets/arrowDown.png" alt="seta">
        </div>
      </div>
      ${
        menu.children
          ? `
      <div class="header__menu-mobile-color-type-items">
      ${menu.children
        .map(function (child) {
          return `
        <div class="header__menu-mobile-wrapper-color-type-items">
          <a class="header__menu-mobile-color-text-type-items" 
          href="./index.html">
          Água Marina - Incolor
          </a>
        </div>
        `;
        })
        .join("")}
      </div>
      `
          : ``
      }
    </div>
    `;
  });

  $containerMenu.innerHTML = structureMenu;

  handleMenuMobileCategory();
}

function requestMenu() {
  fetch("src/../mocks/MENU.json")
    .then(function (response) {
      return response.json();
    })
    .then(function (json) {
      const windowSize = window.innerWidth;

      if (windowSize >= 1024) {
        constructMenuDesktop(json.menu);
      } else {
        constructMenuMobile(json.menu);
      }
    });
}

function handleToggleMenuMobile() {
  const $menuMobile = document.querySelector(".header__menu-hamburger");
  const $estructureMenuMob = document.querySelector(".header__menu-mobile");
  const $closeMenuIconX = document.querySelector(".close-menu");
  const $shadowMenuMobile = document.querySelector(".shadow");
  $menuMobile.addEventListener("click", function () {
    $estructureMenuMob.classList.toggle("active");
  });

  $closeMenuIconX.addEventListener("click", function () {
    $estructureMenuMob.classList.remove("active");
  });

  $shadowMenuMobile.addEventListener("click", function () {
    $estructureMenuMob.classList.remove("active");
  });
}

function slickShef() {
  $(".main__shelf-wrapper").slick({
    slidesToShow: 4,
    infinite: false,
    slidesToScroll: 1,
    dots: true,
    dotsClass: "shelf-dots",
  });
}

function constructShelf(products) {
  const $containerShelf = document.querySelector(".main__shelf-wrapper");
  products.map(function (product) {
    const image = document.createElement("img");
    const seal = document.createElement("div");
    const name = document.createElement("h2");
    const price = document.createElement("span");
    const containerProduct = document.createElement("div");
    const button = document.createElement("button");
    const installment = document.createElement("span");
    image.src = product.image;
    image.classList.add("main__shelf-image");
    image.alt = product.title;

    seal.textContent = product.category;
    seal.classList.add("main__shelf-seal");

    name.textContent = product.title;
    name.classList.add("main__shelf-name");

    price.textContent = Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(product.price);
    price.classList.add("main__shelf-price");

    containerProduct.classList.add("main__shelf-product");

    installment.textContent = "Compre em até 8x sem juros";
    installment.classList.add("main__shelf-installment");

    button.textContent = "Comprar";
    button.classList.add("main__shelf-button");

    containerProduct.appendChild(image);
    containerProduct.appendChild(seal);
    containerProduct.appendChild(name);
    containerProduct.appendChild(price);
    containerProduct.appendChild(installment);
    containerProduct.appendChild(button);

    $containerShelf.appendChild(containerProduct);
  });
  slickShef();
}

function requestProducts() {
  fetch("https://fakestoreapi.com/products?limit=6")
    .then(function (response) {
      return response.json();
    })
    .then(function (json) {
      constructShelf(json);
    });
}

function slickBannersMid() {
  $(".banner-mid-content").slick({
    arrows: true,
    dots: true,
    dotsClass: "dots-banner-mid-content",
    autoplay: true,
    autoplaySpeed: 3000,
  });
}

function handleBannersMid(bannersStructure) {
  const $containerText = document.querySelector(".main__banner-mid-text");
  const $containerBanners = document.querySelector(".banner-mid-content");

  const titleElement = document.createElement("h3");
  const subtitleElement = document.createElement("b");
  const descriptionElement = document.createElement("p");
  const seeMoreButton = document.createElement("button");

  titleElement.classList.add("main__banner-mid-title");
  subtitleElement.classList.add("main__banner-mid-subtitle");
  descriptionElement.classList.add("main__banner-mid-paragraph");
  seeMoreButton.classList.add("main__banner-mid-button");

  const bannerElement1 = document.createElement("img");
  const bannerElement2 = document.createElement("img");
  const bannerElement3 = document.createElement("img");

  subtitleElement.textContent = bannersStructure.subtitle;
  titleElement.textContent = bannersStructure.title;
  descriptionElement.textContent = bannersStructure.description;
  seeMoreButton.textContent = "saiba mais";

  bannerElement1.src = `./assets/${bannersStructure.banner[0].image}`;
  bannerElement1.alt = `${bannersStructure.banner[0].alt}`;
  bannerElement1.title = `${bannersStructure.banner[0].title}`;
  bannerElement1.link = `${bannersStructure.banner[0].link}`;

  bannerElement2.src = `./assets/${bannersStructure.banner[1].image}`;
  bannerElement2.alt = `${bannersStructure.banner[1].alt}`;
  bannerElement2.title = `${bannersStructure.banner[1].title}`;
  bannerElement2.link = `${bannersStructure.banner[1].link}`;

  bannerElement3.src = `./assets/${bannersStructure.banner[1].image}`;
  bannerElement3.alt = `${bannersStructure.banner[1].alt}`;
  bannerElement3.title = `${bannersStructure.banner[1].title}`;
  bannerElement3.link = `${bannersStructure.banner[1].link}`;

  $containerText.append(subtitleElement);
  $containerText.append(titleElement);
  $containerText.append(descriptionElement);
  $containerText.append(seeMoreButton);

  $containerBanners.append(bannerElement1);
  $containerBanners.append(bannerElement2);
  $containerBanners.append(bannerElement3);

  slickBannersMid();
}

function requestMiddleBanners() {
  fetch("src/../mocks/BANNER_MID.json")
    .then(function (response) {
      return response.json();
    })
    .then(function (json) {
      handleBannersMid(json);
    });
}

function slickShefsecond() {
  $(".main__shelf-wrapper--second").slick({
    slidesToShow: 4,
    infinite: false,
    slidesToScroll: 1,
    dots: true,
    dotsClass: "shelf-dots",
  });
}

function constructShelfSecond(products) {
  const $containerShelf = document.querySelector(
    ".main__shelf-wrapper--second"
  );
  products.map(function (product) {
    const image = document.createElement("img");
    const seal = document.createElement("div");
    const name = document.createElement("h2");
    const price = document.createElement("span");
    const containerProduct = document.createElement("div");
    const button = document.createElement("button");
    const installment = document.createElement("span");
    image.src = product.image;
    image.classList.add("main__shelf-image");
    image.alt = product.title;

    seal.textContent = product.category;
    seal.classList.add("main__shelf-seal");

    name.textContent = product.title;
    name.classList.add("main__shelf-name");

    price.textContent = Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(product.price);
    price.classList.add("main__shelf-price");

    containerProduct.classList.add("main__shelf-product");

    installment.textContent = "Compre em até 8x sem juros";
    installment.classList.add("main__shelf-installment");

    button.textContent = "Comprar";
    button.classList.add("main__shelf-button");

    containerProduct.appendChild(image);
    containerProduct.appendChild(seal);
    containerProduct.appendChild(name);
    containerProduct.appendChild(price);
    containerProduct.appendChild(installment);
    containerProduct.appendChild(button);

    $containerShelf.appendChild(containerProduct);
  });
  slickShefsecond();
}

function requestProductsSecond() {
  fetch("https://fakestoreapi.com/products?limit=6")
    .then(function (response) {
      return response.json();
    })
    .then(function (json) {
      constructShelfSecond(json);
    });
}

function handleWithBannerMid(bannersStructure) {
  const $shelfText = document.querySelector(".main__banner-with-shelf-text");
  const $containerBanners = document.querySelector(".main__banner-mid-content2");

  const titleElement = document.createElement("h3");
  const subtitleElement = document.createElement("b");
  const textWrap = document.createElement("div");
  const bannerElement1 = document.createElement("img");

  titleElement.classList.add("main__banner-with-shelf-text--title");
  subtitleElement.classList.add("main__banner-with-shelf-text--bold");

  titleElement.textContent = bannersStructure.title;
  subtitleElement.textContent = bannersStructure.subtitle;

  bannerElement1.src = `./assets/${bannersStructure.banner[0].image}`;
  bannerElement1.alt = `${bannersStructure.banner[0].alt}`;
  bannerElement1.title = `${bannersStructure.banner[0].title}`;
  bannerElement1.link = `${bannersStructure.banner[0].link}`;
  bannerElement1.classList.add(".main__banner-mid-content-image-with-shelf");

  textWrap.classList.add("main__banner-with-shelf-background-wrap-text");

  textWrap.appendChild(titleElement);
  textWrap.appendChild(subtitleElement);

  $shelfText.append(textWrap);
  $containerBanners.append(bannerElement1);
}

function requestShelfBanner() {
  fetch("src/../mocks/SHELF_BANNER.json")
    .then(function (response) {
      return response.json();
    })
    .then(function (json) {
      handleWithBannerMid(json);
    });
}

function slickShelfWithBanner() {
  $(".main__shelf-with-banner").slick({
    slidesToShow: 2,
  });
}

function constructShelfWithBanner(products) {
  const $containerShelf = document.querySelector(".main__shelf-with-banner");
  products.map(function (product) {
    const image = document.createElement("img");
    const seal = document.createElement("div");
    const name = document.createElement("h2");
    const price = document.createElement("span");
    const containerProduct = document.createElement("div");
    const button = document.createElement("button");
    const installment = document.createElement("span");

    image.src = product.image;
    image.classList.add("main__shelf-image");
    image.alt = product.title;

    seal.textContent = product.category;
    seal.classList.add("main__shelf-seal");

    name.textContent = product.title;
    name.classList.add("main__shelf-name");

    price.textContent = Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(product.price);
    price.classList.add("main__shelf-price");

    containerProduct.classList.add("main__shelf-product");

    installment.textContent = "Compre em até 8x sem juros";
    installment.classList.add("main__shelf-installment");

    button.textContent = "Comprar";
    button.classList.add("main__shelf-button");

    containerProduct.appendChild(image);
    containerProduct.appendChild(seal);
    containerProduct.appendChild(name);
    containerProduct.appendChild(price);
    containerProduct.appendChild(installment);
    containerProduct.appendChild(button);

    $containerShelf.appendChild(containerProduct);
  });

  slickShelfWithBanner();
}

function requestMiddleBannersProduct() {
  fetch("https://fakestoreapi.com/products/category/jewelery")
    .then(function (response) {
      return response.json();
    })
    .then(function (json) {
      constructShelfWithBanner(json);
    });
}

function textInstaFeed(texts) {
  const $textWrap = document.querySelector(".main__instafeed-text");

  const textElement = document.createElement("div");
  const titleDiv = document.createElement("div");
  const titleElement = document.createElement("h3");
  const titleBold = document.createElement("b");
  const descriptionDiv = document.createElement("div");
  const descriptionElement = document.createElement("p");
  const hashtags = document.createElement("p");
  const socialMedia = document.createElement("div");
  const followUs = document.createElement("span");
  const faceIcon = document.createElement("img");
  const instaIcon = document.createElement("img");

  textElement.classList.add("main__instafeed-wrapper-text");
  titleDiv.classList.add("main__instafeed-wrapper-title");
  socialMedia.classList.add("main__instafeed-social-media");
  descriptionDiv.classList.add("main__instafeed-description");

  titleElement.textContent = texts.title;
  titleElement.classList.add("main__instafeed-wrapper-title--text");

  titleBold.textContent = texts.bold;
  titleBold.classList.add("main__instafeed-wrapper-title--bold");

  descriptionElement.textContent = texts.description;
  descriptionElement.classList.add("main__instafeed-description--text");

  hashtags.textContent = texts.hashtags;
  hashtags.classList.add("main__instafeed-description--hashtags");

  followUs.textContent = texts.span;
  followUs.classList.add("main__instafeed-social-media--follow-us");

  faceIcon.src = `./assets/${texts.icon[0].image}`;
  faceIcon.alt = `${texts.icon[0].alt}`;
  faceIcon.title = `${texts.icon[0].title}`;

  instaIcon.src = `./assets/${texts.icon[1].image}`;
  instaIcon.alt = `${texts.icon[1].alt}`;
  instaIcon.title = `${texts.icon[1].title}`;

  textElement.append(titleDiv);
  textElement.append(titleElement);
  textElement.append(titleBold);
  textElement.append(descriptionDiv);
  textElement.append(descriptionElement);

  titleDiv.append(titleElement);
  titleDiv.append(titleBold);

  descriptionDiv.append(descriptionElement);
  descriptionDiv.append(hashtags);

  socialMedia.append(followUs);
  socialMedia.append(faceIcon);
  socialMedia.append(instaIcon);

  $textWrap.appendChild(textElement);
  $textWrap.appendChild(socialMedia);
}

function instaFeedText() {
  fetch("src/../mocks/INSTAFEED_TEXT.json")
    .then(function (response) {
      return response.json();
    })
    .then(function (json) {
      textInstaFeed(json);
    });
}

function constructInstaFeed(photos) {
  const $container = document.querySelector(".main__instafeed-photos");
  photos.map((photo) => {
    const img = document.createElement("img");
    img.src = photo.mediaUrl;
    img.classList.add("main__instafeed-photos-position");

    $container.appendChild(img);
  });
}

function instaFeed() {
  fetch("https://feeds.behold.so/M6BYWZ8xXh7LtHrkvl3s")
    .then((data) => data.json())
    .then((photos) => {
      constructInstaFeed(photos);
    });
}

function handleLastBannerMid(lastBannerStructure) {
  const $containerText = document.querySelector(".main__last-banner-mid-text");
  const $containerBanner = document.querySelector(".main__last-banner-mid-banner");

  const titleElement = document.createElement("h3");
  const subTitleElement = document.createElement("b");
  const descriptionElement = document.createElement("p");
  const knowOurHistoryButton = document.createElement("button");

  subTitleElement.textContent = lastBannerStructure.subtitle;
  titleElement.textContent = lastBannerStructure.title;
  descriptionElement.textContent = lastBannerStructure.description;
  knowOurHistoryButton.textContent = "Conheça nossa história";

  const bannerElement = document.createElement("img");

  bannerElement.src = `./assets/${lastBannerStructure.banner[0].image}`;
  bannerElement.alt = `${lastBannerStructure.banner[0].alt}`;
  bannerElement.title = `${lastBannerStructure.banner[0].title}`;
  bannerElement.link = `${lastBannerStructure.banner[0].link}`;

  $containerText.append(subTitleElement);
  $containerText.append(titleElement);
  $containerText.append(descriptionElement);
  $containerText.append(knowOurHistoryButton);

  $containerBanner.append(bannerElement);
}

function requestLastBannerMid() {
  fetch("src/../mocks/ORIGINS.json")
    .then(function (response) {
      return response.json();
    })
    .then(function (json) {
      handleLastBannerMid(json);
    });
}

function constructMainInformations(mainInformations) {
  const $InfoWrappers = document.querySelector(".main__wrapper-informations");

  const lock = document.createElement("div");
  const card = document.createElement("div");
  const truck = document.createElement("div");
  const certificate = document.createElement("div");

  lock.classList.add("main__informations-last-items");
  card.classList.add("main__informations-last-items");
  truck.classList.add("main__informations-last-items");
  certificate.classList.add("main__informations-last-items");

  const lockerIcon = document.createElement("img");
  const lockerSpan = document.createElement("span");
  const lockerPara = document.createElement("p");

  lockerIcon.src = `./assets/${mainInformations.informations[0].image}`;
  lockerIcon.alt = `${mainInformations.informations[0].alt}`;

  const lockerIconDiv = document.createElement("div");
  lockerIconDiv.classList.add("main__informations-icons");

  lockerSpan.textContent = `${mainInformations.informations[0].span}`;
  lockerSpan.classList.add("main__informations-last-items--bold");

  lockerPara.textContent = `${mainInformations.informations[0].paragraph}`;
  lockerPara.classList.add("main__informations-last-items--light");

  const lockerText = document.createElement("div");
  lockerText.classList.add("main__informations-last-items--text");

  const cardIcon = document.createElement("img");
  const cardSpan = document.createElement("span");
  const cardPara = document.createElement("p");

  cardIcon.src = `./assets/${mainInformations.informations[1].image}`;
  cardIcon.alt = `${mainInformations.informations[1].alt}`;

  const cardIconDiv = document.createElement("div");
  cardIconDiv.classList.add("main__informations-icons");

  cardSpan.textContent = `${mainInformations.informations[1].span}`;
  cardSpan.classList.add("main__informations-last-items--bold");

  cardPara.textContent = `${mainInformations.informations[1].paragraph}`;
  cardPara.classList.add("main__informations-last-items--light");

  const cardText = document.createElement("div");
  cardText.classList.add("main__informations-last-items--text");

  const truckIcon = document.createElement("img");
  const truckSpan = document.createElement("span");
  const truckPara = document.createElement("p");

  truckIcon.src = `./assets/${mainInformations.informations[2].image}`;
  truckIcon.alt = `${mainInformations.informations[2].alt}`;

  const truckIconDiv = document.createElement("div");
  truckIcon.classList.add("main__informations-icons");

  truckSpan.textContent = `${mainInformations.informations[2].span}`;
  truckSpan.classList.add("main__informations-last-items--bold");

  truckPara.textContent = `${mainInformations.informations[2].paragraph}`;
  truckPara.classList.add("main__informations-last-items--light");

  const truckText = document.createElement("div");
  truckText.classList.add("main__informations-last-items--text");

  const certificateIcon = document.createElement("img");
  const certificateSpan = document.createElement("span");
  const certificatePara = document.createElement("p");

  certificateIcon.src = `./assets/${mainInformations.informations[3].image}`;
  certificateIcon.alt = `${mainInformations.informations[3].alt}`;

  const certificateIconDiv = document.createElement("div");
  certificateIconDiv.classList.add("main__informations-icons");

  certificateSpan.textContent = `${mainInformations.informations[3].span}`;
  certificateSpan.classList.add("main__informations-last-items--bold");

  certificatePara.textContent = `${mainInformations.informations[3].paragraph}`;
  certificatePara.classList.add("main__informations-last-items--light");

  const certificateText = document.createElement("div");
  certificateText.classList.add("main__informations-last-items--text");

  lockerIconDiv.appendChild(lockerIcon);
  lockerText.appendChild(lockerSpan);
  lockerText.appendChild(lockerPara);

  cardIconDiv.appendChild(cardIcon);
  cardText.appendChild(cardSpan);
  cardText.appendChild(cardPara);

  truckIconDiv.appendChild(truckIcon);
  truckText.appendChild(truckSpan);
  truckText.appendChild(truckPara);

  certificateIconDiv.appendChild(certificateIcon);
  certificateText.appendChild(certificateSpan);
  certificateText.appendChild(certificatePara);

  lock.appendChild(lockerIconDiv);
  lock.appendChild(lockerText);

  card.appendChild(cardIconDiv);
  card.appendChild(cardText);

  truck.appendChild(truckIconDiv);
  truck.appendChild(truckText);

  certificate.appendChild(certificateIconDiv);
  certificate.appendChild(certificateText);

  $InfoWrappers.append(lock);
  $InfoWrappers.append(card);
  $InfoWrappers.append(truck);
  $InfoWrappers.append(certificate);
}

function mainInformations() {
  fetch("src/../mocks/MAIN_INFORMATIONS.json")
    .then(function (response) {
      return response.json();
    })
    .then(function (json) {
      constructMainInformations(json);
    });
}

function toogleFooterMenu() {
  const $footerCategory = document.querySelectorAll(".footer__menu-category");

  const windowSize = window.innerWidth;

  if (windowSize >= 1024) return;

  $footerCategory.forEach(function ($item) {
    $item.addEventListener("click", function () {
      $item.classList.toggle("active");
    });
  });
}

toogleFooterMenu();
mainInformations();
topInformatives();
requestMenu();
handleToggleMenuMobile();
requestShelfBanner();
requestMiddleBannersProduct();
requestProducts();
requestMiddleBanners();
requestProductsSecond();
requestLastBannerMid();
instaFeed();
instaFeedText();
