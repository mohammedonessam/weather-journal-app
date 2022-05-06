
// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+1+'.'+ d.getDate()+'.'+ d.getFullYear();

// call api key
const apikey = 'e3ad85d6cd09abd0fad8660cb1785612';
// call generate button
const generate = document.getElementById('generate');
// function to call weather data 
generate.addEventListener('click', async ()=> {
    // call felling input value
    const feelings = document.getElementById('feelings').value;
    // call zip code input alue
    const zipCode = document.getElementById('zip').value;

    try{
        const TheUrl = `https://api.openweathermap.org/data/2.5/weather?zip=${zipCode}&appid=${apikey}&units=metric`;
    
        const res = await fetch(TheUrl);
        const data = await res.json();
        // test zip code is empty or invalid
        if(!zipCode){
            document.getElementById('small').innerHTML= `Oops Enter Your Zip Code`
            console.log('oops enter ur Zip Code');
            setTimeout(__=>{
                document.getElementById('small').innerHTML= '';
            },2000);
        }
        // functions to call city name,temp
        const city = data.name;
        const temper = data.main.temp;
        // to get temp value integer
        const temp = Math.round(temper);
        

        await fetch('/postweather',{
            method: 'POST',
            credentials: 'same-origin',
            headers: {
                'Content-Type':'application/json'
            },
            body: JSON.stringify({
                date: newDate,
                feelings: feelings,
                city: city,
            })
        });

        const appRes = await fetch('/getweather');
        // transfer to json
        const finalData = await appRes.json();
        // test weather data
        console.log(finalData);
        // call all value and put it in html
        document.getElementById('date').innerHTML= `Date: ${newDate}`
        document.getElementById('temp').innerHTML= `Temp: ${temp} &degC`
        document.getElementById('content').innerHTML= `feeling: ${feelings}`
        document.getElementById('city').innerHTML= `City: ${city}`

  
    }catch(error){
        // test error
        console.log(error);
    }
})