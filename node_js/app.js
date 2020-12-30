const express = require("express");
const app = express();
const handlebars = require("express-handlebars");
const bodyParser = require("body-parser")
const moment = require('moment')
const Pagamento = require("./models/Pagamento")


app.engine('handlebars', handlebars({
    defaultLayout: 'main',
    helpers: {
        formatDate: (date) => {
            return moment(date).format('DD/MM/YYYY')
        }
    }
}))
app.set('view engine', 'handlebars')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

//Rotas

app.get('/', function (req, res){
    res.render('index');
})

app.get('/pagamento', function(req, res){
    Pagamento.findAll({order: [['id', 'DESC']]}).then(function(pagamentos){
        res.render('pagamento', {pagamentos: pagamentos});
    })
    
});

app.get('/cad-pagamento', function(req, res){
    res.render('cad-pagamento');
});

app.post('/add-pagamento', function(req, res){
    Pagamento.create({
        nome: req.body.nome,
        valor: req.body.valor
    }).then(function(){
        res.redirect('/pagamento')
        //res.send("Pagamento cadastro com sucesso!")
    }).catch(function(erro){
        res.send("Erro: Pagamento não foi cadastrado com sucesso!" + erro)
    })
    //res.send("Nome: " + req.body.nome + "<br>Valor: " + req.body.valor + "<br>") 
})


app.get('/del-pagamento/:id', function(req,res){
    Pagamento.destroy({
        where: {'id': req.params.id}
    }).then(function(){
        res.redirect('/pagamento')
        res.send("Pagamento apagado com sucesso!")
    }).catch(function(erro){
        res.send("Pagamento não foi apagado com sucesso!");
    })
})

app.listen(8080);