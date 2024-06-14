import { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import axios from 'axios';

interface CoinData {
  id: string;
  symbol: string;
  prices: Array<[number, number]>;
}

const DashboardChart = () => {
  const [coinData, setCoinData] = useState<CoinData[]>([]);

  useEffect(() => {
    const fetchCoinData = async () => {
      try {
        const accessToken = localStorage.getItem('access_token');
        if (accessToken) {
          const response = await axios.get('http://localhost:8000/tokens', {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          });
          const data = response.data;
          const coinIds = data.map((coin: CoinData) => coin.id);
          const coinDataFromAPI = await fetchCoinDataFromAPI(coinIds);
          setCoinData(coinDataFromAPI);
        }
      } catch (error) {
        console.error('Error fetching coin data:', error);
      }
    };

    fetchCoinData();
  }, []);

  const fetchCoinDataFromAPI = async (coinIds: string[]) => {
    try {
      const response = await axios.get(
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${coinIds.join(',')}&order=market_cap_desc&sparkline=true`
      );
      return response.data;
    } catch (error) {
      console.error('Error fetching coin data from API:', error);
      return [];
    }
  };

  const chartData = {
    labels: coinData.map((coin) => coin.symbol),
    datasets: [
      {
        label: 'Price',
        data: coinData.map((coin) => coin.prices[coin.prices.length - 1][1]),
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
      },
    ],
  };

  return (
    <div>
      <Line data={chartData} />
    </div>
  );
};

export default DashboardChart;