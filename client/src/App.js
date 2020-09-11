import React, { useState, useEffect } from 'react';
import * as api from './api/apiService';
import Data from './components/Data';
import * as totalizador from './helper/totalizador';


export default function App() {

  const [allTransactions, setAllTransactions] = useState([]);
  const [totalLancamentos, setTotalLancamentos] = useState(0);
  const [totalReceitas, setTotalReceitas] = useState(0);
  const [totalDespesas, setTotalDespesas] = useState(0);
  const [saldo, setSaldo] = useState(0);


  useEffect(() => {
    const getTransactions = async () => {
      const transactions = await api.getAllTransactions();
      setAllTransactions(transactions);

      const totais = totalizador.calcular(transactions);
      setTotalLancamentos(totais.lancamentos);
      setTotalDespesas(totais.despesas);
      setTotalReceitas(totais.receitas);
      setSaldo(totais.saldo);
    };
    getTransactions();

  }, []);


  return (
    <div>
      <h2 className="center">Bootcamp Full Stack - Desafio final</h2>
      <div className="container center">
        <h3 className="center">Controle Financeiro Pessoal</h3>
      </div>
      <Data />
      <div id='sumario'>
        <span>Lançamentos:{totalLancamentos}</span>
        <span>Receitas:{totalReceitas}</span>
        <span>Despesas:{totalDespesas}</span>
        <span>Saldo:{saldo}</span>
      </div>
      <div id='novoEFiltro'>
        <button>
          + Novo Lançamento
      </button>
        <input type='text' placeholder='Filtro'></input>
      </div>
      <div id='listagem'>
        {(allTransactions && allTransactions.length > 0) && (
          allTransactions.map((item) => {
            return (<p key={item._id}>{item.description}</p>)
          })
        )}
      </div>
    </div>
  );
}
