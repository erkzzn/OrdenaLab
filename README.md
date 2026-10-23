# OrdenaLab — Laboratório Interativo de Algoritmos de Ordenação

Projeto integrador da disciplina **Estrutura de Dados**, do Curso Técnico em Informática.

## Objetivo

Criar um site para receber uma sequência de números, validar os dados, escolher entre ordem crescente e decrescente e demonstrar visualmente cada comparação e troca até chegar à sequência ordenada.

## Algoritmos implementados

- **Bubble Sort:** percorre o vetor comparando elementos vizinhos e trocando-os quando necessário. Interrompe antecipadamente caso uma passagem não tenha trocas. Pior caso: O(n²); melhor caso: O(n).
- **Insertion Sort:** constrói uma parte ordenada. A implementação usa trocas entre vizinhos para inserir o próximo valor no lugar certo, facilitando a visualização. Pior caso: O(n²); melhor caso: O(n).

Ambos foram implementados manualmente em JavaScript, sem `Array.sort()`. A comparação é estrita, mantendo a ordem relativa de números iguais; o vetor original é copiado antes do processamento.

## Tecnologias

- HTML5 (semântica e controles de formulário)
- CSS3 (layout responsivo e estilos)
- JavaScript puro (validação, DOM, algoritmos e animação)
- GitHub e GitHub Pages (versionamento e hospedagem, depois de publicados)

Não é necessário servidor, instalação de bibliotecas nem banco de dados.

## Estrutura do repositório

```text
laboratorio-ordenacao/
├── index.html    # Estrutura da interface e campos
├── style.css     # Aparência e responsividade
├── script.js     # Entrada, validação, ordenação e visualização
└── README.md     # Guia e documentação
```

## Como executar localmente

1. Baixe ou extraia a pasta do projeto.
2. Abra `index.html` em um navegador atualizado, como Chrome, Firefox ou Edge.
3. Digite números separados por **vírgulas ou espaços**. Exemplo: `8, 3, 10, -2, 3, 1`.
4. Escolha o sentido e o algoritmo.
5. Clique em **Iniciar ordenação**. A visualização começará automaticamente.
6. Utilize **Pausar**, **Reproduzir**, **Próximo passo**, **Passo anterior**, **Voltar ao início** e o controle de **Velocidade** para acompanhar o processo.
7. Confira a entrada original e o resultado final mostrados lado a lado no computador (empilhados no celular).

**Dica:** no vídeo de visualização, roxo indica comparação, verde-claro indica troca e verde-água indica a área organizada/confirmada.

## Exemplos

| Entrada | Sentido | Saída |
|---|---|---|
| `8, 3, 10, -2, 3, 1` | Crescente | `-2, 1, 3, 3, 8, 10` |
| `8, 3, 10, -2, 3, 1` | Decrescente | `10, 8, 3, 3, 1, -2` |
| `4 2 4 1` | Crescente | `1, 2, 4, 4` |

## Sete testes obrigatórios (repetir para ambos os algoritmos)

| Caso | Entrada | Sentido | Resultado esperado |
|---|---|---|---|
| Sequência comum | `5, 2, 8, 1` | Crescente | `1, 2, 5, 8` |
| Valores repetidos | `4, 2, 4, 1` | Crescente | `1, 2, 4, 4` |
| Valores negativos | `3, -5, 0, -1` | Crescente | `-5, -1, 0, 3` |
| Um elemento | `7` | Crescente | `7` |
| Sequência vazia | (vazio) | Crescente | Mensagem "Digite pelo menos um número..." |
| Entrada inválida | `3, abc, 2` | Crescente | Mensagem de erro sobre `abc` |
| Ordem decrescente | `1, 5, 3` | Decrescente | `5, 3, 1` |

As funções de ordenação também podem ser testadas independentemente da interface, pois recebem um array e um sentido e devolvem `{ resultado, passos }`.

## Como o código funciona

1. **`interpretarEntrada`** divide números por vírgulas ou espaços, verifica tokens inválidos, números não finitos e o limite de 36 elementos.
2. **`foraDeOrdem`** decide qual comparação utilizar: `>` para crescente ou `<` para decrescente. Igualdade não provoca troca.
3. **`gerarPassosBubble`** e **`gerarPassosInsertion`** percorrem cópias do vetor, realizam comparações e trocas e registram estados intermediários.
4. **`registrarPasso`** salva um snapshot do vetor e os contadores no momento exato de cada evento.
5. **`desenharBarras`** converte os estados em elementos visuais, mantendo o JavaScript do algoritmo separado da exibição.
6. **`reproduzir`** e **`reproduzirProximo`** controlam a animação sem recarregar a página.

## Publicação no GitHub Pages

1. Crie um repositório no GitHub, por exemplo `laboratorio-ordenacao`.
2. Envie os **quatro arquivos na raiz** do repositório.
3. Em **Settings → Pages → Build and deployment**, selecione **Deploy from a branch**; escolha `main` e `/ (root)`; salve.
4. Após a implantação, abra o link fornecido pelo GitHub Pages e confira se HTML, CSS, JavaScript e resultados funcionam, também em uma janela anônima.
5. Adicione abaixo os dois endereços efetivamente publicados.

**Repositório:** `A PREENCHER DEPOIS DA PUBLICAÇÃO`

**Site público:** `A PREENCHER DEPOIS DA PUBLICAÇÃO`

### Sugestão de organização de commits reais

1. Estrutura inicial do HTML.
2. Implementação de Bubble Sort e Insertion Sort.
3. Tratamento e validação da entrada.
4. CSS responsivo e controles de visualização.
5. Testes, README e publicação.

> Registre somente os commits correspondentes ao trabalho realmente realizado. Não simule um histórico antigo.

## Limitações e melhorias futuras

- A entrada é limitada a 36 números para não comprometer a usabilidade da visualização.
- Decimais usam **ponto** (`1.5`); vírgula é um separador de valores.
- A altura de cada barra é normalizada dentro da sequência informada, inclusive para valores negativos. O número mostrado acima da barra é sempre o valor real.
- A velocidade é ajustável, mas sequências maiores geram mais passos e levam mais tempo.
- Melhorias possíveis: adição de Merge Sort, Quick Sort, atalhos de teclado, exportação dos passos e testes automatizados em um arquivo próprio.

## Autoria e créditos

- **Grupo:** `PREENCHER COM OS NOMES DOS INTEGRANTES`
- **Turma:** `PREENCHER`
- **Instituição:** `PREENCHER`
- **Ano:** 2026

Projeto desenvolvido como atividade educacional, sem dependências externas.

## Publicação profissional (LinkedIn)

A divulgação faz parte da entrega solicitada. Após publicar o site, apresente o objetivo, os algoritmos implementados, as tecnologias utilizadas, os aprendizados reais e os links públicos do código e da aplicação. Só declare recursos que realmente funcionam.
