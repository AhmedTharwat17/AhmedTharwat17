// setting box
var settingBox = document.querySelector('.toggle .gear'),
    openToggle = document.querySelector('.setting-box');
settingBox.onclick = function(){
    this.classList.toggle('fa-spin');
    
    openToggle.classList.toggle('open');
};
// check if local storage color option
let mainColor = localStorage.getItem("color-option");
if(mainColor !== null){
    document.documentElement.style.setProperty('--main--color' , mainColor);
    document.querySelectorAll(".color-list li").forEach(element => {
        element.classList.remove("active");
        if(element.dataset.color === mainColor){
            element.classList.add('active');
        };
    });
}
// switch color
let colorLi = document.querySelectorAll('.color-list li');
colorLi.forEach( li => {
    li.addEventListener("click" , (e) => {
        document.documentElement.style.setProperty('--main--color' , e.target.dataset.color);

        localStorage.setItem("color-option" , e.target.dataset.color);

        handleActive(e);
    });
});


// landing page
let landingPage = document.querySelector('.landing-page'),
    landingArray = ["img1.webp" , "image2.jpg" , "image3.jpg" , "image4.jpg" , "image5.jpg"];

let backgroundOption = true ,
    intervalBack;
// locial storage
let backgroundStorage = localStorage.getItem("background-random");
if(backgroundStorage !== null){
    if(backgroundStorage === 'true'){
        backgroundOption = true;
    } else {
        backgroundOption = false;
    }
    document.querySelectorAll('.background-random span').forEach(element => {
        element.classList.remove('active');
    });
    if(backgroundStorage === 'true'){
        document.querySelector('.background-random .yes').classList.add('active');
    } else {
        document.querySelector('.background-random .no').classList.add('active');
    }
}
function randomImage(){
    if(backgroundOption === true){
        intervalBack = setInterval(() => {
            let numArray = Math.floor(Math.random() * landingArray.length);
            landingPage.style.backgroundImage = 'url("img/' + landingArray[numArray] + '")';  
        }, 2000);
    }
}
randomImage();
// switch random background
let randomBackground = document.querySelectorAll('.background-random span');
randomBackground.forEach( span => {
    span.addEventListener("click" , (e) => {

            handleActive(e);
            if(e.target.dataset.background === 'yes'){
                backgroundOption = true;
                randomImage();
                localStorage.setItem("background-random" , true);
            } else {
                backgroundOption = false;
                clearInterval(intervalBack);
                localStorage.setItem("background-random" , false);
            }
    });
});

// skills selector
let ourSkills = document.querySelector('.skills');
window.onscroll = function(){
    let  skillsOffsetTop = ourSkills.offsetTop;
    let  skillsOuterHeight = ourSkills.offsetHeight;
    let  windowHeight = this.innerHeight;
    let  windowScrollTop = this.pageYOffset;
    
    if(windowScrollTop > (skillsOffsetTop + skillsOuterHeight - windowHeight) - 100){
        let allSkill = document.querySelectorAll('.skill-box .skill-progress span');
        allSkill.forEach(skill => {
            skill.style.width = skill.dataset.progress;
        });
    }
    
}

// pop up gallery
let ourGallery = document.querySelectorAll(".gallery img");

ourGallery.forEach(img => {
    img.addEventListener('click' , (e) => {
        let overLay = document.createElement('div');
        overLay.className = 'popup-overlay';
        document.body.appendChild(overLay);
        let popBox = document.createElement("div")
        popBox.className = 'popup-box';
        // titel image 
        if(img.alt !== null){
            let imgHeading = document.createElement('h3');
            let imgText = document.createTextNode(img.alt);
            imgHeading.appendChild(imgText);
            popBox.appendChild(imgHeading);
        }
        document.body.appendChild(popBox);
        let popImage = document.createElement('img');
        popBox.appendChild(popImage);
        popImage.src = img.src;
        // close span
        let closeButton = document.createElement("span");
        let closeText = document.createTextNode("X");
        closeButton.appendChild(closeText);
        closeButton.className = 'close-button';
        popBox.appendChild(closeButton);
    });
});
// close popup
document.addEventListener('click' , function(e){
    if(e.target.className == 'close-button'){
        e.target.parentElement.remove();
        document.querySelector('.popup-overlay').remove();  
    } 
});

// select all bullets
const allBullet = document.querySelectorAll('.nav-bullets .ballet');

// select all links
const allLinks = document.querySelectorAll('.links a');

// function scrollintoview
function scrollIntoView(elements){
    elements.forEach(ele => {
        ele.addEventListener('click' , (e) => {
            e.preventDefault();
            document.querySelector(e.target.dataset.section).scrollIntoView({
                behavior : 'smooth'
            });
        });
    });
};
scrollIntoView(allBullet);
scrollIntoView(allLinks);

// function handle active state
function handleActive(ev){
    ev.target.parentElement.querySelectorAll(".active").forEach(element => {
        element.classList.remove("active");
    });
        ev.target.classList.add("active");
}

// bullets span
let bulletSpan = document.querySelectorAll('.bullets-option span');
let bulletContect = document.querySelector('.nav-bullets');
let bulletLocal = localStorage.getItem('bullets-option');

if(bulletLocal !== null){
    bulletSpan.forEach(span => {
        span.classList.remove('active');
    });
    if(bulletLocal === 'block'){
        bulletContect.style.display = 'block';
        document.querySelector(".bullets-option .yes").classList.add('active');
    } else {
        bulletContect.style.display = 'none';
        document.querySelector(".bullets-option .no").classList.add('active');
    }
}

bulletSpan.forEach(span => {
    span.addEventListener('click' , (e) => {
        if(span.dataset.display === 'show'){
            bulletContect.style.display = 'block';
            localStorage.setItem('bullets-option' , 'block');
        }else{
            bulletContect.style.display = 'none';
            localStorage.setItem('bullets-option' , 'none');
        }
        handleActive(e);
    });
});

// button reset
document.querySelector('.reset-option').onclick = function(){
    localStorage.clear();
    // localStorage.removeItem('bullets-option');
    // localStorage.removeItem('color-option');
    window.location.reload();
}

// toggle menu
let toggleBtn = document.querySelector('.toggle-menu');
let tLinks = document.querySelector('.links');

toggleBtn.onclick = function(e){
    e.stopPropagation();
    this.classList.toggle('menu-active');
    tLinks.classList.toggle('open');
};
// click any where
document.addEventListener('click' , (e) => {
    if(e.target !== toggleBtn && e.target !== tLinks){
        if(tLinks.classList.contains('open')){
            toggleBtn.classList.toggle('menu-active');
            tLinks.classList.toggle('open');
        };
    };
});
tLinks.onclick = function(e){
    e.stopPropagation();
};