document.addEventListener('DOMContentLoaded', function (){
    //função que carrega a lista de clientes ao entrar na pag
    loadClientesList();

    //Add um listener do formulario para add clientes
    document.getElementById('formAdicionarCliente').addEventListener('submit', function (event){
        event.preventDefault()
        adicionarCliente()
    })
})

function adicionarCliente() {
    const id = document.getElementById('idCliente').value
    const nome = document.getElementById('nomeCliente').value
    const endereco = document.getElementById('enderecoCliente').value
    const email = document.getElementById('emailCliente').value
    const telefone = document.getElementById('telefoneCliente').value

    fetch('http://localhost:3000/api/clientes', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            id: id,
            nome: nome,
            endereco: endereco,
            email: email,
            telefone: telefone
        }),
    })
    .then(response => response.json())
    .then(data => {
        console.log(data)
        loadClientesList()
    })
    .catch(error => console.error("Erro:", error))
}

function loadClientesList() {
    fetch('http://localhost:3000/api/clientes')
        .then(response => response.json())
        .then(data => displayClientesList(data))
        .catch(error => console.error("Erro:", error))
}

function displayClientesList(data) {
    const listaClientes = document.getElementById('listaClientes')
    listaClientes.innerHTML = ''

    data.forEach(cliente =>{
        const listItem = document.createElement('li')
        listItem.innerHTML = `<b>ID:</b> ${cliente.id} <br> <b>Nome:</b> ${cliente.nome} <br> <b>Email:</b> ${cliente.email} <br> <b>Endereço:</b> ${cliente.endereco} <br> <b>Telefone:</b> ${cliente.telefone}`
        listaClientes.appendChild(listItem)
    })
}

function loadClientePorID(id) {

const url = `http://localhost:3000/api/clientes/${clienteId}`;
    
    fetch(url)
        .then(response => response.json())
        .then(data => displayCliente(data))
        .catch(error => console.error("Erro:", error));
}

function displayCliente(cliente) {
    const listaClientes = document.getElementById('listaClientes');
    listaClientes.innerHTML = '';

    const listItem = document.createElement('li');
    listItem.innerHTML = `<b>ID:</b> ${cliente.id} <br> <b>Nome:</b> ${cliente.nome} <br> <b>Email:</b> ${cliente.email} <br> <b>Endereço:</b> ${cliente.endereco} <br> <b>Telefone:</b> ${cliente.telefone}`;
    listaClientes.appendChild(listItem);
}