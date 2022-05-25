//IDOR example

const http = require('http'); 
const express = require('express');
const dotenv = require("dotenv-safe").config();
const jwt = require('jsonwebtoken');
const app = express(); 
const bodyParser = require('body-parser');
const { config } = require('process');
const req = require('express/lib/request');

app.use(bodyParser.json());

//usuários a serem utilizados nos testes
const users = {
  123: {nome: "Joao", isAdmin: "true"}, 
  124: {nome: "Maria", isAdmin: "false"},
  125: {nome: "Bruno", isAdmin: "true"}
}

  app.use((req, res, next) => {
    if(req.path === "/login")
      return next()

    const token = req.headers['x-access-token'];
    if (!token) return res.status(401).json({ auth: false, message: 'Token não fornecido' });
    
    jwt.verify(token, process.env.SECRET, function(err, decoded) {
      if (err) return res.status(400).json({ auth: false, message: 'Falha ao se autenticar' });
      
      // se tudo estiver ok, salva no request para uso posterior
      req.userId = decoded.id;
      next();
    });
})
 
app.get('/', (req, res, next) => {
    res.json({message: "OK!"});
})

//Login
app.post('/login', (req, res, next) => {
  let user = users[req.body.id]
    if(user !== undefined){ 
      let payload = {id: req.body.id, nome: user.nome}
      console.log(JSON.stringify(payload))
      const token = jwt.sign(payload, process.env.SECRET, {
        expiresIn: 300000
      });
      return res.json({ auth: true, token: token });
    }
    
    res.status(400).json({message: 'Login inválido!'});
})
 
app.get('/users/:id', (req, res, next) => {
  return res.json(users[req.params.id])
  res.status(403).send()
});

//Logout
app.post('/logout', function(req, res) {
    res.json({ auth: false, token: null });
})
 
const server = http.createServer(app); 
server.listen(3000);
console.log("Servidor up, porta: 3000...")



//rota /user/id

/*if(req.userId === req.params.id)
  return res.json(users[req.params.id])
res.status(403).send()*/
