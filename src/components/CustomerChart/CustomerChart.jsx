import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { Bar } from 'react-chartjs-2';
import Chart from 'chart.js/auto';

export default function CustomerChart() {
  const { id } = useParams();
  const [chartData, setChartData] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/data/db.json'); // Fetching the JSON file
        const data = await response.json();

        const customerId = parseInt(id, 10);
        const transactions = data.transactions.filter(transaction => transaction.customer_id === customerId);

        console.log('Filtered Transactions for Customer ID:', customerId, transactions);

        const dailyTotals = transactions.reduce((acc, transaction) => {
          const date = new Date(transaction.date).toLocaleDateString(); // Adjust the date format as needed
          if (!acc[date]) {
            acc[date] = 0;
          }
          acc[date] += transaction.amount;
          return acc;
        }, {});

        console.log('Daily Totals:', dailyTotals);

        const processedData = Object.keys(dailyTotals).map((date) => ({
          date,
          total: dailyTotals[date],
        }));

        console.log('Processed Data for Chart:', processedData);

        // Calculate total transaction amount
        const total = transactions.reduce((sum, transaction) => sum + transaction.amount, 0);
        setTotalAmount(total);

        setChartData(processedData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [id]);

  const data = {
    labels: chartData.map((data) => data.date),
    datasets: [
      {
        label: 'Total Transactions',
        backgroundColor: '#3498db', // Changed the bar color to a modern blue shade
        data: chartData.map((data) => data.total),
      },
    ],
  };

  const options = {
    plugins: {
      datalabels: {
        display: true,
        color: 'white', // Changed the datalabels color to white for better contrast
        textAlign: 'center',
        font: {
          weight: 'bold',
          size: 12,
        },
      },
    },
    scales: {
      x: {
        ticks: {
          font: {
            size: 12,
          },
        },
      },
      y: {
        ticks: {
          font: {
            size: 12,
          },
        },
      },
    },
    responsive: true,
  };

  return (
    <div className='h-full flex justify-center items-center flex-col bg-gray-100 p-6'>
      <div className='w-full md:w-2/3 lg:w-1/2 bg-white p-6 rounded-lg shadow-lg'>
        <Bar
          data={data}
          options={options}
          plugins={[ChartDataLabels]}
        />
      </div>
      <div className='w-full md:w-2/3 lg:w-1/2 text-center mt-6'>
        <h2 className='text-lg font-semibold'>Total Transaction Amount: <span className='text-green-600 font-bold'>${totalAmount}</span></h2>
      </div>
    </div>
  );
}
