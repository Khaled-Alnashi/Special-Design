// create functions
function handleActive(element) {
  element.parentElement.querySelectorAll(".active").forEach(ele => {
    ele.classList.remove("active")
  })
  element.classList.add("active")
}

function scrollToo(elements) {
  elements.forEach(ele => {
    ele.addEventListener("click", (e) => {
      e.preventDefault()
      document.querySelector(e.target.dataset.sec).scrollIntoView({
        behavior: "smooth"
      })
    })
  })
}
// gear
document.querySelector(".fa-gear").onclick = function () {
  this.classList.toggle("fa-spin")
  document.querySelector(".settings").classList.toggle("open")
}

// settings
let setarr = document.querySelector(".settings").children

document.addEventListener("click", (e) => {
  let arrrr = Array.from(document.body.querySelector(".settings").querySelectorAll("*"))
  if (e.target !== document.querySelector(".settings") && !arrrr.includes(e.target)) {
    document.querySelector(".settings").classList.remove("open")
  }

  if (document.querySelector(".settings").className == "settings open") {
    document.querySelector(".fa-gear").classList.add("fa-spin")
  } else {
    document.querySelector(".fa-gear").classList.remove("fa-spin")

  }
})


// colors
let colorLocal = window.localStorage.getItem("color")

if (colorLocal !== null) {
  document.documentElement.style.setProperty("--maincolor", colorLocal)
  document.body.style.setProperty("--maincolor", colorLocal)
  document.querySelectorAll(".dark").forEach(section => {
    section.style.setProperty("--maincolor", colorLocal)
  })


  document.querySelectorAll(".colors li").forEach(ele => {
    ele.classList.remove("active")
    if (ele.dataset.color === colorLocal) {
      ele.classList.add("active")
    }
  })
}

document.querySelectorAll(".colors li").forEach(li => {
  li.addEventListener("click", (e) => {
    handleActive(e.target)
    document.documentElement.style.setProperty("--maincolor", e.target.dataset.color)
    document.querySelectorAll(".dark").forEach(section => {
      section.style.setProperty("--maincolor", e.target.dataset.color)
    })
    document.body.style.setProperty("--maincolor", e.target.dataset.color)
    window.localStorage.setItem("color", e.target.dataset.color)
  })
})

//bg shuffle
let land = document.querySelector(".landing");
let imgArr = [];
for (let i = 1; i < 9; i++) {
  imgArr.push(`./imgs/0${i}.jpg`);
}
let lastBg
let shuffle = function () {
  let ran = Math.floor(Math.random() * imgArr.length);
  land.style.backgroundImage = 'url(' + imgArr[ran] + ')';
  window.localStorage.setItem("lastbg", 'url(' + imgArr[ran] + ')')
}

// get last BG
window.onload = (e) => {
  land.style.backgroundImage = window.localStorage.getItem("lastbg")
}

//bg yes or no + active class
let bgValue
let bgLocal = window.localStorage.getItem("bg")
let bgInterval

if (bgLocal !== null) {
  bgValue = bgLocal
}

if (bgValue === "no") {
  clearInterval(bgInterval)
  handleActive(document.querySelector(".bg-box .no"))
} else {
  bgInterval = setInterval(shuffle, 5000)
  handleActive(document.querySelector(".bg-box .yes"))
}

document.querySelectorAll(".bg-box div").forEach(div => {
  div.addEventListener("click", (e) => {
    bgValue = e.target.dataset.value
    window.localStorage.setItem("bg", e.target.dataset.value)
    handleActive(e.target)
    if (bgValue === "no") {
      clearInterval(bgInterval)
    } else {
      bgInterval = setInterval(shuffle, 5000)
    }
  })
})

// dark theme

let darkValue
let darkLocal = window.localStorage.getItem("dark")

if (darkLocal !== null) {
  darkValue = darkLocal
}

if (darkValue === "no") {
  document.documentElement.classList.remove("dark")
  handleActive(document.querySelector(".light"))
} else {
  document.documentElement.classList.add("dark")
  handleActive(document.querySelector(".dark-but"))
}

document.querySelectorAll(".theme-box div").forEach(div => {
  div.addEventListener("click", (e) => {
    handleActive(e.target)
    darkValue = e.target.dataset.th
    window.localStorage.setItem("dark", e.target.dataset.th)
    if (darkValue === "no") {
      document.documentElement.classList.remove("dark")
    } else {
      document.documentElement.classList.add("dark")
    }
  })
})

//links scroll
scrollToo(document.querySelectorAll(".links a"))

//bullets scroll

scrollToo(document.querySelectorAll(".bullet"))

//bullets yes or no
let bulValue
let bulLocal = window.localStorage.getItem("bul")

if (bulLocal != null) {
  bulValue = bulLocal
}

if (bulValue == "no") {
  document.querySelector(".bullets").style.display = "none"
  handleActive(document.querySelector(".bul-box .no"))
} else {
  document.querySelector(".bullets").style.display = "block"
  handleActive(document.querySelector(".bul-box .yes"))
}

document.querySelectorAll(".bul-box div").forEach(div => {
  div.addEventListener("click", (e) => {
    handleActive(e.target)
    bulValue = e.target.dataset.value
    window.localStorage.setItem("bul", bulValue)
    if (bulValue === "no") {
      document.querySelector(".bullets").style.display = "none"
    } else {
      document.querySelector(".bullets").style.display = "block"
    }
  })
})


//skills and to up
let up = document.querySelector(".to-up")

up.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior:"smooth"
  })
})

window.onscroll = () => {
  if (this.scrollY >= 800) {
    up.style.opacity = "1"
  } else {
    up.style.opacity = "0"
  }

  if (window.pageYOffset >= document.querySelector(".skills").offsetTop + document.querySelector(".skills").offsetHeight - this.innerHeight) {
    document.querySelectorAll(".prbar span").forEach(skill => {
      skill.style.width = skill.dataset.pr
    })
  }
}

//gallery
let imgs = document.querySelectorAll(".gallery img")
imgs.forEach(img => {
  img.addEventListener("click", (e) => {

    let over = document.createElement("div")
    over.className = "over"
    document.body.appendChild(over)

    let pop = document.createElement("div")
    pop.className = "pop"
    document.body.appendChild(pop)

    if (img.alt != null) {
      let head = document.createElement("h3")
      head.className = "pophead"
      head.textContent = img.alt
      pop.appendChild(head)
    }

    let image = document.createElement("img")
    image.className = "popimage"
    image.src = img.src
    pop.appendChild(image)

    let close = document.createElement("span")
    close.textContent = "X"
    close.className = "close"
    pop.appendChild(close)

    close.addEventListener("click", (e) => {
      e.target.parentElement.remove()
      over.remove()
    })

    over.addEventListener("click", (e) => {
      pop.remove()
      over.remove()
    })

  })

})

// reset

document.querySelector(".reset").addEventListener("click", (e) => {
  window.localStorage.clear()
  window.location.reload()
})

// toggle menue
document.querySelector(".bars").onclick = function (e) {
  e.stopPropagation()
  this.classList.toggle("open")
  document.querySelector(".links").classList.toggle("open")
}

document.addEventListener("click", (e) => {

  if (e.target !== document.querySelector(".bars") && e.target !== document.querySelector(".links")) {
    e.stopPropagation()
    document.querySelector(".bars").classList.remove("open")
    document.querySelector(".links").classList.remove("open")
  }
})

//scroll bar
let scrlProg = document.querySelector(".scrollprogress")

let scrlHt = document.documentElement.scrollHeight - document.documentElement.clientHeight

window.addEventListener("scroll", () => {
  let scrlTop = document.documentElement.scrollTop

  scrlProg.style.width = `${(scrlTop/scrlHt)*100}%`
})

// loader

loader = document.querySelector(".loader")

window.onload = () => {
  loader.querySelector(".loader-cont").style.bottom = "50%"
}


setTimeout(() => {
  loader.style.cssText = "opacity: 0; z-index: 0"
  loader.querySelector(".loader-cont").style.bottom = "125%"
}, 2000)

setTimeout(() => {
  loader.style.cssText = "z-index: -1"
}, 3000)

// contact 
let inputName = document.querySelector("#name")
let inputMail = document.querySelector("#mail")
let inputMessage = document.querySelector("#message")
let inputSubmit = document.querySelector("[type='submit']")
let allErrorDiv= document.querySelectorAll(".errorDiv")
let errorMessageName = []
let errorMessageMail = []
let errorMessageMessage = []
const form = document.querySelector("form");
function sendEmail() {
  const bodyMessage = `Full Name: ${inputName.value}<br> Email: ${inputMail.value}<br> Message: ${inputMessage.value} `;
  Email.send({
    SecureToken : "c300c30e-e2df-425f-9c61-0b24e3f761eb",
    To : 'khaledalnashi0@gmail.com',
    From : "khaledalnashi0@gmail.com",
    Subject : "This is the subject",
    Body : bodyMessage
}).then(
  message => {
    if (message == "OK") {
        Swal.fire({
          title: "Success!",
          text: "Message sent successfully!",
          icon: "success"
      });
    }
  }
);
}
function checkInputs() { 
  const items = document.querySelectorAll(".item");
  for (const item of items) {
    if (item.value == "") {
      item.classList.add("error");
      item.parentElement.classList.add("error");
    }
    if (items[1].value != "") {
      checkEMail();
    }
    items[1].addEventListener("keyup", () => {
      checkEMail();
    })
    item.addEventListener("keyup", () => {
      if (item.value != "") {
        item.classList.remove("error");
        item.parentElement.classList.remove("error");
      } else {
        item.classList.add("error");
        item.parentElement.classList.add("error");
      }
    });
  }
}
function checkEMail() {
  const emailRegex =/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
  if (!inputMail.value.match(emailRegex)){
    inputMail.classList.add("error");
    inputMail.parentElement.classList.add("error");
  } else {
    inputMail.classList.remove("error");
    inputMail.parentElement.classList.remove("error");
  }
} 
form.addEventListener("submit", (e) => {
  e.preventDefault();
  checkInputs();
  if (!inputName.classList.contains("error") && !inputMail.classList.contains("error") && !inputMessage.classList.contains("error") ){
    sendEmail();
    form.reset();
    return false;
  }
})
