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

function salvarFuncionario(event){
    event.preventDefault();

    const form = document.getElementById('form-funcionarios');
    const nome = document.getElementById('nome').value;
    const idade = Number(document.getElementById('idade').value);
    const cargo = document.getElementById('cargo').value;
    const salario = Number(document.getElementById('salario').value);
    const mensagem = document.getElementById('mensagem');

    if (nome.trim() === '' || cargo.trim() === ''){
        mensagem.textContent = 'Nome e cargo são obrigatórios.';
        return;
    }

    if(idade<15 || salario<0){
        mensagem.textContent = 'Idade ou salário inválidos.';
        return;
    }

    const funcionario = new Funcionario(nome, idade, cargo, salario);

    funcionarios.push(funcionario);
    mensagem.style.color = 'green';
    mensagem.textContent = 'Funcionário cadastrado com sucesso!';
    
    console.log(funcionarios);
    renderTabela();
    
    form.reset();
}

function renderTabela(){
    const tbody = document.getElementById('tbody-funcionarios');
    tbody.innerHTML = '';

    for (let i = 0; i < funcionarios.length; i++){
        const func = funcionarios[i];
        const tr = document.createElement('tr');

        tr.innerHTML = `
            <td>${func.nome}</td>
            <td>${func.idade}</td>
            <td>${func.cargo}</td>
            <td>R$ ${func.salario.toFixed(2)}</td>
        `;

        tbody.appendChild(tr);
    }
}