import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Timer, Flag, Calendar, MapPin } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface Match {
  id: string;
  home_team: {
    name: string;
  };
  away_team: {
    name: string;
  };
  home_score: number;
  away_score: number;
  match_date: string;
  stadium: string;
}

function Matches() {
  const [matches, setMatches] = useState<Match[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMatches();
  }, []);

  async function fetchMatches() {
    try {
      const { data } = await supabase
        .from('matches')
        .select(`
          id,
          home_team:countries!matches_home_team_id_fkey(name),
          away_team:countries!matches_away_team_id_fkey(name),
          home_score,
          away_score,
          match_date,
          stadium
        `)
        .order('match_date', { ascending: false });

      if (data) {
        setMatches(data);
      }
    } catch (error) {
      console.error('Error fetching matches:', error);
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
        <h1 className="text-4xl font-bold text-white mb-2">Matches</h1>
        <p className="text-gray-300">All matches from the World Cup 2022</p>
      </div>

      <div className="space-y-6">
        {loading ? (
          <div className="text-center text-white">Loading matches...</div>
        ) : (
          matches.map((match) => (
            <motion.div
              key={match.id}
              whileHover={{ scale: 1.01 }}
              className="bg-white/10 rounded-xl p-6 backdrop-blur-lg"
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
                <div className="flex items-center justify-between md:justify-start space-x-4">
                  <Flag className="h-6 w-6 text-blue-400" />
                  <span className="text-lg font-semibold text-white">{match.home_team.name}</span>
                </div>

                <div className="text-center">
                  <div className="flex items-center justify-center space-x-4">
                    <span className="text-3xl font-bold text-white">{match.home_score}</span>
                    <span className="text-gray-300">vs</span>
                    <span className="text-3xl font-bold text-white">{match.away_score}</span>
                  </div>
                  <div className="mt-2 flex items-center justify-center space-x-2 text-sm text-gray-300">
                    <Calendar className="h-4 w-4" />
                    <span>{new Date(match.match_date).toLocaleDateString()}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between md:justify-end space-x-4">
                  <span className="text-lg font-semibold text-white">{match.away_team.name}</span>
                  <Flag className="h-6 w-6 text-blue-400" />
                </div>
              </div>

              <div className="mt-4 flex items-center justify-center space-x-2 text-sm text-gray-300">
                <MapPin className="h-4 w-4" />
                <span>{match.stadium}</span>
              </div>
            </motion.div>
          ))
        )}
      </div>
    </motion.div>
  );
}

export default Matches;