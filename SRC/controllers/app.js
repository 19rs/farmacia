const express = require('express')
const server = express()
const clientesRouter = require('./controllerClientes')
const fornecedoresRouter = require('./controllerFornecedores')
const medicamentosRouter = require('./controllerMedicamentos')
const vendasRouter = require('./controllerVendas')
const fs = require('fs')
const cors = require('cors')

// função para utilizar o servidor
server.use(express.json())
server.use(cors())

server.use('/api', clientesRouter.server)
server.use('/api', fornecedoresRouter.server)
server.use('/api', medicamentosRouter.server)
server.use('/api', vendasRouter.server)

// mensagem no terminal para indicar o funcionamento
server.listen(3000, () =>{
    console.log(`O servidor está funcionando! :D`);
})


/*
//CRUD Medicamentos:
server.post("/medicamentos", (req, res) => {
    const novoMedicamento = req.body

    if(!novoMedicamento.id || !novoMedicamento.nome || !novoMedicamento.preco || !novoMedicamento.fabricante || !novoMedicamento.quantidade) {
        return res.status(400).json({mensagem: "Dados incompletos, tente novamente"})
    } else {
        dados.medicamentos.push(novoMedicamento)
        salvarDados(dados)
        return res.status(201).json({mensagem: "Novo medicamento cadastrado com sucesso."})
    }
})

server.get("/medicamentos", (req, res) => {
    return res.json(dados.medicamentos)
})

server.put("/medicamentos/:id", (req, res) => {
    const medicamentoId = parseInt(req.params.id)
    const atualizarMedicamento = req.body
    const idMedicamento = dados.medicamentos.findIndex(m => m.id === medicamentoId)

    if(idMedicamento === -1) {
        return res.status(404).json({mensagem: "Medicamento não encontrado"})
    } else {
        dados.medicamentos[idMedicamento].nome = atualizarMedicamento.nome || dados.medicamentos[idMedicamento].nome
        dados.medicamentos[idMedicamento].preco  = atualizarMedicamento.preco || dados.medicamentos[idMedicamento].preco
        dados.medicamentos[idMedicamento].fabricante  = atualizarMedicamento.fabricante || dados.medicamentos[idMedicamento].fabricante
        dados.medicamentos[idMedicamento].quantidade  = atualizarMedicamento.quantidade || dados.medicamentos[idMedicamento].quantidade

        salvarDados(dados)
        return res.status(201).json({mensagem: "Medicamento atualizado com sucesso."})
    }
})

server.delete("/medicamentos/:id", (req, res) => {
    const medicamentoId = parseInt(req.params.id)

    dados.medicamentos = dados.medicamentos.filter(m => m.id !== medicamentoId)

    salvarDados(dados)

    return res.status(200).json({mensagem: "Medicamento excluído com sucesso"})
})



//CRUD Clientes:
server.post("/clientes", (req, res) => {
    const novoCliente = req.body

    if(!novoCliente.id || !novoCliente.nome || !novoCliente.endereco || !novoCliente.email || !novoCliente.telefone) {
        return res.status(400).json({mensagem: "Dados incompletos, tente novamente"})
    } else {
        dados.clientes.push(novoCliente)
        salvarDados(dados)
        return res.status(201).json({mensagem: "Novo cliente cadastrado com sucesso."})
    }
})

server.get("/clientes", (req, res) => {
    return res.json(dados.clientes)
})

server.put("/clientes/:id", (req, res) => {
    const clienteId = parseInt(req.params.id)
    const atualizarCliente = req.body
    const idCliente = dados.clientes.findIndex(c => c.id === clienteId)

    if(idCliente === -1) {
        return res.status(404).json({mensagem: "Cliente não encontrado"})
    } else {
        dados.clientes[idCliente].nome = atualizarCliente.nome || dados.clientes[idCliente].nome
        dados.clientes[idCliente].endereco  = atualizarCliente.endereco || dados.clientes[idCliente].endereco
        dados.clientes[idCliente].email  = atualizarCliente.email || dados.clientes[idCliente].email
        dados.clientes[idCliente].telefone  = atualizarCliente.telefone || dados.clientes[idCliente].telefone

        salvarDados(dados)
        return res.status(201).json({mensagem: "Cliente atualizado com sucesso."})
    }
})

server.delete("/clientes/:id", (req, res) => {
    const clienteId = parseInt(req.params.id)

    dados.clientes = dados.clientes.filter(c => c.id !== clienteId)

    salvarDados(dados)

    return res.status(200).json({mensagem: "Cliente excluído com sucesso"})
})



//CRUD Fornecedores:
server.post("/fornecedores", (req, res) => {
    const novoFornecedor = req.body

    if(!novoFornecedor.id || !novoFornecedor.nome || !novoFornecedor.endereco || !novoFornecedor.telefone) {
        return res.status(400).json({mensagem: "Dados incompletos, tente novamente"})
    } else {
        dados.fornecedores.push(novoFornecedor)
        salvarDados(dados)
        return res.status(201).json({mensagem: "Novo fornecedor cadastrado com sucesso."})
    }
})

server.get("/fornecedores", (req, res) => {
    return res.json(dados.fornecedores)
})

server.put("/fornecedores/:id", (req, res) => {
    const fornecedorId = parseInt(req.params.id)
    const atualizarFornecedor = req.body
    const idFornecedor = dados.clientes.findIndex(f => f.id === fornecedorId)

    if(idFornecedor === -1) {
        return res.status(404).json({mensagem: "Fornecedor não encontrado"})
    } else {
        dados.fornecedores[idFornecedor].nome = atualizarFornecedor.nome || dados.fornecedores[idFornecedor].nome
        dados.fornecedores[idFornecedor].endereco  = atualizarFornecedor.endereco || dados.fornecedores[idFornecedor].endereco
        dados.fornecedores[idFornecedor].telefone  = atualizarFornecedor.telefone || dados.fornecedores[idFornecedor].telefone

        salvarDados(dados)
        return res.status(201).json({mensagem: "Fornecedor atualizado com sucesso."})
    }
})

server.delete("/fornecedores/:id", (req, res) => {
    const fornecedorId = parseInt(req.params.id)

    dados.fornecedores = dados.fornecedores.filter(f => f.id !== fornecedorId)

    salvarDados(dados)

    return res.status(200).json({mensagem: "Fornecedor excluído com sucesso"})
})



//CRUD Vendas:
server.post("/vendas", (req, res) => {
    const novaVenda = req.body

    if(!novaVenda.id || !novaVenda.data || !novaVenda.id_medicamento || !novaVenda.id_cliente) {
        return res.status(400).json({mensagem: "Dados incompletos, tente novamente"})
    } else {
        dados.vendas.push(novaVenda)
        salvarDados(dados)
        return res.status(201).json({mensagem: "Nova venda cadastrada com sucesso."})
    }
})

server.get("/vendas", (req, res) => {
    return res.json(dados.vendas)
})

server.put("/vendas/:id", (req, res) => {
    const vendaId = parseInt(req.params.id)
    const atualizarVenda = req.body
    const idVenda = dados.vendas.findIndex(v => v.id === vendaId)

    if(idVenda === -1) {
        return res.status(404).json({mensagem: "Venda não encontrada"})
    } else {
        dados.vendas[idVenda].data = atualizarVenda.data || dados.vendas[idVenda].data
        dados.vendas[idVenda].id_medicamento  = atualizarVenda.id_medicamento || dados.vendas[idVenda].id_medicamento
        dados.vendas[idVenda].id_cliente  = atualizarVenda.id_cliente || dados.vendas[idVenda].id_cliente

        salvarDados(dados)
        return res.status(201).json({mensagem: "Venda atualizada com sucesso."})
    }
})

server.delete("/vendas/:id", (req, res) => {
    const vendaId = parseInt(req.params.id)

    dados.vendas = dados.vendas.filter(v => v.id !== vendaId)

    salvarDados(dados)

    return res.status(200).json({mensagem: "Venda excluída com sucesso"})
})


function salvarDados() {
    fs.writeFileSync(__dirname + "/DATA/dados.json", JSON.stringify(dados, null, 2))
}
*/












