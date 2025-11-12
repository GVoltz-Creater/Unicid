console.log("Chicken :)")

function EnviarMensagem() {
    const assunto = document.getElementById('assunto').value.trim();
    const mensagem = document.getElementById('mensagem') ? document.getElementById('mensagem').value.trim() : '';
    const nome = document.getElementById('nome') ? document.getElementById('nome').value.trim() : '';
    const email = document.getElementById('email') ? document.getElementById('email').value.trim() : '';

    if (!assunto || !mensagem || !nome || !email) {
        alert('Por favor, preencha todos os campos obrigatórios antes de enviar.');
    } else {
        alert('Sua solicitação sobre ' + assunto + ' foi enviada com sucesso!');
    }
}

function EnviarMensagemII() {
    const nome = document.getElementById('nome').value.trim() ? document.getElementById('nome').value.trim() : '';
    const email = document.getElementById('email').value.trim() ? document.getElementById('email').value.trim() : '';
    const telefone = document.getElementById('telefone').value.trim() ? document.getElementById('telefone').value.trim() : '';
    const vaga = document.getElementById('vaga').value.trim();
    const curriculo = document.getElementById('curriculo').value.trim();
    const lgpd = document.getElementById('lgpd').value.trim() ? document.getElementById('lgpd').value.trim() : '';

    if (!nome || !email || !telefone || !curriculo || !lgpd || !vaga) {
        alert('Por favor, preencha todos os campos obrigatórios antes de enviar.');
    } else {
        alert('Sua solicitação sobre ' + vaga + ' foi enviada com sucesso!');
    }
}