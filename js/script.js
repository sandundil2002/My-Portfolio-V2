let first = document.getElementById("hr1");
let second = document.getElementById("hr2");
let third = document.getElementById("hr3");
let menu = document.querySelector(".phoneMenu");
let count = 0;
let nav = document.querySelector("nav");
let before = 0;
let pos = 0;
const navHeight = -nav.clientHeight;

/*------------------------------------Menu-Btn----------------------------------*/
document.querySelector("menu").addEventListener("click", () => {
  if (count % 2 === 0) {
    showMenu();
  } else {
    hideMenu();
  }
  count++;
});
function showMenu() {
  disableScroll();
  first.classList.remove("revind1");
  second.classList.remove("revind2");
  third.classList.remove("revind3");
  first.classList.add("rotateDown");
  second.classList.add("remove");
  third.classList.add("rotateUp");

  menu.classList.remove("removePhoneMenu");
  menu.classList.add("showPhoneMenu");
}
function hideMenu() {
  first.classList.add("revind1");
  second.classList.add("revind2");
  third.classList.add("revind3");
  first.classList.remove("rotateDown");
  second.classList.remove("remove");
  third.classList.remove("rotateUp");

  menu.classList.remove("showPhoneMenu");
  menu.classList.add("removePhoneMenu");

  enableScroll();
}
function disableScroll() {
  document.body.classList.add("stop-scrolling");
}

function enableScroll() {
  document.body.classList.remove("stop-scrolling");
}

window.onresize = () => {
  if (window.innerWidth > 600) {
    enableScroll();
  } else {
    if (
      Array.from(menu.classList).find(
        (element) => element == "showPhoneMenu"
      ) !== undefined
    ) {
      disableScroll();
    }
  }
};

/*------------------------------------Type-Writer----------------------------------*/
const TypeWriter = function (txtElement, words, wait) {
  this.txtElement = txtElement;
  this.words = words;
  this.txt = "";
  this.wordIndex = 0;
  this.wait = parseInt(wait, 10);
  this.type();
  this.isDeleting = false;
};

TypeWriter.prototype.type = function () {
  const current = this.wordIndex % this.words.length;
  const fulltxt = this.words[current];

  if (this.isDeleting) {
    this.txt = fulltxt.substring(0, this.txt.length - 1);
  } else {
    this.txt = fulltxt.substring(0, this.txt.length + 1);
  }

  this.txtElement.innerHTML = '<span class = "txt">' + this.txt + "</span>";

  let typeSpeed = 200;
  if (this.isDeleting) {
    typeSpeed /= 2;
  }

  if (!this.isDeleting && this.txt === fulltxt) {
    typeSpeed = this.wait;
    this.isDeleting = true;
  } else if (this.isDeleting && this.txt === "") {
    this.isDeleting = false;
    this.wordIndex++;
  }

  setTimeout(() => this.type(), typeSpeed);
};

window.onload = function () {
  const txtElement = document.querySelector(".role");
  const words = JSON.parse(txtElement.getAttribute("data-words"));
  const wait = txtElement.getAttribute("data-wait");
  new TypeWriter(txtElement, words, wait);

  const txtElementFooter = document.querySelector(".footer");
  const wordsFooter = JSON.parse(txtElementFooter.getAttribute("data-words"));
  const waitFooter = txtElementFooter.getAttribute("data-wait");
  new TypeWriter(txtElementFooter, wordsFooter, waitFooter);
};

window.addEventListener("scroll", function (e) {
  let after = this.scrollY;
  if (after != 0) {
    nav.style.boxShadow = "0px 5px 15px black";
  } else {
    nav.style.boxShadow = "0px 0 0px black";
  }

  if (before < after) {
    if (pos > navHeight) {
      pos -= after - before;
      if (pos < navHeight) {
        pos = navHeight;
      }
      nav.style.top = pos + "px";
    }
  } else {
    if (pos < 0) {
      pos += before - after;
      if (pos > 0) {
        pos = 0;
      }
      nav.style.top = pos + "px";
    }
  }
  before = after;
});
