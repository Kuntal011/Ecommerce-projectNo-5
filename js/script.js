// slider 
var swiper = new Swiper("#product-slider .mySwiper", {
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  slidesPerView: 6,
  spaceBetween: 30,
  loop: true,
  autoplay: {
    delay: 3000,
    disableOnInteraction: false,
  },
  breakpoints: {
    200:{
      slidesPerView: 2,
    },
    640: {
      slidesPerView: 3,
    },
    768: {
      slidesPerView: 4,
    },
    1024: {
      slidesPerView: 6,
    },
  },
});


/////////////////////////// dyanmic tab function ///////////////////////////

const dynamicTab = (tabWrapper, object) => {

  // Check for valid Id
  const dynamicTabWraper = document.getElementById(`${tabWrapper}`)
  if (dynamicTabWraper === null) {
    console.error("argument should be a Id, 'id'");
    console.log("function terminated !");

    return;
  }

  // object handeling
  // function to get Object value
  const objGetValue = (object, arg) => {

    if (typeof object !== "object") {
      console.warn("Arguement should be a 'Object' type!, function 'objGetValue()'")
      return undefined;
    }
    else if (object === null) {
      console.warn("The Object is null! can't get value, function 'objGetValue()'")
      return undefined;
    }
    else if (Object.keys(object).length === 0) {
      console.warn("The Object is empty! can't get value, function 'objGetValue()'")
      return undefined;
    }
    else if (object.hasOwnProperty(`${arg}`)) {
      return object[arg];
    }
    else {
      return undefined;
    }
  }

  //  Defining copy object from given key:value pairs in parameter object
  const cobj = {
    effect: objGetValue(object, "effect") || "RightToLeft",
    transitionSpeed: objGetValue(object, "transitionSpeed") || "0.8s",
    activeTextColor: objGetValue(object, "activeTextColor") || "#fff",
    activeBackgroundColor: objGetValue(object, "activeBackgroundColor") || "#0a4db8",

  };


  // Dynamic tab Js
  const buttons = dynamicTabWraper.querySelectorAll('.tab-button')
  const tabBody = dynamicTabWraper.querySelectorAll('.tab-body')

  buttons.forEach((button) => {
    const target = dynamicTabWraper.querySelector(`#${button.dataset.target_id}`)

    // default button css 
    if (target.classList.contains("active")) {
      button.style.backgroundColor = `${cobj.activeBackgroundColor}`;
      button.style.color = `${cobj.activeTextColor}`;
    }
    else {
      button.style.backgroundColor = "#f0f1f1";
      button.style.color = "#000";
    }

    button.addEventListener("click", () => {

      tabBody.forEach((tabBody) => {
        if (tabBody.classList.contains("active")) {
          tabBody.classList.remove("active")
        }
      })

      target.classList.toggle("active")
      dynamicTabWraper.querySelector('.active').style.animation = `${cobj.effect} ${cobj.transitionSpeed} forwards`

      buttons.forEach((button) => {
        const t = dynamicTabWraper.querySelector(`#${button.dataset.target_id}`)
        if (t.classList.contains("active")) {
          button.style.backgroundColor = `${cobj.activeBackgroundColor}`;
          button.style.color = `${cobj.activeTextColor}`;
        }
        else {
          button.style.backgroundColor = "#f0f1f1";
          button.style.color = "#000";
        }
      })

    })
  })
}
///////////////////END///////////////////////

// dynamicTab call
dynamicTab("dynamic-tab", {

  transitionSpeed: "0.7s",
  effect: "BottomToTop",
  activeTextColor: "#fff",
  activeBackgroundColor: "#0a4db8",

});

// AOS aimation
AOS.init();
