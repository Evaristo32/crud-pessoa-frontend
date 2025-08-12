
const API_URL = 'http://localhost:8080/api/v1/pessoa'; // Altere se o backend estiver em outra porta

document.getElementById('pessoa-form')
    .addEventListener('submit', async function (event) {
    event.preventDefault();

    const id = document.getElementById('pessoa-id').value;
    const nome = document.getElementById('nome').value;
    const email = document.getElementById('email').value;

    const pessoa = { nome, email };

    try {
        if (id) {
            await fetch(`${API_URL}/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(pessoa)
            });
        } else {
            await fetch(API_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(pessoa)
            });
        }

        limparForm();
        // listarPessoas();
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
            const tr = document.createElement("tr");
            tr.innerHTML = `
                <td>${pessoa.id}</td>
                <td>${pessoa.nome}</td>
                <td>${pessoa.email}</td>
            `;
            tbody.appendChild(tr);
        });

    } catch (error) {
        console.log(error);
    }
}

document.addEventListener("DOMContentLoaded", carregarPessoas);
