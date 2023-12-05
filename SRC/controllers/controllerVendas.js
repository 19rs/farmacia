const express = require('express')
const server = express()
const dadosVendas = require('./data/dadosVendas.json')
const fs = require('fs')

// função para utilizar o servidor
server.use(express.json())

// salvar/inserir dados no JSON === Create do CRUD
server.post('/vendas', (req, res) => {
    const novaVenda = req.body

    if(!novaVenda.data || !novaVenda.id_medicamento || !novaVenda.id_cliente) {
        return res.status(400).json({mensagem: "Dados incompletos, tente novamente"})
    } else {
        dadosVendas.Venda.push(novaVenda)
        salvarDados(dadosVendas)
        return res.status(201).json({mensagem: "Novo medicamento cadastrado com sucesso!"})
    }
})

// consumir dados da API === Read do CRUD
server.get('/vendas', (req, res) => {
    return res.json(dadosVendas.Venda)
})


function salvarDados(){
    fs.writeFileSync(__dirname + '/data/dadosVendas.json', JSON.stringify(dadosVendas, null, 2))
}

module.exports = {server, salvarDados}