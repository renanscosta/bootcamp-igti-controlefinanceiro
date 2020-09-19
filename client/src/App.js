import React, { useState, useEffect } from 'react';
import Data from './components/Data';
import * as totalizador from './helper/totalizador';
import * as api from './api/apiService';
import Summary from './components/Summary';

const somatorio_zerado = {
  lancamentos: 0,
  receitas: 0,
  despesas: 0,
  saldo: 0
}

export default function App() {

  const [allTransactions, setAllTransactions] = useState([]);
  const [somatorio, setSomatorio] = useState(somatorio_zerado);
  const [periodoCorrente, setPeriodoCorrente] = useState(null);

  const obterPeriodo = (periodo) => {
    setPeriodoCorrente(periodo);

  };

  useEffect(() => {
    const obterTransacoesAPI = async () => {

      if (periodoCorrente === "--") {
        setAllTransactions([]);
        setSomatorio(somatorio_zerado)
        return;
      }

      const transacoes = await api.getAllTransactions(periodoCorrente);
      setAllTransactions(transacoes);

      const somatorio_aux = totalizador.calcular(transacoes);
      setSomatorio(somatorio_aux);

    }
    obterTransacoesAPI(periodoCorrente);

  }, [periodoCorrente])

  return (
    <div className='container'>
      <h2 className="center">Bootcamp Full Stack - Desafio final</h2>
      <div className="container center">
        <h3 className="center">Controle Financeiro Pessoal</h3>
      </div>

      <Data carregarPeriodo={obterPeriodo} />
      <Summary somatorio={somatorio} />
      <div id='novoEFiltro'>
        <button>
          + Novo Lançamento
      </button>
        <input type='text' placeholder="filtro"></input>
      </div>
      <div id='listagem'>
        {(allTransactions && allTransactions.length > 0) && (
          allTransactions.map((item) => {
            return (<p key={item._id}>
              Descrição: {item.description}<br />
              Categoria: {item.category}<br />
              Tipo: {item.type}<br />
              Valor: {item.value}<br />
            </p>)
          })
        )}
      </div>
    </div>
  );
}
