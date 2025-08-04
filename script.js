
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
