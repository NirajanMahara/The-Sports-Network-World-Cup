import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { UserCircle, Goal, Award, Star } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface Player {
  id: string;
  name: string;
  position: string;
  country: {
    name: string;
  };
  top_scorers: Array<{
    goals: number;
  }>;
}

function Players() {
  const [players, setPlayers] = useState<Player[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPlayers();
  }, []);

  async function fetchPlayers() {
    try {
      const { data } = await supabase
        .from('players')
        .select(`
          id,
          name,
          position,
          country:countries(name),
          top_scorers(goals)
        `)
        .order('name');

      if (data) {
        setPlayers(data);
      }
    } catch (error) {
      console.error('Error fetching players:', error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8"
    >
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-white mb-2">Players</h1>
        <p className="text-gray-300">All players participating in the World Cup 2022</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
          <div className="col-span-3 text-center text-white">Loading players...</div>
        ) : (
          players.map((player) => (
            <motion.div
              key={player.id}
              whileHover={{ scale: 1.02 }}
              className="bg-white/10 rounded-xl p-6 backdrop-blur-lg"
            >
              <div className="flex items-center space-x-4 mb-4">
                <div className="bg-white/5 rounded-full p-3">
                  <UserCircle className="h-8 w-8 text-blue-400" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white">{player.name}</h3>
                  <p className="text-sm text-gray-300">{player.country.name}</p>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="bg-white/5 rounded-lg p-3">
                  <div className="text-sm text-gray-300">Position</div>
                  <div className="text-lg font-semibold text-white">{player.position}</div>
                </div>
                <div className="bg-white/5 rounded-lg p-3">
                  <div className="text-sm text-gray-300">Goals</div>
                  <div className="text-lg font-semibold text-white">
                    {player.top_scorers[0]?.goals || 0}
                  </div>
                </div>
                <div className="bg-white/5 rounded-lg p-3">
                  <div className="text-sm text-gray-300">Rating</div>
                  <div className="text-lg font-semibold text-white flex items-center">
                    <span>8.5</span>
                    <Star className="h-4 w-4 text-yellow-400 ml-1" />
                  </div>
                </div>
              </div>
            </motion.div>
          ))
        )}
      </div>
    </motion.div>
  );
}

export default Players;