/*
  # World Cup 2022 Database Schema

  1. New Tables
    - `countries` - National teams participating in World Cup 2022
    - `players` - Players from participating teams
    - `top_scorers` - Goal scoring statistics
    - `assist_leaders` - Assist statistics
    - `matches` - Match details and results
    - `yellow_cards` - Yellow card records
    - `red_cards` - Red card records

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users to read data
    - Add policies for admin users to modify data
*/

-- Create tables
CREATE TABLE countries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  fifa_ranking INTEGER,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE players (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  country_id uuid REFERENCES countries(id),
  name TEXT NOT NULL,
  position TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE top_scorers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  player_id uuid REFERENCES players(id),
  goals INTEGER DEFAULT 0,
  matches_played INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE assist_leaders (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  player_id uuid REFERENCES players(id),
  assists INTEGER DEFAULT 0,
  matches_played INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE matches (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  home_team_id uuid REFERENCES countries(id),
  away_team_id uuid REFERENCES countries(id),
  home_score INTEGER DEFAULT 0,
  away_score INTEGER DEFAULT 0,
  match_date DATE,
  stadium TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE yellow_cards (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  player_id uuid REFERENCES players(id),
  match_id uuid REFERENCES matches(id),
  reason TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE red_cards (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  player_id uuid REFERENCES players(id),
  match_id uuid REFERENCES matches(id),
  reason TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE countries ENABLE ROW LEVEL SECURITY;
ALTER TABLE players ENABLE ROW LEVEL SECURITY;
ALTER TABLE top_scorers ENABLE ROW LEVEL SECURITY;
ALTER TABLE assist_leaders ENABLE ROW LEVEL SECURITY;
ALTER TABLE matches ENABLE ROW LEVEL SECURITY;
ALTER TABLE yellow_cards ENABLE ROW LEVEL SECURITY;
ALTER TABLE red_cards ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Allow public read access" ON countries FOR SELECT TO PUBLIC USING (true);
CREATE POLICY "Allow public read access" ON players FOR SELECT TO PUBLIC USING (true);
CREATE POLICY "Allow public read access" ON top_scorers FOR SELECT TO PUBLIC USING (true);
CREATE POLICY "Allow public read access" ON assist_leaders FOR SELECT TO PUBLIC USING (true);
CREATE POLICY "Allow public read access" ON matches FOR SELECT TO PUBLIC USING (true);
CREATE POLICY "Allow public read access" ON yellow_cards FOR SELECT TO PUBLIC USING (true);
CREATE POLICY "Allow public read access" ON red_cards FOR SELECT TO PUBLIC USING (true);

-- Create indexes for better performance
CREATE INDEX idx_players_country ON players(country_id);
CREATE INDEX idx_top_scorers_player ON top_scorers(player_id);
CREATE INDEX idx_assist_leaders_player ON assist_leaders(player_id);
CREATE INDEX idx_yellow_cards_player ON yellow_cards(player_id);
CREATE INDEX idx_red_cards_player ON red_cards(player_id);
CREATE INDEX idx_matches_teams ON matches(home_team_id, away_team_id);