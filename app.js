//copying my own api key from open weather website
const api = {
    key: "50c4fca0ea652c82abf8578c36e9cb2d",
    base: "https://api.openweathermap.org/data/2.5/"
  }
  
  //check when our search button is hit
  const searchbox = document.querySelector('.search-box')
  searchbox.addEventListener('keypress', setQuery);
  
  //getting out results, our user has to press  enter for it to function
  function setQuery(evt) {
    if (evt.keyCode == 13) {
      getResults(searchbox.value)
    }
  }
  
  //attaching weather with api
  function getResults (query) {
      if(query.length == 0){
        alert ('Please put in a city')
        return
      }


      
   // Talking to the api before we display results that our user puts in the correct values
    fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
      .then(weather => {
        return weather.json();
      }).then(displayResults)
      .catch( err =>{
        console.log(err)
        alert('This wasn`t found')
    })
      
  }
   //displaying our results 
  function displayResults (weather) {
    let city = document.querySelector('.location .city');
    city.innerText = `${weather.name}, ${weather.sys.country}`
  

    //getting new date then building datebuilder
    let now = new Date();
    let date = document.querySelector('.location .date')
    date.innerText = dateBuilder(now)

    //building dates for respective months and days of the week
  function dateBuilder (d) {
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
  
    //getting day, date, month and year. which updates to todays date 
    let day = days[d.getDay()]
    let date = d.getDate()
    let month = months[d.getMonth()]
    let year = d.getFullYear()
  
    return `${day} ${date} ${month} ${year}`
  }
  

  //getting temp
    let temp = document.querySelector('.current .temp')
    temp.innerHTML = `${Math.round(weather.main.temp)}<span>°c</span>`
  
    //for weather element 
    let weather_el = document.querySelector('.current .weather')
    weather_el.innerText = weather.weather[0].main;
  
  }
  
  