var tempoInicial = $('#tempo-digitacao').text()
var campo = $('.campo-digitacao')

//colocar tooltipster, slick e selectize//

jQuery(function () {
  atualizaTamanhoFrase()
  inicializaCronometro()
  inicializacaoContadores()
  inicializaMarcadores()
  $('#botao-reiniciar').click(reiniciaJogo)
  atualizaPlacar()
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
  campo.one('focus', function () {
    var tempoRestante = $('#tempo-digitacao').text()
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
  campo.on('input', function () {
    var frase = $('.frase').text()
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

function atualizaTempoInicial(tempo) {
  $('#tempo-digitacao').text(tempo)
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
