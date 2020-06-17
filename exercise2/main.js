const parentEl = document.querySelector(".items"),
  parentBtn = document.querySelector(".tab-btns");

//Create function to get data from data.json file
function getData(callback) {
  var dObj = new XMLHttpRequest();
  dObj.overrideMimeType("application/json");
  dObj.open("GET", "data.json", true);
  dObj.onreadystatechange = function() {
    if (dObj.readyState == 4 && dObj.status == "200") {
      callback(dObj.responseText);
    }
  };
  dObj.send(null);
}

//Call the function for loading data
var x = getData(response => {
  const data = JSON.parse(response);
  renderData(data);
});

//Create a function to render the element
function renderData(data) {
  data.map((item, index) => {
    var el = document.createElement("li"),
      btn = document.createElement("button");
    el.classList.add("item");
    btn.classList.add("tab-btn");
    btn.setAttribute("data-index", index);
    el.innerHTML = `
        <button class="head" data-title="${item.title}" data-index="${index}">${item.title}</button>
        <div class="content" data-index="${index}">${item.content}</div>
        `;
    btn.innerHTML = item.title;
    parentEl.appendChild(el);
    parentBtn.appendChild(btn);
  });

  //Select first index for both tabs and accordion
  function onloadAnim() {
    const nc = document.querySelectorAll(".content"),
      content = Array.from(nc),
      bc = document.querySelectorAll(".tab-btn"),
      btns = Array.from(bc),
      ab = document.querySelectorAll(".head"),
      abBtns = Array.from(ab);
    content.forEach((el, i) => {
      if (i === 0) {
        el.classList.add("active");
      }
    });
    btns.forEach((btn, i) => {
      if (i === 0) {
        btn.classList.add("active");
      }
      btn.addEventListener("click", tabsAnim);
    });
    abBtns.forEach((btn, i) => {
      //   if (i === 0) {
      //     btn.classList.add("active");
      //   }
      btn.addEventListener("click", accordionAnim);
    });
  }
  //Function for tabs
  function tabsAnim() {
    var selectedIndex = parseInt(this.dataset.index);
    Array.prototype.filter.call(this.parentNode.children, (child, i) => {
      if (i === selectedIndex) {
        child.classList.add("active");
      } else {
        child.classList.remove("active");
      }
    });
    Array.prototype.filter.call(
      document.querySelectorAll(".content"),
      (content, i) => {
        console.log(i, selectedIndex);
        if (i === selectedIndex) {
          content.classList.add("active");
        } else {
          content.classList.remove("active");
        }
      }
    );
  }
  //Function for accordion
  function accordionAnim() {
    var selectedIndex = parseInt(this.dataset.index),
      content = this.nextElementSibling;
      console.log($(this).parent().siblings())
    content.classList.toggle("active");
    Array.prototype.filter.call(
      document.querySelectorAll(".content"),
      (content, i) => {
        console.log(i, selectedIndex);
        if (i === selectedIndex) {
          // content.classList.add("active");
        } else {
          content.classList.remove("active");
        }
      }
    );
  }
  onloadAnim();
}