console.log('App Carregado');

class Funcionario{
    constructor(nome, idade, cargo, salario){
        this.nome = nome;
        this.idade = idade;
        this.cargo = cargo;
        this.salario = salario;
    }

    getNome(){return this.nome};
    setNome(novoNome){this.nome = novoNome};
    
    getIdade(){return this.idade};
    setIdade(novaIdade){this.idade = novaIdade};
    
    getCargo(){return this.cargo};
    setCargo(novoCargo){this.cargo = novoCargo};
    
    getSalario(){return this.salario};
    setSalario(novoSalario){this.salario = novoSalario};

    toString(){
        return `Nome: ${this.nome}, Idade: ${this.idade}, Cargo: ${this.cargo}, Salário: ${this.salario.toFixed(2)}`;
    }
}

const funcionarios = [];
let indiceOperacao = null;

const form = document.getElementById('form-funcionarios');
const tbody = document.getElementById('tbody-funcionarios')
const inputNome = document.getElementById('nome');
const inputIdade = document.getElementById('idade');
const inputCargo = document.getElementById('cargo');
const inputSalario = document.getElementById('salario');
const mensagem = document.getElementById('mensagem');
const btnSalvar = document.getElementById('btn-salvar');

form.addEventListener('submit', (event) =>{
    event.preventDefault();

    const nome = inputNome.value;
    const idade = Number(inputIdade.value);
    const cargo = inputCargo.value;
    const salario = Number(inputSalario.value);

    if (nome.trim() === '' || cargo.trim() === ''){
        mensagem.textContent = 'Nome e cargo são obrigatórios.';
        return;
    }

    if(idade<15 || salario<0){
        mensagem.textContent = 'Idade ou salário inválidos.';
        return;
    }

    
    if(indiceOperacao == null){
        const funcionario = new Funcionario(nome, idade, cargo, salario);
        funcionarios.push(funcionario);
        mensagem.style.color = 'green';
        mensagem.textContent = 'Funcionário cadastrado com sucesso!';
    }else{
        const funcionarioEditado =  funcionarios[indiceOperacao];
        funcionarioEditado.setNome(nome);
        funcionarioEditado.setIdade(idade);
        funcionarioEditado.setCargo(cargo);
        funcionarioEditado.setSalario(salario);
        
        mensagem.style.color = 'green';
        mensagem.textContent = 'Funcionário editado com sucesso!';
        indiceOperacao = null;
        btnSalvar.textContent = "Cadastrar";
    }
    console.log(funcionarios);
    renderTabela();
    form.reset();
});

tbody.addEventListener('click', (event) => {
    const botao = event.target;

    if(botao.classList.contains('btn-excluir')){
        const index = Number(botao.dataset.index);
        const func = funcionarios[index];
        funcionarios.splice(index,1);
        console.log('Funcionario excluido!');
        renderTabela();
    }

    if(botao.classList.contains('btn-editar')){
        const index = Number(botao.dataset.index);
        const func = funcionarios[index];

        inputNome.value = func.getNome();
        inputIdade.value = func.getIdade();
        inputCargo.value = func.getCargo();
        inputSalario.value = func.getSalario();

        indiceOperacao = index;

        btnSalvar.textContent = 'Salvar Edição';
        mensagem.style.color = 'blue';
        mensagem.textContent = `Editando Funcionário: ${func.nome}`;
    }
});

function renderTabela(){
    tbody.innerHTML = '';

    for (let i = 0; i < funcionarios.length; i++){
        const func = funcionarios[i];
        const tr = document.createElement('tr');

        tr.innerHTML = `
            <td>${func.getNome()}</td>
            <td>${func.getIdade()}</td>
            <td>${func.getCargo()}</td>
            <td>R$ ${func.getSalario().toFixed(2)}</td>
            <td>
                <button type="button" class="btn-editar" data-index="${i}">Editar</button>
                <button type="button" class="btn-excluir" data-index="${i}">Excluir</button>
            </td>
        `;  

        tbody.appendChild(tr);
    }
}