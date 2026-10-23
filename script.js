/*
 * OrdenaLab — Trabalho Integrador de Estrutura de Dados
 * Este arquivo contém dois algoritmos de ordenação implementados manualmente.
 * Nenhuma função de ordenação usa Array.sort().
 *
 * As funções gerarPassosBubble e gerarPassosInsertion não manipulam HTML.
 * Elas recebem dados, processam cópias dos vetores e retornam um histórico
 * completo para que a interface possa exibir comparações e trocas.
 */

/** Indica se dois valores estão na ordem errada para o sentido escolhido. */
function foraDeOrdem(primeiro, segundo, sentido) {
  return sentido === 'asc' ? primeiro > segundo : primeiro < segundo;
}

/** Salva uma cópia do vetor: snapshots não mudam quando o vetor muda depois. */
function registrarPasso(passos, vetor, tipo, indices, titulo, detalhe, comparacoes, trocas, zona = null) {
  passos.push({
    vetor: [...vetor],
    tipo,
    indices: [...indices],
    titulo,
    detalhe,
    comparacoes,
    trocas,
    zona
  });
}

/**
 * BUBBLE SORT: compara valores adjacentes em passagens sucessivas.
 * Após cada passagem completa, o último elemento dessa área já está na posição final.
 * A saída antecipada quando não há trocas dá melhor caso O(n).
 */
function gerarPassosBubble(numeros, sentido) {
  const vetor = [...numeros];
  const passos = [];
  let comparacoes = 0;
  let trocas = 0;
  const n = vetor.length;

  registrarPasso(passos, vetor, 'inicio', [], 'Sequência recebida',
    'O Bubble Sort vai começar comparando números vizinhos.', 0, 0);

  for (let passagem = 0; passagem < n - 1; passagem++) {
    let houveTroca = false;

    for (let i = 0; i < n - passagem - 1; i++) {
      comparacoes++;
      registrarPasso(passos, vetor, 'comparacao', [i, i + 1],
        `Comparando ${vetor[i]} e ${vetor[i + 1]}`,
        foraDeOrdem(vetor[i], vetor[i + 1], sentido)
          ? 'Os valores estão fora da ordem escolhida. Uma troca será feita.'
          : 'Os valores já estão na ordem correta. Nenhuma troca é necessária.',
        comparacoes, trocas, { lado: 'fim', quantidade: passagem });

      if (foraDeOrdem(vetor[i], vetor[i + 1], sentido)) {
        // Troca explícita de posições (swap).
        const temporario = vetor[i];
        vetor[i] = vetor[i + 1];
        vetor[i + 1] = temporario;
        trocas++;
        houveTroca = true;

        registrarPasso(passos, vetor, 'troca', [i, i + 1],
          `Troca entre as posições ${i + 1} e ${i + 2}`,
          'Os dois elementos inverteram suas posições no vetor.',
          comparacoes, trocas, { lado: 'fim', quantidade: passagem });
      }
    }

    registrarPasso(passos, vetor, 'passagem', [], `Passagem ${passagem + 1} finalizada`,
      houveTroca
        ? 'Um elemento chegou à posição definitiva nesta passagem.'
        : 'Nenhuma troca ocorreu: toda a sequência já está ordenada.',
      comparacoes, trocas, { lado: 'fim', quantidade: houveTroca ? passagem + 1 : n });

    if (!houveTroca) break;
  }

  registrarPasso(passos, vetor, 'fim', [], 'Ordenação concluída!',
    'Todos os valores estão organizados na ordem selecionada.',
    comparacoes, trocas, { lado: 'fim', quantidade: n });
  return { resultado: vetor, passos };
}

/**
 * INSERTION SORT: amplia uma sublista ordenada inserindo cada novo elemento.
 * Esta implementação usa trocas entre elementos adjacentes, equivalentes
 * ao deslocamento necessário à inserção. Isso mantém os valores visíveis
 * em todas as etapas, sem criar duplicatas temporárias na animação.
 * Comparamos com > ou < estritos, preservando a ordem de valores iguais.
 */
function gerarPassosInsertion(numeros, sentido) {
  const vetor = [...numeros];
  const passos = [];
  let comparacoes = 0;
  let trocas = 0;
  const n = vetor.length;

  registrarPasso(passos, vetor, 'inicio', [], 'Sequência recebida',
    'O Insertion Sort vai construir uma parte ordenada, número por número.', 0, 0,
    { lado: 'inicio', quantidade: n ? 1 : 0 });

  for (let i = 1; i < n; i++) {
    let posicao = i;
    while (posicao > 0) {
      comparacoes++;
      registrarPasso(passos, vetor, 'comparacao', [posicao - 1, posicao],
        `Comparando ${vetor[posicao - 1]} e ${vetor[posicao]}`,
        foraDeOrdem(vetor[posicao - 1], vetor[posicao], sentido)
          ? 'Para inserir o elemento no lugar certo, vamos trocar os vizinhos.'
          : 'O elemento chegou ao lugar certo. A inserção termina aqui.',
        comparacoes, trocas);

      if (!foraDeOrdem(vetor[posicao - 1], vetor[posicao], sentido)) break;

      // Inserção por trocas adjacentes — desloca o elemento uma posição à esquerda.
      const temporario = vetor[posicao];
      vetor[posicao] = vetor[posicao - 1];
      vetor[posicao - 1] = temporario;
      trocas++;
      registrarPasso(passos, vetor, 'troca', [posicao - 1, posicao],
        `Inserindo ${vetor[posicao - 1]} mais à esquerda`,
        'Os vizinhos trocaram de lugar para ampliar a parte ordenada.',
        comparacoes, trocas);
      posicao--;
    }

    registrarPasso(passos, vetor, 'passagem', [], `${i + 1} elementos organizados`,
      'A parte inicial do vetor está ordenada; agora podemos analisar o próximo valor.',
      comparacoes, trocas, { lado: 'inicio', quantidade: i + 1 });
  }

  registrarPasso(passos, vetor, 'fim', [], 'Ordenação concluída!',
    'Todos os valores estão organizados na ordem selecionada.',
    comparacoes, trocas, { lado: 'inicio', quantidade: n });
  return { resultado: vetor, passos };
}

/** Valida toda a entrada, sem aceitar tokens parcialmente numéricos (ex.: '3abc'). */
function interpretarEntrada(texto) {
  const entrada = texto.trim();
  if (!entrada) {
    throw new Error('Digite pelo menos um número para começar.');
  }
  if (entrada.startsWith(',') || entrada.endsWith(',') || /,\s*,/.test(entrada)) {
    throw new Error('Há uma vírgula sem número. Separe os valores por vírgulas ou espaços.');
  }

  const tokens = entrada.split(/[,\s]+/);
  if (tokens.length > 36) {
    throw new Error('Para manter a visualização legível, digite no máximo 36 números.');
  }
  const padraoNumerico = /^[+-]?(?:\d+(?:\.\d*)?|\.\d+)(?:e[+-]?\d+)?$/i;
  return tokens.map((token) => {
    if (!padraoNumerico.test(token)) {
      throw new Error(`“${token}” não é um número válido. Use valores como 3, -2 ou 1.5.`);
    }
    const numero = Number(token);
    if (!Number.isFinite(numero)) {
      throw new Error(`“${token}” está fora do intervalo de números permitido pelo navegador.`);
    }
    return numero;
  });
}

/** Parte visual; só é inicializada quando a página estiver carregada. */
if (typeof document !== 'undefined') {
  document.addEventListener('DOMContentLoaded', () => {
    const el = (id) => document.getElementById(id);
    const form = el('sort-form');
    const input = el('numbers-input');
    const erro = el('input-error');
    const algorithm = el('algorithm-select');
    const algorithmDetail = el('algorithm-detail');
    const bars = el('bars');
    const list = el('event-list');
    const playButton = el('play-button');
    const playIcon = el('play-icon');
    const playLabel = el('play-label');
    const startButton = el('start-button');
    const previousButton = el('previous-button');
    const nextButton = el('next-button');
    const restartButton = el('restart-button');
    const speedInput = el('speed-input');
    const speedValue = el('speed-value');

    let historico = [];
    let indiceAtual = 0;
    let reproduzindo = false;
    let temporizador = null;

    const exemplos = [
      '8, 3, 10, -2, 3, 1', '5 2 8 1', '4, 2, 4, 1',
      '3, -5, 0, -1', '12, 7, 4, 9, 1, 6', '10 9 8 7 6 5 4'
    ];
    let proximoExemplo = 0;

    function formatarLista(valores) {
      return valores.join(', ');
    }

    function mostrarErro(mensagem) {
      erro.textContent = mensagem;
      erro.hidden = false;
      input.setAttribute('aria-invalid', 'true');
    }
    function limparErro() {
      erro.textContent = '';
      erro.hidden = true;
      input.removeAttribute('aria-invalid');
    }
    function sentidoSelecionado() {
      return form.querySelector('input[name="direction"]:checked').value;
    }
    function parar() {
      reproduzindo = false;
      window.clearTimeout(temporizador);
      temporizador = null;
    }
    function estado(texto, classe = '') {
      el('state-label').textContent = texto;
      el('viewer-state').className = 'viewer-state' + (classe ? ' ' + classe : '');
    }
    function atualizarAlgoritmo() {
      algorithmDetail.textContent = algorithm.value === 'bubble'
        ? 'Compara elementos lado a lado e troca aqueles que estiverem fora de ordem.'
        : 'Constrói uma parte ordenada, inserindo cada novo valor na posição correta.';
    }
    function intervalo() {
      // 1 é mais lento, 5 é mais rápido.
      return [1400, 950, 630, 350, 140][Number(speedInput.value) - 1];
    }

    function desenharBarras(passo) {
      bars.replaceChildren();
      const vetor = passo.vetor;
      bars.style.minWidth = `${Math.max(0, vetor.length * 47 + 40)}px`;
      if (!vetor.length) return;
      const menor = Math.min(...vetor);
      const maior = Math.max(...vetor);
      // Normalização com escala evita overflow caso os extremos sejam muito grandes.
      const escala = Math.max(Math.abs(menor), Math.abs(maior), 1);
      const amplitude = maior / escala - menor / escala;

      vetor.forEach((valor, index) => {
        const posicao = amplitude === 0 ? .45 : (valor / escala - menor / escala) / amplitude;
        const altura = 22 + Math.max(0, Math.min(1, posicao)) * 66;
        const coluna = document.createElement('div');
        coluna.className = 'bar';
        coluna.style.setProperty('--bar-size', `${altura}%`);
        coluna.title = `Posição ${index + 1}: ${valor}`;
        let destaque = '';
        if (passo.indices.includes(index)) {
          destaque = passo.tipo === 'troca' ? 'swap' : 'compare';
        } else if (passo.zona) {
          const { lado, quantidade } = passo.zona;
          if ((lado === 'inicio' && index < quantidade) ||
              (lado === 'fim' && index >= vetor.length - quantidade)) {
            destaque = 'processed';
          }
        }
        if (destaque) coluna.dataset.state = destaque;
        const rotulo = document.createElement('span');
        rotulo.className = 'bar-value';
        rotulo.textContent = String(valor).length > 9 ? valor.toExponential(2) : String(valor);
        const indice = document.createElement('span');
        indice.className = 'bar-index';
        indice.textContent = String(index + 1).padStart(2, '0');
        coluna.append(rotulo, indice);
        bars.append(coluna);
      });
      bars.setAttribute('aria-label', `Estado atual do vetor: ${formatarLista(vetor)}`);
    }

    function desenharHistorico() {
      list.replaceChildren();
      if (indiceAtual === 0) {
        const item = document.createElement('li');
        item.className = 'event-empty';
        item.textContent = 'Aguardando o primeiro passo...';
        list.append(item);
        return;
      }
      const comeco = Math.max(1, indiceAtual - 3);
      for (let i = comeco; i <= indiceAtual; i++) {
        const item = document.createElement('li');
        const descricao = document.createElement('span');
        descricao.textContent = historico[i].titulo;
        const numero = document.createElement('strong');
        numero.textContent = `#${String(i).padStart(2, '0')}`;
        item.append(descricao, numero);
        list.append(item);
      }
    }

    function mostrarPasso() {
      if (!historico.length) return;
      const passo = historico[indiceAtual];
      const ultimo = historico.length - 1;
      const percentual = ultimo ? Math.round((indiceAtual / ultimo) * 100) : 100;
      desenharBarras(passo);
      el('comparison-count').textContent = passo.comparacoes;
      el('swap-count').textContent = passo.trocas;
      el('step-count').firstChild.textContent = indiceAtual;
      el('total-steps').textContent = ` / ${ultimo}`;
      el('current-action').textContent = passo.titulo;
      el('action-detail').textContent = passo.detalhe;
      el('step-progress').textContent = `${percentual}%`;
      el('progress-fill').style.width = `${percentual}%`;
      el('progress-track').setAttribute('aria-valuenow', String(percentual));
      previousButton.disabled = indiceAtual === 0;
      nextButton.disabled = indiceAtual >= ultimo;
      restartButton.disabled = indiceAtual === 0;
      playButton.disabled = false;
      playIcon.textContent = reproduzindo ? 'Ⅱ' : '▶';
      playLabel.textContent = reproduzindo ? 'Pausar' : indiceAtual === ultimo ? 'Repetir' : 'Reproduzir';
      if (indiceAtual === ultimo) {
        parar();
        playIcon.textContent = '↻';
        playLabel.textContent = 'Repetir';
        estado('Concluído', 'is-complete');
      } else if (reproduzindo) {
        estado('Executando', 'is-running');
      } else {
        estado('Pausado');
      }
      desenharHistorico();
    }

    function reproduzirProximo() {
      if (!reproduzindo) return;
      if (indiceAtual >= historico.length - 1) {
        parar();
        mostrarPasso();
        return;
      }
      indiceAtual++;
      mostrarPasso();
      if (reproduzindo) temporizador = window.setTimeout(reproduzirProximo, intervalo());
    }

    function reproduzir() {
      if (!historico.length) return;
      if (reproduzindo) {
        parar();
        mostrarPasso();
        return;
      }
      if (indiceAtual === historico.length - 1) indiceAtual = 0;
      reproduzindo = true;
      mostrarPasso();
      temporizador = window.setTimeout(reproduzirProximo, intervalo());
    }

    function executar(evento) {
      evento.preventDefault();
      parar();
      limparErro();
      let numeros;
      try {
        numeros = interpretarEntrada(input.value);
      } catch (erroDeEntrada) {
        mostrarErro(erroDeEntrada.message);
        input.focus();
        return;
      }

      const sentido = sentidoSelecionado();
      const execucao = algorithm.value === 'bubble'
        ? gerarPassosBubble(numeros, sentido)
        : gerarPassosInsertion(numeros, sentido);
      historico = execucao.passos;
      indiceAtual = 0;
      el('original-result').textContent = formatarLista(numeros);
      el('sorted-result').textContent = formatarLista(execucao.resultado);
      el('result-foot').textContent = sentido === 'asc'
        ? 'Ordenados do menor para o maior, sem perder repetições.'
        : 'Ordenados do maior para o menor, sem perder repetições.';
      mostrarPasso();
      reproduzir();
    }

    form.addEventListener('submit', executar);
    input.addEventListener('input', limparErro);
    algorithm.addEventListener('change', atualizarAlgoritmo);
    playButton.addEventListener('click', reproduzir);
    nextButton.addEventListener('click', () => {
      parar();
      if (historico.length && indiceAtual < historico.length - 1) indiceAtual++;
      mostrarPasso();
    });
    previousButton.addEventListener('click', () => {
      parar();
      if (indiceAtual > 0) indiceAtual--;
      mostrarPasso();
    });
    restartButton.addEventListener('click', () => {
      parar();
      indiceAtual = 0;
      mostrarPasso();
    });
    speedInput.addEventListener('input', () => {
      speedValue.textContent = `${speedInput.value}x`;
      if (reproduzindo) {
        window.clearTimeout(temporizador);
        temporizador = window.setTimeout(reproduzirProximo, intervalo());
      }
    });
    el('example-button').addEventListener('click', () => {
      parar();
      limparErro();
      proximoExemplo = (proximoExemplo + 1) % exemplos.length;
      input.value = exemplos[proximoExemplo];
      input.focus();
    });
    el('clear-button').addEventListener('click', () => {
      parar();
      input.value = '';
      limparErro();
      historico = [];
      indiceAtual = 0;
      bars.removeAttribute('style');
      bars.replaceChildren();
      bars.setAttribute('aria-label', 'A visualização dos números aparecerá aqui');
      const vazio = document.createElement('div');
      vazio.className = 'empty-state';
      vazio.innerHTML = '<strong>Nenhum número informado</strong><p>Digite uma sequência para iniciar outra execução.</p>';
      bars.append(vazio);
      el('original-result').textContent = '—';
      el('sorted-result').textContent = '—';
      el('result-foot').textContent = 'O resultado será exibido após a execução.';
      el('comparison-count').textContent = '0';
      el('swap-count').textContent = '0';
      el('step-count').firstChild.textContent = '0';
      el('total-steps').textContent = ' / 0';
      el('current-action').textContent = 'Nenhuma execução iniciada';
      el('action-detail').textContent = 'Os passos de comparação e troca serão mostrados aqui.';
      el('step-progress').textContent = '0%';
      el('progress-fill').style.width = '0%';
      el('progress-track').setAttribute('aria-valuenow', '0');
      list.replaceChildren();
      const mensagem = document.createElement('li');
      mensagem.className = 'event-empty';
      mensagem.textContent = 'Nenhum passo executado ainda.';
      list.append(mensagem);
      [playButton, previousButton, nextButton, restartButton].forEach((btn) => { btn.disabled = true; });
      playIcon.textContent = '▶';
      playLabel.textContent = 'Reproduzir';
      estado('Aguardando entrada');
      input.focus();
    });
    atualizarAlgoritmo();
  });
}
