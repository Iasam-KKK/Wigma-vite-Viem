import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import axios from 'axios';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

interface CoinData {
  id: number;
  symbol: string;
  name: string;
}

interface HistoricalData {
  timestamp: string;
  quote: {
    USD: {
      price: number;
    };
  };
}

const DashboardChart: React.FC = () => {
  const [chartData, setChartData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

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
          const coins: CoinData[] = response.data;
          if (coins.length > 0) {
            const historicalData = await fetchHistoricalDataFromAPI(coins[0].id);
            createChartData(coins[0].symbol, historicalData);
          } else {
            setError('No coins found');
          }
        }
      } catch (error) {
        console.error('Error fetching coin data:', error);
        setError('Error fetching coin data');
      }
    };

    fetchCoinData();
  }, []);

  const fetchHistoricalDataFromAPI = async (coinId: number) => {
    try {
      const response = await axios.get(
        `https://pro-api.coinmarketcap.com/v2/cryptocurrency/quotes/historical`,
        {
          params: {
            id: coinId,
            time_start: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
            time_end: new Date().toISOString(),
            interval: '1d',
          },
          headers: {
            'X-CMC_PRO_API_KEY': '61d3d338-4fa3-4ffc-8c6e-0caef568bb9b',
          },
        }
      );
      return response.data.data[coinId].quotes;
    } catch (error) {
      console.error('Error fetching historical data from API:', error);
      setError('Error fetching historical data');
      return [];
    }
  };

  const createChartData = (symbol: string, historicalData: HistoricalData[]) => {
    const labels = historicalData.map((data) => new Date(data.timestamp).toLocaleDateString());
    const prices = historicalData.map((data) => data.quote.USD.price);

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