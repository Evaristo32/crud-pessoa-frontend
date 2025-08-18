const API_URL = 'http://localhost:8080/api/v1/pessoa'; // Altere se o backend estiver em outra porta

document.getElementById('pessoa-form')
    .addEventListener('submit', async function (event) {
        event.preventDefault();

        const id = document.getElementById('pessoa-id').value;
        const nome = document.getElementById('nome').value;
        const email = document.getElementById('email').value;

        const pessoa = {nome, email};

        try {
            if (id) {
                await fetch(`${API_URL}/${id}`, {
                    method: 'PUT',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify(pessoa)
                });
            } else {
                await fetch(API_URL, {
                    method: 'POST',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify(pessoa)
                });
            }

            limparForm();
            await carregarPessoas();
        } catch (e) {
            alert('Erro ao salvar pessoa!');
            console.error(e);
        }
    });


function limparForm() {

    document.getElementById('pessoa-id').value = '';
    document.getElementById('nome').value = '';
    document.getElementById('email').value = '';
}

async function carregarPessoas() {
    try {
        const response = await fetch(API_URL);
        if (!response.ok) {
            throw new Error("Erro ao buscar dados da API");
        }

        const pessoas = await response.json();
        const tbody = document.querySelector("#pessoas-table tbody");
        tbody.innerHTML = "";

        pessoas.forEach(pessoa => {
            const row = document.createElement("tr");

            const idBtnAlterar = `pessoa-${pessoa.id}-alterar`;

            row.innerHTML = `
                <td>${pessoa.id}</td>
                <td>${pessoa.nome}</td>
                <td>${pessoa.email}</td>
                <td>
                     <button  id="${idBtnAlterar}" class="btn-editar" title="Editar">✏️</button>
                </td>
            `;

            row.querySelector(`#${idBtnAlterar}`).addEventListener('click', () => preencherFormParaEdicao(pessoa))

            tbody.appendChild(row);
        });

    } catch (error) {
        console.log(error);
    }
}

function preencherFormParaEdicao(pessoa) {
    document.getElementById('pessoa-id').value = pessoa.id;
    document.getElementById('nome').value = pessoa.nome;
    document.getElementById('email').value = pessoa.email;
}

document.addEventListener("DOMContentLoaded", carregarPessoas);
