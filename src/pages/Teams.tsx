import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Users, Star, Flag, Trophy } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface Country {
  id: string;
  name: string;
  fifa_ranking: number;
}

function Teams() {
  const [countries, setCountries] = useState<Country[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTeams();
  }, []);

  async function fetchTeams() {
    try {
      const { data } = await supabase
        .from('countries')
        .select('*')
        .order('fifa_ranking');

      if (data) {
        setCountries(data);
      }
    } catch (error) {
      console.error('Error fetching teams:', error);
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
        <h1 className="text-4xl font-bold text-white mb-2">National Teams</h1>
        <p className="text-gray-300">All participating teams in the World Cup 2022</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
          <div className="col-span-3 text-center text-white">Loading teams...</div>
        ) : (
          countries.map((country) => (
            <motion.div
              key={country.id}
              whileHover={{ scale: 1.02 }}
              className="bg-white/10 rounded-xl p-6 backdrop-blur-lg"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <Flag className="h-6 w-6 text-blue-400" />
                  <h3 className="text-xl font-semibold text-white">{country.name}</h3>
                </div>
                <div className="flex items-center space-x-2">
                  <Star className="h-5 w-5 text-yellow-400" />
                  <span className="text-sm text-gray-300">Rank #{country.fifa_ranking}</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mt-6">
                <div className="bg-white/5 rounded-lg p-3">
                  <div className="text-sm text-gray-300">Players</div>
                  <div className="text-xl font-semibold text-white">26</div>
                </div>
                <div className="bg-white/5 rounded-lg p-3">
                  <div className="text-sm text-gray-300">Goals</div>
                  <div className="text-xl font-semibold text-white">8</div>
                </div>
              </div>
            </motion.div>
          ))
        )}
      </div>
    </motion.div>
  );
}

export default Teams;