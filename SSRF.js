//SSRF example
const axios = require('axios').default;
const express = require ('express');
const app = express();

app.get("/access", function(req, res){

    axios.get(req.query.url).then((response) => {
        res.status(response.status).send(response.data);
        console.log('ok');
    }).catch((error) => {
        console.log(error)
        res.status(400).send(error)
    })
});

app.listen(4004);




//Corretion
/*if(req.query.url.startsWith('https://microsoft.com')){
    res.status(response.status).send(response.data);
    console.log('URL permitida.');
    } else{
        res.send('URL não permitida!');
        console.log('URL nao permitida!');
    }
*/


//Not correction
/*res.status(response.status).send(response.data);
        console.log('ok');
    }).catch((error) => {
        console.log(error)
        res.status(400).send(error)
    })
*/

//example
//http://localhost:4004/access?url=http://ifconfig.com
