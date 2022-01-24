const csv = require('csv-parser');
const fs = require('fs')
const { resourceLimits } = require('worker_threads')

//Async
console.log('START')
fs.readFile('input_countries.csv', (err,data) => {
    if(err){
        console.log(err)
        return
    }

    console.log(data)
})

console.log("END")

//checks before hand if txt files are created
fs.unlink('canada.txt', (err) => {
    if(err){
        console.log(err)
        return
    }
    console.log("File Deleted...")
})

fs.unlink('usa.txt', (err) => {
    if(err){
        console.log(err)
        return
    }
    console.log("File Deleted...")
})



const countries = []

fs.createReadStream('input_countries.csv')
    .pipe(csv({}))
    .on('data', (data) => countries.push(data)) //pushes data into the array 
    .on('end', (canada = '', usa = '') => {
        for (var i = 0; i != countries.length; i++){
            //if country matches, it stores into it's countries variable
            if(countries[i].country == "Canada"){
                canada += `${countries[i].country} ${countries[i].year} ${countries[i].population}\n`
            }

            if(countries[i].country == "United States"){
                usa += `${countries[i].country} ${countries[i].year} ${countries[i].population}\n`
            }
        }
        console.log(canada)
        console.log(usa)

        //writes each country txt file, and stores country data
        fs.writeFile('canada.txt',canada, function(err){
            if(err){
                return console.error(err);
            }
        })
        fs.writeFile('usa.txt', usa, function(err){
            if(err){
                return console.error(err);
            }
        })
    })
    
