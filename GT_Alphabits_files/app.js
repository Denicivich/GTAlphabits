// app.js

let spendingChart = null; // Variable to hold the Chart.js instance

// --- 1. Login Logic ---
function handleLogin() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const errorElement = document.getElementById('login-error');

    // Simple client-side validation (REPLACE with actual server authentication)
    if (username === 'testuser' && password === 'password123') {
        document.getElementById('login-section').style.display = 'none';
        document.getElementById('app-section').style.display = 'block';
        errorElement.textContent = '';
    } else {
        errorElement.textContent = 'Invalid username or password.';
    }
}

function handleLogout() {
    document.getElementById('login-section').style.display = 'block';
    document.getElementById('app-section').style.display = 'none';
    document.getElementById('username').value = '';
    document.getElementById('password').value = '';
    document.getElementById('excel-upload').value = ''; // Clear file input
    if (spendingChart) {
        spendingChart.destroy();
        spendingChart = null;
    }
}

// --- 2. Excel File Handling and Charting Logic ---
function handleFileUpload(event) {
    const file = event.target.files[0];
    if (!file) {
        return;
    }
    
    const reader = new FileReader();
    reader.onload = function(e) {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: 'array' });
        
        const firstSheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[firstSheetName];
        
        const jsonSheet = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
        
        processSpendingData(jsonSheet);
    };
    
    reader.readAsArrayBuffer(file);
}

function processSpendingData(data) {
    const categories = []; 
    const amounts = []; 
    const errorElement = document.getElementById('upload-error');
    errorElement.textContent = '';

    // Skip the header row (index 0)
    for (let i = 1; i < data.length; i++) {
        const row = data[i];
        const category = row[0];
        const amount = parseFloat(row[1]);

        if (category && !isNaN(amount)) {
            categories.push(category);
            amounts.push(amount);
        } else if (row[0] || row[1]) {
            console.warn('Skipping invalid row:', row);
        }
    }

    if (categories.length === 0) {
        errorElement.textContent = 'Could not parse spending data. Check that Category is in Column A and Amount is in Column B.';
        if (spendingChart) {
            spendingChart.destroy();
            spendingChart = null;
        }
        return;
    }

    renderChart(categories, amounts);
}

function renderChart(labels, values) {
    const ctx = document.getElementById('spendingChart').getContext('2d');

    if (spendingChart) {
        spendingChart.destroy();
    }

    spendingChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: 'Spending Amount ($)',
                data: values,
                backgroundColor: [
                    'rgba(54, 162, 235, 0.6)', 
                    'rgba(255, 99, 132, 0.6)',
                    'rgba(75, 192, 192, 0.6)',
                    'rgba(255, 206, 86, 0.6)',
                    'rgba(153, 102, 255, 0.6)',
                    'rgba(255, 159, 64, 0.6)'
                ],
                borderColor: [
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 99, 132, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true,
                    title: { display: true, text: 'Amount ($)' }
                },
                x: {
                    title: { display: true, text: 'Spending Category' }
                }
            },
            plugins: { legend: { display: false } }
        }
    });
}