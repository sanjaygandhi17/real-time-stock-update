import React, { FC, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPrices } from '../store/slices/pricesSlice';
import { RootState, AppDispatch } from '../store';
import Modal from '../components/Modal';
import { Line } from 'react-chartjs-2';
import Chart from 'chart.js/auto';
import Image, { StaticImageData } from 'next/image';
import bitcoin from '../assets/pictures/bitcoin.png';
import ethereum from '../assets/pictures/ethereum.png';
import litecoin from '../assets/pictures/litecoin.png';
import ripple from '../assets/pictures/ripple.png';
import dogecoin from '../assets/pictures/dogecoin.png';
import { CategoryScale, ChartData } from 'chart.js';
Chart.register(CategoryScale);

type CryptoSymbol = 'bitcoin' | 'ethereum' | 'litecoin' | 'ripple' | 'dogecoin';

const imageMapping: Record<CryptoSymbol, { src: StaticImageData; alt: string }> = {
  bitcoin: { src: bitcoin, alt: 'Bitcoin Image' },
  ethereum: { src: ethereum, alt: 'Ethereum Image' },
  litecoin: { src: litecoin, alt: 'Litecoin Image' },
  ripple: { src: ripple, alt: 'Ripple Image' },
  dogecoin: { src: dogecoin, alt: 'Dogecoin Image' },
};

const Home: FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const prices = useSelector((state: RootState) => state.prices.data);
  const [symbol, setSymbol] = useState<CryptoSymbol>('bitcoin');
  const [isModalOpen, setModalOpen] = useState(false);
  const [chartData, setChartData] = useState<ChartData<'line', number[]>>({
    labels: [],
    datasets: [],
  });

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(fetchPrices(symbol));
    };

    fetchData();

    const interval = setInterval(() => {
      fetchData();
    }, 1000);

    return () => clearInterval(interval);
  }, [dispatch, symbol]);

  useEffect(() => {
    if (prices.length > 0) {
      setChartData({
        labels: prices.map((price) => new Date(price.timestamp).toLocaleTimeString()),
        datasets: [
          {
            label: `${symbol} Price`,
            data: prices.map((price) => price.price),
            borderColor: '#01cb81',
            backgroundColor: 'rgba(1, 203, 129, 0.2)',
          },
        ],
      });
    }
  }, [prices, symbol]);

  const { src, alt } = imageMapping[symbol] || { src: '', alt: 'Crypto Image' };

  return (
    <div>
      <div className="topBar">
        <h1 className="heading">Real-Time Prices</h1>
        <button className="change-button" onClick={() => setModalOpen(true)}>
          Change Stock/Crypto
        </button>
      </div>
      <div className="container">
        <div className="price-table-container">
          <table className="price-table">
            <thead>
              <tr className="columnName">
                <th>Symbol</th>
                <th>Price</th>
                <th>Timestamp</th>
              </tr>
            </thead>
            <tbody>
              {prices.slice(0, 20).map((price, index) => (
                <tr key={index} className={index === 0 ? 'blink' : ''}>
                  <td className="dataIngest">{price.symbol}</td>
                  <td className="dataIngest">{price.price}</td>
                  <td className="dataIngest">{new Date(price.timestamp).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="dashboard">
          <div className="real-time-price">
            <h2>Real-Time Price</h2>
            <div className="image-container">
              <Image src={src} alt={alt} layout="fill" objectFit="contain" />
            </div>
            {prices[0] && (
              <div className="price-info">
                <p>{prices[0].symbol.toUpperCase()}</p>
                <p>{prices[0].price}</p>
              </div>
            )}
          </div>
          <div className="line-chart">
            <Line data={chartData} />
          </div>
        </div>
      </div>
      <Modal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        onSelect={(symbol) => {
          setSymbol(symbol as CryptoSymbol);
          setModalOpen(false);
        }}
      />
    </div>
  );
};

export default Home;