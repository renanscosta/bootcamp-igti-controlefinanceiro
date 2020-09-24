import React, { useState, useEffect } from 'react';
import Data from './components/Data';
import * as totalizador from './helper/totalizador';
import * as api from './api/apiService';
import Summary from './components/Summary';
import Actions from './components/Actions';
import Transactions from './components/Transactions';
import ModalTransaction from './components/ModalTransaction';

const somatorio_zerado = {
  lancamentos: 0,
  receitas: 0,
  despesas: 0,
  saldo: 0
}

export default function App() {

  const [allTransactions, setAllTransactions] = useState([]);
  const [filtredTransactions, setFilteredTransactions] = useState([]);
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [somatorio, setSomatorio] = useState(somatorio_zerado);
  const [periodoCorrente, setPeriodoCorrente] = useState(null);
  const [filtro, setFiltro] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const obterPeriodo = (periodo) => {
    setPeriodoCorrente(periodo);

  };

  const handleFilter = (valor) => {
    setFiltro(valor);
  }

  const handleDeleteTransaction = async (id) => {
    await api.deleteTransaction(id);

    const newTransactions = allTransactions.filter(
      (transaction) => transaction._id !== id
    );

    setAllTransactions(newTransactions);
    setFilteredTransactions(newTransactions);
  };

  const handleEditTransaction = (id) => {
    const newSelectedTransaction = allTransactions.find(
      (transaction) => transaction._id === id
    );

    setSelectedTransaction(newSelectedTransaction);
    console.log(newSelectedTransaction);
    //setIsModalOpen(true);
  };

  const handleInsertTransaction = () => {
    setSelectedTransaction(null);
    setIsModalOpen(true);
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

    }
    obterTransacoesAPI(periodoCorrente);

  }, [periodoCorrente])

  useEffect(() => {

    if (filtro.trim() !== '') {
      const textLowerCase = filtro.toLowerCase();

      const newFiltredTransactions = allTransactions.filter((t) => {
        return t.description.toLowerCase().includes(textLowerCase);
      });

      setFilteredTransactions(newFiltredTransactions);
    }
    else {
      setFilteredTransactions([...allTransactions]);
    }

  }, [filtro, allTransactions]);

  useEffect(() => {

    if (filtredTransactions.length === 0) {
      setSomatorio(somatorio_zerado);
      return;
    }

    const somatorio_aux = totalizador.calcular(filtredTransactions);
    setSomatorio(somatorio_aux);

  }, [filtredTransactions]);

  return (
    <div className='container'>
      <div>
        <h2 className="center">Bootcamp Full Stack - Desafio finalteste</h2>
        <h3 className="center">Controle Financeiro Pessoal</h3>
      </div>

      <Data carregarPeriodo={obterPeriodo} />
      <Summary somatorio={somatorio} />
      <Actions handleFilter={handleFilter} filterText={filtro} onNewTransaction={handleInsertTransaction} />
      <Transactions transactions={filtredTransactions} onDeleteTransaction={handleDeleteTransaction}
        onEditTransaction={handleEditTransaction} />

      {isModalOpen && (
        <ModalTransaction

          selectedTransaction={selectedTransaction}
        />
      )}
    </div>
  );
}
