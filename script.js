const API_URL = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false';
let cryptoData = [];

// Fetch data using .then
fetch(API_URL)
  .then(response => response.json())
  .then(data => {
    cryptoData = data;
    renderTable();
  })
  .catch(error => {
    console.error('Error:', error);
  });

// Fetch data using async/await
async function fetchDataAsync() {
  try {
    const response = await fetch(API_URL);
    const data = await response.json();
    cryptoData = data;
    renderTable();
  } catch (error) {
    console.error('Error:', error);
  }
}

// Render table with crypto data
function renderTable() {
  const tableBody = document.getElementById('cryptoTableBody');
  tableBody.innerHTML = '';

  cryptoData.forEach(crypto => {
    const row = document.createElement('tr');

    const imageCell = document.createElement('td');
    const image = document.createElement('img');
    image.src = crypto.image;
    image.width = 30;
    image.height = 30;
    imageCell.appendChild(image);
    row.appendChild(imageCell);

    const nameCell = document.createElement('td');
    nameCell.textContent = crypto.name;
    row.appendChild(nameCell);

    const idCell = document.createElement('td');
    idCell.textContent = crypto.id;
    row.appendChild(idCell);

    const symbolCell = document.createElement('td');
    symbolCell.textContent = crypto.symbol;
    row.appendChild(symbolCell);

    const priceCell = document.createElement('td');
    priceCell.textContent = crypto.current_price;
    row.appendChild(priceCell);

    const volumeCell = document.createElement('td');
    volumeCell.textContent = crypto.total_volume;
    row.appendChild(volumeCell);

    const marketCapCell = document.createElement('td');
    marketCapCell.textContent = crypto.market_cap;
    row.appendChild(marketCapCell);

    const percentageChangeCell = document.createElement('td');
    percentageChangeCell.textContent = crypto.price_change_percentage_24h;
    row.appendChild(percentageChangeCell);

    tableBody.appendChild(row);
  });
}

// Search functionality
function search() {
  const searchInput = document.getElementById('searchInput');
  const searchText = searchInput.value.toLowerCase();
  const filteredData = cryptoData.filter(crypto =>
    crypto.name.toLowerCase().includes(searchText) ||
    crypto.symbol.toLowerCase().includes(searchText) ||
    crypto.id.toLowerCase().includes(searchText)
  );
  cryptoData = filteredData;
  renderTable();
}

// Sort functionality
function sort(key) {
  cryptoData.sort((a, b) => {
    if (key === 'marketCap') {
      return b.market_cap - a.market_cap;
    } else if (key === 'percentageChange') {
      return b.price_change_percentage_24h - a.price_change_percentage_24h;
    }
  });
  renderTable();
}
