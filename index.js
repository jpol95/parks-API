function getParks(search, max=10, stateInput){
let url = `https://developer.nps.gov/api/v1/parks?`
let params = {
     api_key: `pUWTrOeEwc0fhkVKgb0XK3tszETIDcEXwXFDQhFK`, q:  search, limit: max, stateCode: stateInput
}

url += formatParams(params)
console.log(url)
let display = fetch(url)
    display.then((response) => response.json()).then((json) =>{
        displayResults(json.data)
        console.log(json)
    })
}

// function formatParams(params){
//     let result = Object.keys(params).map((key) => {
//         if (key == "stateCode") return `${encodeURIComponent(key)}=${encodeURIComponent(params[key][0])}`
//        return `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`
//     })
//      result = result.join('&')
//     for (let i = 1; i < params.stateCode.length; i++){
//         result += `&${encodeURIComponent('stateCode')}=${encodeURIComponent(params.stateCode[i])}`
//     }
//     return result
// }

function formatParams(params){
    let result = Object.keys(params).map((key) => {
       return `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`
    })
    result = result.join('&')
    return result

}

function displayResults(parks){
    //console.log(parks)
    $('ul').empty()
    $('.results').removeClass('hidden')
    for (let i = 0; i < parks.length; i++){
    $('ul').append(`<li> Park name: ${parks[i].fullName} <br>
                         Description: ${parks[i].description} <br>
                         Visit their website: ${parks[i].url}`)
    }
}


function handleSubmit(){
    $('body').on('submit', '.search', function(e){
        e.preventDefault()
        let search = $('.query').val()
        let max = $('.max-result').val()
        let states = $('.states').val()
       // states = states.split(",")
        console.log(states)
        getParks(search, max, states)
    })
}

function main(){
    handleSubmit()
}

$(main)