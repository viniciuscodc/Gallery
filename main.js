let galleryImage = document.querySelectorAll(".gallery-image");
let getLastImage;
let windowWidth = window.innerWidth;

if (galleryImage) {
  galleryImage.forEach((img, index) => {
    img.onclick = function () {
      let getElementCss = window.getComputedStyle(img);
      let getFullImgUrl = getElementCss.getPropertyValue("background-image");
      let getImageUrlPos = getFullImgUrl.split("/img/");
      let setNewImageUrl = getImageUrlPos[1].replace('")', "");

      getLastImage = index + 1;

      let container = document.body;
      let newImgWindow = document.createElement("div");
      container.appendChild(newImgWindow);
      newImgWindow.setAttribute("class", "img-window");
      newImgWindow.setAttribute("onclick", "closeImg()");

      let newImg = document.createElement("img");
      newImgWindow.appendChild(newImg);
      newImg.setAttribute("src", "img/" + setNewImageUrl);
      newImg.setAttribute("id", "current-img");

      newImg.onload = function () {
        let imgWidth = this.width;
        let calcImgtoEdge = (windowWidth - imgWidth) / 2 - 80;

        let newPrevBtn = document.createElement("a");
        let btnPrevText = document.createTextNode("Prev");
        newPrevBtn.appendChild(btnPrevText);
        container.appendChild(newPrevBtn);
        newPrevBtn.setAttribute("class", "img-btn-prev");
        newPrevBtn.setAttribute("onclick", "changeImg(0)");
        newPrevBtn.style.cssText = "left: " + calcImgtoEdge + "px";

        let newNextBtn = document.createElement("a");
        let btnNextText = document.createTextNode("Next");
        newNextBtn.appendChild(btnNextText);
        container.appendChild(newNextBtn);
        newNextBtn.setAttribute("class", "img-btn-next");
        newNextBtn.setAttribute("onclick", "changeImg(1)");
        newNextBtn.style.cssText = "right: " + calcImgtoEdge + "px";
      };
    };
  });
}

function closeImg() {
  document.querySelector(".img-window").remove();
  document.querySelector(".img-btn-prev").remove();
  document.querySelector(".img-btn-next").remove();
}

function changeImg(Direction) {
  document.querySelector("#current-img").remove();

  let getImgWindow = document.querySelector(".img-window");
  let newImg = document.createElement("img");
  getImgWindow.appendChild(newImg);

  let calcNewImg;
  if (Direction === 1) {
    calcNewImg = getLastImage + 1;
    if (calcNewImg > galleryImage.length) {
      calcNewImg = 1;
    }
  } else if (Direction === 0) {
    calcNewImg = getLastImage - 1;
    if (calcNewImg < 1) {
      calcNewImg = galleryImage.length;
    }
  }

  newImg.setAttribute("src", "img/img-" + calcNewImg + ".jpeg");
  newImg.setAttribute("id", "current-img");
  getLastImage = calcNewImg;

  newImg.onload = function () {
    let imgWidth = this.width;
    let calcImgtoEdge = (windowWidth - imgWidth) / 2 - 80;

    let prevBtn = document.querySelector(".img-btn-prev");
    prevBtn.style.cssText = "left: " + calcImgtoEdge + "px";

    let nextBtn = document.querySelector(".img-btn-next");
    nextBtn.style.cssText = "right: " + calcImgtoEdge + "px";
  };
}
