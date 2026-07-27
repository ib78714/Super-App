import { useQuery } from '@tanstack/react-query';

// قائمة شاملة لأشهر العملات الرقمية
const allCoinsData = [
  { id: 'btc', name: 'Bitcoin', symbol: 'BTC', price: 64250.00, change: 2.45, image: 'https://assets.coingecko.com/coins/images/1/large/bitcoin.png' },
  { id: 'eth', name: 'Ethereum', symbol: 'ETH', price: 3480.50, change: -1.12, image: 'https://assets.coingecko.com/coins/images/279/large/ethereum.png' },
  { id: 'sol', name: 'Solana', symbol: 'SOL', price: 145.20, change: 5.80, image: 'https://assets.coingecko.com/coins/images/4128/large/solana.png' },
  { id: 'bnb', name: 'BNB', symbol: 'BNB', price: 575.10, change: 0.45, image: 'https://assets.coingecko.com/coins/images/825/large/bnb-icon2_2x.png' },
  { id: 'xrp', name: 'XRP', symbol: 'XRP', price: 0.58, change: 3.15, image: 'https://assets.coingecko.com/coins/images/44/large/xrp-symbol-white-128.png' },
  { id: 'ada', name: 'Cardano', symbol: 'ADA', price: 0.38, change: -2.30, image: 'https://assets.coingecko.com/coins/images/975/large/cardano.png' },
  { id: 'doge', name: 'Dogecoin', symbol: 'DOGE', price: 0.12, change: 8.40, image: 'https://assets.coingecko.com/coins/images/5/large/dogecoin.png' },
  { id: 'avax', name: 'Avalanche', symbol: 'AVAX', price: 26.80, change: -0.85, image: 'https://assets.coingecko.com/coins/images/12559/large/Avalanche_Circle_RedWhite_Trans.png' },
  { id: 'link', name: 'Chainlink', symbol: 'LINK', price: 13.40, change: 1.90, image: 'https://assets.coingecko.com/coins/images/877/large/chainlink-new-logo.png' },
  { id: 'dot', name: 'Polkadot', symbol: 'DOT', price: 6.10, change: -3.20, image: 'https://assets.coingecko.com/coins/images/12171/large/polkadot.png' },
  { id: 'matic', name: 'Polygon', symbol: 'POL', price: 0.51, change: 4.10, image: 'https://assets.coingecko.com/coins/images/4713/large/polygon.png' },
  { id: 'shib', name: 'Shiba Inu', symbol: 'SHIB', price: 0.000017, change: -1.05, image: 'https://assets.coingecko.com/coins/images/11939/large/shiba.png' },
  { id: 'near', name: 'NEAR Protocol', symbol: 'NEAR', price: 4.85, change: 6.30, image: 'https://assets.coingecko.com/coins/images/10365/large/near.png' },
  { id: 'sui', name: 'Sui', symbol: 'SUI', price: 0.95, change: 12.40, image: 'https://assets.coingecko.com/coins/images/26375/large/sui-ocean-square.png' },
  { id: 'pepe', name: 'Pepe', symbol: 'PEPE', price: 0.000009, change: -4.50, image: 'https://assets.coingecko.com/coins/images/29850/large/pepe-token.png' },
  { id: 'ltc', name: 'Litecoin', symbol: 'LTC', price: 72.30, change: 0.90, image: 'https://assets.coingecko.com/coins/images/2/large/litecoin.png' },
];

const fetchAllMockCryptoPrices = async () => {
  await new Promise((resolve) => setTimeout(resolve, 200));

  return allCoinsData.map((coin, index) => {
    const randomDelta = (Math.random() - 0.48) * (coin.price * 0.006);
    const newPrice = Math.max(0.000001, coin.price + randomDelta);
    const newChange = coin.change + (Math.random() - 0.5) * 0.2;

    return {
      ...coin,
      current_price: coin.price < 0.01 ? parseFloat(newPrice.toFixed(6)) : parseFloat(newPrice.toFixed(2)),
      price_change_percentage_24h: parseFloat(newChange.toFixed(2)),
      market_cap_rank: index + 1,
    };
  });
};

export const useCrypto = () => {
  return useQuery({
    queryKey: ['cryptoPricesAllMock'],
    queryFn: fetchAllMockCryptoPrices,
    refetchInterval: 3000,
  });
};