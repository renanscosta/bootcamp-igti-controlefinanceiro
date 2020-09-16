import React, { useState, useEffect } from 'react';
import Data from './components/Data';
import * as totalizador from './helper/totalizador';
import * as api from './api/apiService';


export default function App() {

  const [allTransactions, setAllTransactions] = useState([]);
  const [sumario, setSumario] = useState({});
  const [periodoCorrente, setPeriodoCorrente] = useState(null);

  const obterPeriodo = (periodo) => {
    setPeriodoCorrente(periodo);

  };

  useEffect(() => {
    const obterTransacoesAPI = async () => {

      if (periodoCorrente === "--") {
        setAllTransactions([]);
        return;
      }

      const transacoes = await api.getAllTransactions(periodoCorrente);
      setAllTransactions(transacoes);

      const somatorio = totalizador.calcular(transacoes);
      setSumario(somatorio);

    }
    obterTransacoesAPI(periodoCorrente);

  }, [periodoCorrente])

  return (
    <div>
      <h2 className="center">Bootcamp Full Stack - Desafio final</h2>
      <div className="container center">
        <h3 className="center">Controle Financeiro Pessoal</h3>
      </div>

      <Data carregarPeriodo={obterPeriodo} />
      <div id='sumario'>
        <span>Lançamentos:{sumario.lancamentos}</span>
        <span>Receitas:{sumario.receitas}</span>
        <span>Despesas:{sumario.despesas}</span>
        <span>Saldo:{sumario.saldo}</span>
      </div>
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
