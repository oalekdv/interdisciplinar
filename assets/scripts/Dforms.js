document.addEventListener("DOMContentLoaded", function() {
  // Elementos dos radio buttons
  const anonimaRadio = document.getElementById('anonima');
  const identificadaRadio = document.getElementById('identificada');

  // Elementos a serem mostrados/ocultados
  const nomeIdentificado = document.getElementById('nomeIdentificado');
  const telefoneIdentificado = document.getElementById('telefoneIdentificado');
  const descricaoIdentificada = document.getElementById('descricaoIdentificada');
  const anexoIdentificado = document.getElementById('anexoIdentificado');

  const descricaoAnonima = document.getElementById('descricaoAnonima');
  const anexoAnonima = document.getElementById('anexoAnonima');

  // Função para mostrar ou esconder os campos conforme a seleção
  function alternarCampos() {
      if (anonimaRadio.checked) {
          // Exibe os campos para denúncia anônima
          descricaoAnonima.style.display = 'block';
          anexoAnonima.style.display = 'block';
          
          // Esconde os campos para denúncia com identificação
          nomeIdentificado.style.display = 'none';
          telefoneIdentificado.style.display = 'none';
          descricaoIdentificada.style.display = 'none';
          anexoIdentificado.style.display = 'none';
      } else if (identificadaRadio.checked) {
          // Exibe os campos para denúncia com identificação
          nomeIdentificado.style.display = 'block';
          telefoneIdentificado.style.display = 'block';
          descricaoIdentificada.style.display = 'block';
          anexoIdentificado.style.display = 'block';
          
          // Esconde os campos para denúncia anônima
          descricaoAnonima.style.display = 'none';
          anexoAnonima.style.display = 'none';
      }
  }

  // Função para buscar o endereço a partir do CEP
  function buscarEndereco(cep, campoEndereco) {
      const cepFormatado = cep.replace(/\D/g, ''); // Remove caracteres não numéricos
      if (cepFormatado.length === 8) {
          fetch(`https://viacep.com.br/ws/${cepFormatado}/json/`)
              .then(response => response.json())
              .then(data => {
                  if (!data.erro) {
                      campoEndereco.value = data.logradouro;
                  } else {
                      campoEndereco.value = 'Endereço não encontrado';
                  }
              })
              .catch(error => {
                  campoEndereco.value = 'Erro ao buscar endereço';
              });
      } else {
          campoEndereco.value = '';
      }
  }

  // Event listeners para alternar entre os tipos de denúncia
  anonimaRadio.addEventListener('change', alternarCampos);
  identificadaRadio.addEventListener('change', alternarCampos);

  // Chama a função ao carregar a página para garantir que os campos sejam exibidos corretamente
  alternarCampos();

  // Event listener para buscar o endereço ao digitar o CEP (Denúncia Anônima e com Identificação)
  document.getElementById('cep').addEventListener('blur', function() {
      buscarEndereco(this.value, document.getElementById('endereco'));
  });
  document.getElementById('cepIdentificado').addEventListener('blur', function() {
      buscarEndereco(this.value, document.getElementById('enderecoIdentificado'));
  });
});

function apagar() {
    
}