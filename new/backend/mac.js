const crypto = require('crypto')

require('getmac').getMac(function(err, macAddress){
    if (err)  throw err
    let password = "AIS"+macAddress
    let hash = crypto.createHash('sha256')
    .update(password)
    .digest('hex')
    console.log(hash);
    
})


// GPS => 284ac0365174881eb91b057b8c25bbcf3cdbf13231929a208e2c6765f63bc415
// Route => a305b924fa8ee88ac34c2bc2286274b3f8fdc2b194524653440eb3880081d09b
// AIS => 60c5811eac8133c3d4e55af3f548b33f7769a6b0a46294f612ce246075bc1f6c