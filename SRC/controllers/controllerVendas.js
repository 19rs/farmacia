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

        novaVenda._links = {
            self: { href: `/vendas/${novaVenda.id}` },
            update: { href: `/vendas/${novaVenda.id}/update` },
            delete: { href: `/vendas/${novaVenda.id}/delete` }
        };

        dadosVendas.Venda.push(novaVenda)
        salvarDados(dadosVendas)
        return res.status(201).json({mensagem: "Novo medicamento cadastrado com sucesso!"})
    }
})

// consumir dados da API === Read do CRUD
server.get('/vendas', (req, res) => {
    return res.json(dadosVendas.Venda)
})

server.get('/vendas/:id', (req, res) => {
    
    const vendaId = parseInt(req.params.id)

    const venda = dadosVendas.Venda.find(v => parseInt(v.id) === vendaId)

    if (!venda) {
        return res.status(404).json({mensagem: "Venda não encontrada :/"})
    }
    
    return res.json(venda);
})

function salvarDados(){
    fs.writeFileSync(__dirname + '/data/dadosVendas.json', JSON.stringify(dadosVendas, null, 2))
}

module.exports = {server, salvarDados}