const express = require("express");
const axios = require("axios");

const port = 8000;
const url = "https://857b70dc-c777-4af7-bd0b-592ca611d7f7.mock.pstmn.io/alunos";

const app = express();

app.set("view engine", "ejs");

app.get("/", (req, res) => {

    axios.get(url).then((response) => {

        res.render("../views/index", {
            nomeAluno: response.data[0].nome,
            RA: response.data[0].RA
        });
    });

});

app.listen(port, () => {
    console.log(`Servidor rodando em: http://localhost:${port}`);
});