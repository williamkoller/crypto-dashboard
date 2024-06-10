import React, { useEffect, useState } from 'react';
import axios from 'axios';
import numeral from 'numeral';
import './CryptoDashboard.css';

const CryptoDashboard = () => {
  const [cryptos, setCryptos] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchCryptos = async () => {
    try {
      const response = await axios.get('http://localhost:3003/api/cryptos/top');
      setCryptos(response.data.data);
    } catch (error) {
      console.error('Erro ao buscar dados das criptomoedas:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCryptos();
    const intervalId = setInterval(fetchCryptos, 1000);
    return () => clearInterval(intervalId);
  }, []);

  if (loading) {
    return <div>Carregando...</div>;
  }

  return (
    <div className='crypto-dashboard'>
      <h1>Criptomoedas Mais Promissoras do Dia</h1>
      <table>
        <thead>
          <tr>
            <th>Símbolo</th>
            <th>Último Preço</th>
            <th>Último Preço (USD)</th>
            <th>Variação de Preço (%)</th>
            <th>Preço de Abertura</th>
            <th>Preço Máximo</th>
            <th>Preço Mínimo</th>
            <th>Volume</th>
          </tr>
        </thead>
        <tbody>
          {cryptos.map((crypto) => (
            <tr key={crypto.symbol}>
              <td data-label='Símbolo'>{crypto.symbol}</td>
              <td data-label='Último Preço'>{crypto.lastPrice}</td>
              <td data-label='Último Preço (USD)'>
                ${numeral(crypto.priceInUSD).format('0,0.00000000')}
              </td>
              <td data-label='Variação de Preço (%)'>
                {crypto.priceChangePercent}%
              </td>
              <td data-label='Preço de Abertura'>{crypto.openPrice}</td>
              <td data-label='Preço Máximo'>{crypto.highPrice}</td>
              <td data-label='Preço Mínimo'>{crypto.lowPrice}</td>
              <td data-label='Volume'>{crypto.volume}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CryptoDashboard;
