window.addEventListener('load', () => {
    let long 
    let lat
    let temperatureDescription = document.querySelector('.temperature-description')
    let temperatureDegree = document.querySelector('.temperature-degree')
    let locationTimezone = document.querySelector('.location-timezone')
    let temperatureSection = document.querySelector('.temperature')
    let temperatureSpan = document.querySelector('.temperature span')

    if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            long = position.coords.longitude
            lat = position.coords.latitude
            const proxy = 'https://cors-anywhere.herokuapp.com'
            const api = `${proxy}/https://api.darksky.net/forecast/d65ac86c763957556ef3c18076f8f34d/${lat},${long}`
            
            fetch(api)
            .then(res => {
                return res.json()
            })
            .then(data => {
                // console.log(data)
                const {temperature, summary, icon} = data.currently
                //Set DOM Elements from the API
                temperatureDegree.textContent = temperature
                temperatureDescription.textContent = summary
                locationTimezone.textContent = data.timezone

                let celsius = (temperature - 32) * (5/9)

                setIcons(icon, document.querySelector('.icon'))

                // C -> F
                temperatureSection.addEventListener('click', () => {
                    if(temperatureSpan.textContent==='F') {
                        temperatureSpan.textContent = 'C'
                        temperatureDegree.textContent = celsius.toFixed(2)

                    } else {
                        temperatureSpan.textContent = 'F'
                        temperatureDegree.textContent = temperature
                    }
                })
            })
        })
    } 

    function setIcons(icon, iconID) {
        const skycons = new Skycons({color: "white"})
        const currentIcon = icon.replace(/-/g, "_").toUpperCase()
        skycons.play()
        return skycons.set(iconID, Skycons[currentIcon])
    }
}) 