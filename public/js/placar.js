$('#botao-placar').click(mostraPlacar)
$('#botao-sync').click(sincronizaPlacar)

function inserePlacar() {
  var corpoTabela = $('.placar').find('tbody')
  var usuario = 'Douglas'
  var numPalavras = $('#contador-palavras').text()
  var botaoRemover =
    "<a href='#'><i class='small material-icons'>delete</i></a>"

  var linha = novaLinha(usuario, numPalavras)
  linha.find('.botao-remover').click(removeLinha)

  corpoTabela.append(linha)
  $('.placar').slideDown(500)
  scrollPlacar()
}

function scrollPlacar() {
  var posicaoPlacar = $('.placar').offset().top
  $('body').animate(
    {
      scrollTop: posicaoPlacar + 'px'
    },
    1000
  )
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
  var linha = $(this).parent().parent()
  linha.fadeOut(800)
  setTimeout(function () {
    linha.remove()
  }, 805)
}

function mostraPlacar() {
  $('.placar').stop().slideToggle(1000)
}

function sincronizaPlacar() {
  var placar = []
  var linhas = $('body>tr')
  linhas.each(function () {
    var usuario = $(this).find('td:nth-child(1)').text()
    var palavras = $(this).find('td:nth-child(2)').text()
    var score = {
      usuario: usuario,
      pontos: palavras
    }

    placar.push(score)
  })

  var dados = {
    placar: placar
  }

  $.post('http://localhost:3000/placar', dados, function () {})
}
