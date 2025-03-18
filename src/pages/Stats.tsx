import React from 'react';
import { motion } from 'framer-motion';
import { Bar, Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement } from 'chart.js';
import { Award, Flag, Goal, AlertTriangle } from 'lucide-react';

ChartJS.register(ArcElement);

function Stats() {
  const goalsByTeamData = {
    labels: ['Argentina', 'France', 'Croatia', 'Morocco', 'Brazil', 'Netherlands'],
    datasets: [
      {
        label: 'Goals Scored',
        data: [15, 16, 8, 6, 8, 10],
        backgroundColor: [
          'rgba(255, 99, 132, 0.5)',
          'rgba(54, 162, 235, 0.5)',
          'rgba(255, 206, 86, 0.5)',
          'rgba(75, 192, 192, 0.5)',
          'rgba(153, 102, 255, 0.5)',
          'rgba(255, 159, 64, 0.5)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const cardDistributionData = {
    labels: ['Yellow Cards', 'Red Cards'],
    datasets: [
      {
        data: [219, 4],
        backgroundColor: [
          'rgba(255, 206, 86, 0.5)',
          'rgba(255, 99, 132, 0.5)',
        ],
        borderColor: [
          'rgba(255, 206, 86, 1)',
          'rgba(255, 99, 132, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
        labels: {
          color: 'white',
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(255, 255, 255, 0.1)',
        },
        ticks: {
          color: 'white',
        },
      },
      x: {
        grid: {
          color: 'rgba(255, 255, 255, 0.1)',
        },
        ticks: {
          color: 'white',
        },
      },
    },
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8"
    >
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-white mb-2">Tournament Statistics</h1>
        <p className="text-gray-300">Comprehensive statistics from the World Cup 2022</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <motion.div
          wh

ileHover={{ scale: 1.02 }}
          className="bg-white/10 rounded-xl p-6 backdrop-blur-lg"
        >
          <div className="flex items-center justify-between mb-4">
            <Goal className="h-8 w-8 text-green-400" />
            <span className="text-sm text-gray-300">Total Goals</span>
          </div>
          <div className="text-3xl font-bold text-white">172</div>
          <div className="text-sm text-gray-300 mt-2">Avg: 2.7 per match</div>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-white/10 rounded-xl p-6 backdrop-blur-lg"
        >
          <div className="flex items-center justify-between mb-4">
            <Flag className="h-8 w-8 text-blue-400" />
            <span className="text-sm text-gray-300">Teams</span>
          </div>
          <div className="text-3xl font-bold text-white">32</div>
          <div className="text-sm text-gray-300 mt-2">From 5 confederations</div>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-white/10 rounded-xl p-6 backdrop-blur-lg"
        >
          <div className="flex items-center justify-between mb-4">
            <AlertTriangle className="h-8 w-8 text-yellow-400" />
            <span className="text-sm text-gray-300">Yellow Cards</span>
          </div>
          <div className="text-3xl font-bold text-white">219</div>
          <div className="text-sm text-gray-300 mt-2">Avg: 3.4 per match</div>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-white/10 rounded-xl p-6 backdrop-blur-lg"
        >
          <div className="flex items-center justify-between mb-4">
            <Award className="h-8 w-8 text-red-400" />
            <span className="text-sm text-gray-300">Red Cards</span>
          </div>
          <div className="text-3xl font-bold text-white">4</div>
          <div className="text-sm text-gray-300 mt-2">Avg: 0.06 per match</div>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white/10 rounded-xl p-6 backdrop-blur-lg"
        >
          <h2 className="text-xl font-semibold text-white mb-6">Goals by Team</h2>
          <div className="h-[300px]">
            <Bar data={goalsByTeamData} options={chartOptions} />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white/10 rounded-xl p-6 backdrop-blur-lg"
        >
          <h2 className="text-xl font-semibold text-white mb-6">Card Distribution</h2>
          <div className="h-[300px] flex items-center justify-center">
            <Doughnut
              data={cardDistributionData}
              options={{
                responsive: true,
                plugins: {
                  legend: {
                    position: 'top',
                    labels: {
                      color: 'white',
                    },
                  },
                },
              }}
            />
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

export default Stats;