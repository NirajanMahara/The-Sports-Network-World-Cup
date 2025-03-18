-- Create the database
CREATE DATABASE worldcup2022;

-- Connect to the database
\c worldcup2022

-- Create Countries table
CREATE TABLE Countries (
    country_id SERIAL PRIMARY KEY,
    country_name VARCHAR(100) NOT NULL,
    fifa_ranking INTEGER
);

-- Create Players table
CREATE TABLE Players (
    player_id SERIAL PRIMARY KEY,
    country_id INTEGER REFERENCES Countries(country_id),
    player_name VARCHAR(100) NOT NULL,
    position VARCHAR(50)
);

-- Create TopScorers table
CREATE TABLE TopScorers (
    scorer_id SERIAL PRIMARY KEY,
    player_id INTEGER REFERENCES Players(player_id),
    goals INTEGER DEFAULT 0,
    matches_played INTEGER DEFAULT 0
);

-- Create AssistLeaders table
CREATE TABLE AssistLeaders (
    assist_id SERIAL PRIMARY KEY,
    player_id INTEGER REFERENCES Players(player_id),
    assists INTEGER DEFAULT 0,
    matches_played INTEGER DEFAULT 0
);

-- Create Match table
CREATE TABLE Matches (
    match_id SERIAL PRIMARY KEY,
    home_team_id INTEGER REFERENCES Countries(country_id),
    away_team_id INTEGER REFERENCES Countries(country_id),
    home_score INTEGER DEFAULT 0,
    away_score INTEGER DEFAULT 0,
    match_date DATE,
    stadium VARCHAR(100)
);

-- Create YellowCards table
CREATE TABLE YellowCards (
    card_id SERIAL PRIMARY KEY,
    player_id INTEGER REFERENCES Players(player_id),
    match_id INTEGER REFERENCES Matches(match_id),
    reason VARCHAR(200)
);

-- Create RedCards table
CREATE TABLE RedCards (
    card_id SERIAL PRIMARY KEY,
    player_id INTEGER REFERENCES Players(player_id),
    match_id INTEGER REFERENCES Matches(match_id),
    reason VARCHAR(200)
);

-- Create indexes for improved query performance
CREATE INDEX idx_player_country ON Players(country_id);
CREATE INDEX idx_topscorers_player ON TopScorers(player_id);
CREATE INDEX idx_assistleaders_player ON AssistLeaders(player_id);
CREATE INDEX idx_yellowcards_player ON YellowCards(player_id);
CREATE INDEX idx_redcards_player ON RedCards(player_id);
CREATE INDEX idx_match_home_team ON Matches(home_team_id);
CREATE INDEX idx_match_away_team ON Matches(away_team_id);
