var tempoInicial = $('#tempo-digitacao').text()
var campo = $('.campo-digitacao')

jQuery(function () {
  atualizaTamanhoFrase()
  inicializaCronometro()
  inicializacaoContadores()
  inicializaMarcadores()
  $('#botao-reiniciar').click(reiniciaJogo)
})

function atualizaTamanhoFrase() {
  var frase = $('.frase').text()
  var numeroPalavras = frase.split(' ').length
  var tamanhoFrase = $('#tamanho-frase')
  tamanhoFrase.text(numeroPalavras)
}

function inicializacaoContadores() {
  campo.on('input', function () {
    var conteudo = campo.val()
    var qtdpalavras = conteudo.split(/\S+/).length - 1
    $('#contador-palavras').text(qtdpalavras)

    var qtdcaracteres = conteudo.length
    $('#contador-caracteres').text(qtdcaracteres)
  })
}

function inicializaCronometro() {
  var tempoRestante = $('#tempo-digitacao').text()
  campo.one('focus', function () {
    var cronometroID = setInterval(function () {
      tempoRestante--

      $('#tempo-digitacao').text(tempoRestante)
      if (tempoRestante < 1) {
        clearInterval(cronometroID)
        finalizaJogo()
      }
    }, 1000)
  })
}

function finalizaJogo() {
  campo.attr('disabled', true)
  campo.toggleClass('campo-desativado')
  inserePlacar()
}

//não funcionou perfeitamente
function inicializaMarcadores() {
  var frase = $('.frase').text()
  campo.on('input', function () {
    var digitado = campo.val()
    var comparavel = frase.substr(0, digitado.length)
    if (digitado == comparavel) {
      campo.addClass('borda-verde')
      campo.removeClass('borda-vermelha')
    } else {
      campo.addClass('borda-vermelha')
      campo.removeClass('borda-verde')
    }
  })
}

function inserePlacar() {
  var corpoTabela = $('.placar').find('tbody')
  var usuario = 'Douglas'
  var numPalavras = $('#contador-palavras').text()
  var botaoRemover =
    "<a href='#'><i class='small material-icons'>delete</i></a>"

  var linha = novaLinha(usuario, numPalavras)
  linha.find('.botao-remover').click(removeLinha)

  corpoTabela.append(linha)
}

function novaLinha(usuario, palavras) {
  var linha = $('<tr>')
  var colunaUsuario = $('<td>').text(usuario)
  var colunaPalavras = $('<td>').text(palavras)
  var colunaRemover = $('<td>')

  var link = $('<a>').attr('href', '#').addClass('botao-remover')
  var icone = $('<i>')
    .addClass('small')
    .addClass('material-icons')
    .text('delete')

  // Icone dentro do <a>
  link.append(icone)

  // <a> dentro do <td>
  colunaRemover.append(link)

  // Os três <td> dentro do <tr>
  linha.append(colunaUsuario)
  linha.append(colunaPalavras)
  linha.append(colunaRemover)

  return linha
}

function removeLinha(event) {
  event.preventDefault()
  $(this).parent().parent().remove()
}

function reiniciaJogo() {
  $('#botao-reiniciar').on('click', function () {
    campo.attr('disabled', false)
    campo.val('')
    $('#contador-palavras').text('0')
    $('#contador-caracteres').text('0')
    $('#tempo-digitacao').text(tempoInicial)
    inicializaCronometro()
    campo.toggleClass('campo-desativado')
    campo.removeClass('borda-vermelha')
    campo.removeClass('borda-verde')
  })
}
