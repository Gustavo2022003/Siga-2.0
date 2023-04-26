const express = require("express");
const axios = require("axios");

const port = 8000;
const url = "https://857b70dc-c777-4af7-bd0b-592ca611d7f7.mock.pstmn.io/";


const app = express();

app.set("view engine", "ejs");

app.get("/", (req, res) => {
    axios.get(url + "alunos").then((response) => {
        res.render("../views/index", {
            aluno: response.data
        });
    });
});

app.get("/exibirAluno/:ra", (req, res) =>{
    axios.get(url + "aluno/" + req.params.ra).then((response) => {
        res.render("../views/index", {
            aluno: response.data
        })
    })
})

app.get("/cadastroAluno", (req,res) => {
    res.render("../views/");
})

app.post("/adicionar",(req,res) => {
    axios.post(url + "aluno",{
        nome: "Avalone", 
        RA: "432567", 
        data_de_nascimento: "04/03/2004"
    }).then((response) =>{
        console.log('FOI');
        res.send(response.data)
    }, (error) =>{
        res.send("Erro")
        console.log(error)
    });
})

app.get("/excluir", (req, res) => {
    axios.get(url + "aluno/" + req.params.ra).then((response) => {
        res.render("../views/exclusao", {
            aluno: response.data
        })
    })
});

app.get("/editar/:ra", (req,res)=>{
    axios.get(url + "aluno/" + req.params.ra).then((response) => {
        res.render("../views/index", {
            aluno: response.data
        })
    })
})

app.patch("/editarAluno/:ra", (req,res)=>{
    axios.patch(url + "aluno/" + req.params.ra, {"nome": "Teste", "data_de_nascimento": "19/01/2003"}).then((response) => {
        res.send("Sucesso")
    })
})

app.listen(port, () => {
    console.log(`Servidor rodando em: http://localhost:${port}`);
});