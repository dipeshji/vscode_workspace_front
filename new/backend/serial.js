require('serialport').list(function (err, results)
{
if (err)
{
throw err;
}

results.forEach(com =>{console.log(com.comName);})

});