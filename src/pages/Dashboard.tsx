import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Trophy, Medal, Goal, Award } from 'lucide-react';
import { Line, Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';
import { supabase } from '../lib/supabase';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

interface TopScorer {
  name: string;
  goals: number;
  country: { name: string };
}

function Dashboard() {
  const [topScorers, setTopScorers] = useState<TopScorer[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    try {
      const { data: scorersData } = await supabase
        .from('players')
        .select(`
          name,
          country:countries(name),
          top_scorers!inner(goals)
        `)
        .order('top_scorers(goals)', { ascending: false })
        .limit(5);

      if (scorersData) {
        setTopScorers(scorersData);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  }

  const goalsScoredData = {
    labels: topScorers.map(scorer => scorer.name),
    datasets: [
      {
        label: 'Goals Scored',
        data: topScorers.map(scorer => scorer.top_scorers[0].goals),
        backgroundColor: 'rgba(255, 206, 86, 0.5)',
        borderColor: 'rgba(255, 206, 86, 1)',
        borderWidth: 2,
        fill: true,
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
        <h1 className="text-4xl font-bold text-white mb-2">World Cup Dashboard</h1>
        <p className="text-gray-300">Real-time statistics and analysis from Qatar 2022</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-white/10 rounded-xl p-6 backdrop-blur-lg"
        >
          <div className="flex items-center justify-between mb-4">
            <Trophy className="h-8 w-8 text-yellow-400" />
            <span className="text-sm text-gray-300">Total Teams</span>
          </div>
          <div className="text-3xl font-bold text-white">32</div>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-white/10 rounded-xl p-6 backdrop-blur-lg"
        >
          <div className="flex items-center justify-between mb-4">
            <Medal className="h-8 w-8 text-blue-400" />
            <span className="text-sm text-gray-300">Matches Played</span>
          </div>
          <div className="text-3xl font-bold text-white">64</div>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-white/10 rounded-xl p-6 backdrop-blur-lg"
        >
          <div className="flex items-center justify-between mb-4">
            <Goal className="h-8 w-8 text-green-400" />
            <span className="text-sm text-gray-300">Total Goals</span>
          </div>
          <div className="text-3xl font-bold text-white">172</div>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-white/10 rounded-xl p-6 backdrop-blur-lg"
        >
          <div className="flex items-center justify-between mb-4">
            <Award className="h-8 w-8 text-purple-400" />
            <span className="text-sm text-gray-300">Top Scorer Goals</span>
          </div>
          <div className="text-3xl font-bold text-white">
            {topScorers[0]?.top_scorers[0]?.goals || 0}
          </div>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white/10 rounded-xl p-6 backdrop-blur-lg"
        >
          <h2 className="text-xl font-semibold text-white mb-6">Top Scorers</h2>
          <div className="h-[300px]">
            <Bar data={goalsScoredData} options={chartOptions} />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white/10 rounded-xl p-6 backdrop-blur-lg"
        >
          <h2 className="text-xl font-semibold text-white mb-6">Goals Timeline</h2>
          <div className="h-[300px]">
            <Line
              data={{
                labels: ['Group Stage', 'Round of 16', 'Quarter-finals', 'Semi-finals', 'Final'],
                datasets: [
                  {
                    label: 'Goals per Round',
                    data: [120, 28, 12, 8, 4],
                    borderColor: 'rgba(75, 192, 192, 1)',
                    tension: 0.4,
                    fill: true,
                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                  },
                ],
              }}
              options={chartOptions}
            />
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

export default Dashboard;