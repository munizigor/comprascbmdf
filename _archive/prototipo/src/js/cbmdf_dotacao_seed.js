(function preloadCbmdfDotacao() {
  // Matriz de Dotação de Material: para cada (setor, item), quanto a unidade
  // deveria ter (prevista) e quanto tem (atual). A diferença é a lacuna que
  // ancora os pedidos. Dados fictícios para demonstração.
  const storageKey = 'cbmdf_dotacao';

  // [setor, itemId, prevista, atual] — inclui déficits, um excedente e itens
  // já cobertos, de propósito, para demonstrar todos os estados.
  const linhas = [
    // COMOP — operações
    ['COMOP', 1, 30, 18],
    ['COMOP', 2, 30, 30],  // coberto
    ['COMOP', 3, 20, 8],
    ['COMOP', 4, 25, 20],
    ['COMOP', 5, 15, 10],
    ['COMOP', 7, 30, 35],  // excedente
    ['COMOP', 10, 60, 40],
    ['COMOP', 12, 6, 4],
    ['COMOP', 13, 10, 3],
    // CESMA — salvamento
    ['CESMA', 1, 20, 12],
    ['CESMA', 3, 12, 12],  // coberto
    ['CESMA', 8, 15, 6],
    ['CESMA', 11, 3, 1],
    ['CESMA', 12, 8, 5],
    ['CESMA', 13, 12, 4],
    // DIMAT — material / vestuário
    ['DIMAT', 1, 25, 20],
    ['DIMAT', 2, 25, 15],
    ['DIMAT', 7, 25, 10],
    ['DIMAT', 10, 50, 30],
    ['DIMAT', 6, 10, 8],
    // COMAP — apoio
    ['COMAP', 5, 10, 6],
    ['COMAP', 6, 8, 8],    // coberto
    ['COMAP', 8, 10, 4],
    ['COMAP', 10, 20, 12],
    // DITIC — tecnologia da informação
    ['DITIC', 5, 8, 5],
    ['DITIC', 10, 10, 10]  // coberto
  ];

  const seededDotacao = {
    prevista: linhas.map(([setor, itemId, prevista]) => ({ setor, itemId, quantidade: prevista })),
    atual: linhas.map(([setor, itemId, , atual]) => ({ setor, itemId, quantidade: atual }))
  };

  function hasValidDotacao(value) {
    if (!value) {
      return false;
    }

    try {
      const parsed = JSON.parse(value);
      return parsed && Array.isArray(parsed.prevista) && Array.isArray(parsed.atual);
    } catch (error) {
      return false;
    }
  }

  if (!hasValidDotacao(localStorage.getItem(storageKey))) {
    localStorage.setItem(storageKey, JSON.stringify(seededDotacao));
  }
})();
