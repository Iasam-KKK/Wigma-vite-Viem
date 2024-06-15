import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import axios from 'axios';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const COINGECKO_API_KEY = 'CG-aMPCLZt6tDD7BWzWrWukdrjB';

interface CoinData {
  id: string;
  symbol: string;
  name: string;
}

const fetchHistoricalDataFromAPI = async (coinId: string, days: number) => {
  const endDate = new Date();
  const startDate = new Date(endDate.getTime() - days * 24 * 60 * 60 * 1000);

  try {
    const response = await axios.get(`https://api.coingecko.com/api/v3/coins/${coinId}/market_chart/range`, {
      params: {
        vs_currency: 'usd',
        from: startDate.getTime() / 1000,
        to: endDate.getTime() / 1000,
      },
      headers: {
        'Content-Type': 'application/json',
        'X-CMC_PRO_API_KEY': COINGECKO_API_KEY,
      },
    });
    return response.data.prices;
  } catch (error) {
    console.error('Error fetching historical data from API:', error);
    return [];
  }
};

const DashboardChart: React.FC = () => {
  const [chartData, setChartData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCoinData = async () => {
      try {
        const response = await axios.get('https://api.coingecko.com/api/v3/coins/markets', {
          params: {
            vs_currency: 'usd',
            order: 'market_cap_desc',
            per_page: 1,
            page: 1,
          },
          headers: {
            'Content-Type': 'application/json',
            'X-CMC_PRO_API_KEY': COINGECKO_API_KEY,
          },
        });
        const coins: CoinData[] = response.data;
        if (coins.length > 0) {
          const historicalData = await fetchHistoricalDataFromAPI(coins[0].id, 30);
          createChartData(coins[0].symbol, historicalData);
        } else {
          setError('No coins found');
        }
      } catch (error) {
        console.error('Error fetching coin data:', error);
        setError('Error fetching coin data');
      }
    };

    fetchCoinData();
  }, []);

  const createChartData = (symbol: string, historicalData: [number, number][]) => {
    const labels = historicalData.map((data) => new Date(data[0]).toLocaleDateString());
    const prices = historicalData.map((data) => data[1]);

    setChartData({
      labels,
      datasets: [
        {
          label: `${symbol} Price (USD)`,
          data: prices,
          backgroundColor: 'rgba(255, 99, 132, 0.2)',
          borderColor: 'rgba(255, 99, 132, 1)',
          borderWidth: 1,
        },
      ],
    });
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Cryptocurrency Price Chart (30 Days)',
      },
    },
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div style={{ height: '400px', width: '600px' }}>
      <h2>Price Chart</h2>
      {chartData ? (
        <Line options={options} data={chartData} />
      ) : (
        <p>Loading chart data...</p>
      )}
    </div>
  );
};

export default DashboardChart;