//DOM elements
const time = document.querySelector('#time'),
    greeting = document.getElementById('greeting'),
    userName = document.getElementById('name'),
    focusT = document.getElementById('focus');


//am or pm option -set to false if you dont want it to show
const showAmPm = true
// Show Time 
function showTime () {
    let today = new Date(),
        hour = today.getHours(),
        min = today.getMinutes(),
        sec = today.getSeconds();
    // console.log(hour, min, sec)
    // set AM or PM
    const amPm = hour >= 12 ? 'PM' : 'AM';


    // 12hr format
    hour = hour % 12 || 12;

    //output time

    time.innerHTML = `${hour}<span>:</span>${addZero(min)}<span>:</span>${addZero(sec)} ${showAmPm
     ? amPm : ''}`

    setTimeout(showTime, 1000);
}

//add Zeros
function addZero(num) {
    return (parseInt(num, 10) < 10 ? '0' : '') + num
}

// Set background and greeting
function setBgGreet () {
    let today = new Date(),
        hour = today.getHours();

    if(hour < 12) {
        //morning
        document.body.style.backgroundImage = "url('../imgs/morning.png')"
        greeting.textContent = 'Good Morning'
    }else if (hour < 18) {
        //afternoon
        document.body.style.backgroundImage = "url('../imgs/dva.jpg')"
        greeting.textContent = 'Good Afternoon'
        document.body.style.color = 'white'
    }else if (hour < 22) {
        //evening/night
        document.body.style.backgroundImage = "url('../imgs/night.png')"
        greeting.textContent = 'Good Evening'
    } else if (hour < 6) {
        document.body.style.backgroundImage = "url('../imgs/night.png')"
        greeting.textContent = 'Good Night'
    }

}

// Get Name
function getName() {
    if(localStorage.getItem('name') === null) {
        userName.textContent = 'Enter Name';
    } else {
        userName.textContent = localStorage.getItem('name');
    }
}
//set Name
function setName(e) {
    if (e.type === 'keypress') {
        // Make sure enter is pressed
        if(e.which == 13 || e.keyCode == 13) {
        localStorage.setItem('name', e.target.innerText);
       userName.blur();
        }
    }else { //blur
        localStorage.setItem('name', e.target.innerText);
    }
}


//getFocus
function getFocus() {
    if(localStorage.getItem('focus') === null) {
        focusT.textContent = 'Enter Focus';
    } else {
        focusT.textContent = localStorage.getItem('focus');
    }
}

//set Focus
function setFocus(e) {
    if (e.type === 'keypress') {
        // Make sure enter is pressed
        if(e.which == 13 || e.keyCode == 13) {
        localStorage.setItem('focus', e.target.innerText);
       focus.blur();
        }
    }else { //blur
        localStorage.setItem('focus', e.target.innerText);
    }
}

userName.addEventListener('keypress', setName)
userName.addEventListener('blur', setName)

focusT.addEventListener('keypress', setFocus)
focusT.addEventListener('blur', setFocus)




//* Weather api

const degreeNode = document.querySelector('.c-or-f')
const iconNode = document.querySelector('.icon')
const tempSpan = document.getElementById('Celcius')
const weatherHeader = document.querySelector('.weather')
if(navigator.geolocation) { //executes only if location is accepted
    navigator.geolocation.getCurrentPosition( position => {
        //getting cords
        let long = position.coords.longitude;
        let lat = position.coords.latitude;
        console.log(long, lat)

        let apiWeather = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=b3a3fbbf81e8bdc77974aabfd1084598`;
        
        //api call
        fetch(apiWeather)
        .then(response => {
            return response.json();
        }).then(response => {
            console.log(response)
            
            let celciusRes = response.main.temp - 273.15;
            let celcius = celciusRes.toFixed(1)
            console.log(celcius)

            let fahRes = 9/5 * (response.main.temp - 273) + 32
            let fah = fahRes.toFixed(1)
            console.log(fah)

            weatherHeader.addEventListener('click', () => {
                if (tempSpan.textContent === '°C') {
                    degreeNode.textContent = fah
                    tempSpan.textContent = '°F'
                } else {
                    degreeNode.textContent = celcius
                    tempSpan.textContent = '°C'
                }
            })
            
        })
    });
}

//*run
showTime()
setBgGreet()
getName()
getFocus()