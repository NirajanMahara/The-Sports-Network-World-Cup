/*
  # Fix table relationships for World Cup data

  1. Changes
    - Add unique constraint to player_id in top_scorers table
    - Modify the relationship between players and top_scorers to be one-to-one

  2. Security
    - Maintain existing RLS policies
*/

-- Modify top_scorers table to ensure one-to-one relationship with players
ALTER TABLE top_scorers
ADD CONSTRAINT unique_player_scorer UNIQUE (player_id);