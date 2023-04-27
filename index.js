const express = require("express");
const bodyParser = require("body-parser")
const axios = require("axios");

const port = 8000;
const url = "https://857b70dc-c777-4af7-bd0b-592ca611d7f7.mock.pstmn.io";


const app = express();

app.use(bodyParser.urlencoded({ extended: true}))
app.set("view engine", "ejs");

app.get("/", (req, res) => {
    axios.get(url + "/alunos").then((response) => {
        res.render("../views/index", {
            aluno: response.data
        });
    }, (error) =>{
        res.render("../views/erro")
    });
});

app.get("/exibirAluno/:ra", (req, res) =>{
    axios.get(url + "/aluno/" + req.params.ra).then((response) => {
        res.render("../views/exibir", {
            aluno: response.data
        })
    }, (error) =>{
        res.render("../views/erro")
    });
})

app.get("/cadastroAluno", (req,res) => {
    res.render("../views/adicionar");
})

app.post("/adicionarAluno",(req,res) => {
    axios.post(url + "/aluno", req.body).then((response) =>{
        res.render("../views/sucesso", {
            aluno: response.data
            
        })
    }, (error) =>{
        res.render("../views/erro")
    });
})

app.get("/excluir/:ra", (req, res) => {
    axios.get(url + "/aluno/" + req.params.ra).then((response) => {
        res.render("../views/exclusao", {
            aluno: response.data
        })
    }, (error) =>{
        res.render("../views/erro")
    });
});

app.get("/excluirAluno/:ra", (req, res) => {
    axios.delete(url + "/aluno/" + req.params.ra).then((response) => {
        res.render("../views/sucesso", {
            resposta: response.data
        })
    }, (error) =>{
        res.render("../views/erro")
    });
});

app.get("/editar/:ra", (req,res)=>{
    axios.get(url + "/aluno/" + req.params.ra).then((response) => {
        res.render("../views/editar", {
            aluno: response.data
        })
    }, (error) =>{
        res.render("../views/erro")
    });
})

app.post("/editarAluno/:ra", (req,res)=>{
    axios.patch(url + "/aluno/" + req.params.ra, req.body).then((response) => {
        res.render("../views/sucesso", {
            resposta: response.data
        })
    }, (error) =>{
        res.render("../views/erro")
    });
})

app.listen(port, () => {
    console.log(`Servidor rodando em: http://localhost:${port}`);
});