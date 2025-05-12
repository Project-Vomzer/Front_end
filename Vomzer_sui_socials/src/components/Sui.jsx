import { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';

const Sui = () => {
  const [data, setData] = useState({
    pairs: { BTC: null, ETH: null },
    fiats: { usd: null, eur: null, ngn: null },
    chartData: null,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [retryCount, setRetryCount] = useState(0);

  const USE_MOCK_DATA = import.meta.env.DEV; 
  const API_RETRY_DELAY = 60000; 
  const API_REFRESH_INTERVAL = 300000; 

  const mockData = {
    pairs: {
      BTC: 0.000048,
      ETH: 0.0012,
    },
    fiats: {
      usd: 1.22,
      eur: 1.05,
      ngn: 1800,
    },
    chartData: Array.from({ length: 30 }, (_, i) => ({
      x: new Date(Date.now() - (29 - i) * 86400000),
      y: 1.2 + Math.random() * 0.2,
    })),
  };

  const fetchWithRetry = async (url, options = {}, retries = 3) => {
    try {
      const response = await fetch(url, options);
      if (!response.ok) {
        if (response.status === 429 && retries > 0) {
          const delay = Math.pow(2, 4 - retries) * 1000;
          await new Promise(resolve => setTimeout(resolve, delay));
          return fetchWithRetry(url, options, retries - 1);
        }
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    } catch (error) {
      if (retries > 0) {
        const delay = Math.pow(2, 4 - retries) * 1000;
        await new Promise(resolve => setTimeout(resolve, delay));
        return fetchWithRetry(url, options, retries - 1);
      }
      throw error;
    }
  };

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);

      if (USE_MOCK_DATA) {
        console.log('Using mock data in development');
        setData(mockData);
        return;
      }

      const [chartData, priceData] = await Promise.all([
        fetchWithRetry('/api/coingecko/coins/sui/market_chart?vs_currency=usd&days=30&interval=daily'),
        fetchWithRetry('/api/coingecko/simple/price?ids=sui,bitcoin,ethereum&vs_currencies=usd,eur,ngn,btc,eth'),
      ]);

      setData({
        pairs: {
          BTC: parseFloat(priceData.sui?.btc || 0),
          ETH: parseFloat(priceData.sui?.eth || 0),
        },
        fiats: {
          usd: parseFloat(priceData.sui?.usd || 0),
          eur: parseFloat(priceData.sui?.eur || 0),
          ngn: parseFloat(priceData.sui?.ngn || 0),
        },
        chartData: chartData.prices?.map(([timestamp, price]) => ({
          x: new Date(timestamp),
          y: parseFloat(price),
        })) || [],
      });
      setRetryCount(0);
    } catch (error) {
      console.error('Fetch error:', error);
      setError(error.message);
      setRetryCount(prev => prev + 1);
      
      if (retryCount >= 2) {
        setData(mockData);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, API_REFRESH_INTERVAL);
    return () => clearInterval(interval);
  }, [retryCount]);

  const chartOptions = {
    chart: {
      type: 'area',
      height: 200,
      toolbar: { show: false },
      zoom: { enabled: false },
    },
    colors: ['#6C5DD3'],
    dataLabels: { enabled: false },
    stroke: { curve: 'smooth', width: 2 },
    fill: {
      type: 'gradient',
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.7,
        opacityTo: 0.3,
      },
    },
    xaxis: { type: 'datetime' },
    yaxis: { labels: { formatter: (val) => `$${val?.toFixed(2) || '0.00'}` } },
    tooltip: {
      x: { format: 'dd MMM yyyy' },
    },
  };

  if (loading) {
    return (
      <div className="h-full space-y-4 p-4">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="bg-white rounded-xl p-4 shadow-sm h-40 flex items-center justify-center animate-pulse">
            Loading data...
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="h-full space-y-4 overflow-y-auto ">
      {error && (
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-lg">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-yellow-700">
                {error} {retryCount < 3 ? 'Retrying...' : 'Using mock data'}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Crypto Pairs */}
      <div className="bg-white rounded-xl p-4 shadow-sm">
        <h3 className="font-bold text-sm mb-3">SUI PAIRS</h3>
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-gray-600">SUI/BTC</span>
            <span className="font-medium">{data.pairs.BTC?.toFixed(8) || 'N/A'}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-600">SUI/ETH</span>
            <span className="font-medium">{data.pairs.ETH?.toFixed(6) || 'N/A'}</span>
          </div>
        </div>
      </div>

      {/* Fiat Values */}
      <div className="bg-white rounded-xl p-4 shadow-sm">
        <h3 className="font-bold text-sm mb-3">FIAT VALUES</h3>
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-gray-600">USD</span>
            <span className="font-medium">${data.fiats.usd?.toFixed(4) || 'N/A'}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-600">EUR</span>
            <span className="font-medium">€{data.fiats.eur?.toFixed(4) || 'N/A'}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-600">NGN</span>
            <span className="font-medium">₦{data.fiats.ngn?.toFixed(2) || 'N/A'}</span>
          </div>
        </div>
      </div>

      {/* Chart */}
      <div className="bg-black rounded-xl p-4">
        <h3 className="font-bold text-white mb-3">SUI PRICE CHART (30D)</h3>
        <Chart
          options={chartOptions}
          series={[{ name: 'SUI Price', data: data.chartData || [] }]}
          type="area"
          height={200}
        />
      </div>
    </div>
  );
};

export default Sui;