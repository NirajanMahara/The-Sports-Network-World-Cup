-- 1. Top Scorers by Team (with player details)
SELECT 
    c.country_name, 
    p.player_name, 
    p.position, 
    ts.goals, 
    ts.matches_played,
    ROUND(ts.goals::numeric / ts.matches_played, 2) AS goals_per_match
FROM TopScorers ts
JOIN Players p ON ts.player_id = p.player_id
JOIN Countries c ON p.country_id = c.country_id
ORDER BY ts.goals DESC;

-- 2. Most Disciplined Teams (Yellow and Red Cards)
SELECT 
    c.country_name,
    c.fifa_ranking,
    COUNT(DISTINCT yc.card_id) AS yellow_cards,
    COUNT(DISTINCT rc.card_id) AS red_cards,
    COUNT(DISTINCT yc.card_id) + COUNT(DISTINCT rc.card_id) AS total_cards
FROM Countries c
LEFT JOIN Players p ON c.country_id = p.country_id
LEFT JOIN YellowCards yc ON p.player_id = yc.player_id
LEFT JOIN RedCards rc ON p.player_id = rc.player_id
GROUP BY c.country_name, c.fifa_ranking
ORDER BY total_cards DESC;

-- 3. Player Performance Analysis (Combining goals and assists)
SELECT 
    p.player_name,
    c.country_name,
    p.position,
    COALESCE(ts.goals, 0) AS goals,
    COALESCE(al.assists, 0) AS assists,
    COALESCE(ts.goals, 0) + COALESCE(al.assists, 0) AS total_contributions,
    COALESCE(ts.matches_played, al.matches_played) AS matches_played
FROM Players p
JOIN Countries c ON p.country_id = c.country_id
LEFT JOIN TopScorers ts ON p.player_id = ts.player_id
LEFT JOIN AssistLeaders al ON p.player_id = al.player_id
WHERE ts.goals IS NOT NULL OR al.assists IS NOT NULL
ORDER BY total_contributions DESC;

-- 4. Match Analysis with Scorers
SELECT 
    m.match_id,
    c1.country_name AS home_team,
    c2.country_name AS away_team,
    m.home_score,
    m.away_score,
    CASE 
        WHEN m.home_score > m.away_score THEN c1.country_name
        WHEN m.home_score < m.away_score THEN c2.country_name
        ELSE 'Draw'
    END AS winner,
    m.match_date,
    m.stadium,
    (SELECT STRING_AGG(p.player_name, ', ')
     FROM Players p
     JOIN TopScorers ts ON p.player_id = ts.player_id
     WHERE p.country_id = m.home_team_id OR p.country_id = m.away_team_id) AS goal_scorers
FROM Matches m
JOIN Countries c1 ON m.home_team_id = c1.country_id
JOIN Countries c2 ON m.away_team_id = c2.country_id
ORDER BY m.match_date DESC;

-- 5. Team Performance Summary
SELECT 
    c.country_name,
    c.fifa_ranking,
    COUNT(DISTINCT p.player_id) AS total_players,
    SUM(COALESCE(ts.goals, 0)) AS total_goals,
    SUM(COALESCE(al.assists, 0)) AS total_assists,
    COUNT(DISTINCT yc.card_id) AS yellow_cards,
    COUNT(DISTINCT rc.card_id) AS red_cards,
    (SELECT COUNT(*) FROM Matches m WHERE m.home_team_id = c.country_id OR m.away_team_id = c.country_id) AS matches_played,
    (SELECT COUNT(*) FROM Matches m 
     WHERE (m.home_team_id = c.country_id AND m.home_score > m.away_score) 
        OR (m.away_team_id = c.country_id AND m.away_score > m.home_score)) AS matches_won
FROM Countries c
LEFT JOIN Players p ON c.country_id = p.country_id
LEFT JOIN TopScorers ts ON p.player_id = ts.player_id
LEFT JOIN AssistLeaders al ON p.player_id = al.player_id
LEFT JOIN YellowCards yc ON p.player_id = yc.player_id
LEFT JOIN RedCards rc ON p.player_id = rc.player_id
GROUP BY c.country_name, c.fifa_ranking
ORDER BY matches_won DESC, total_goals DESC;

-- 6. Position-based Performance
SELECT 
    p.position,
    COUNT(DISTINCT p.player_id) AS total_players,
    SUM(COALESCE(ts.goals, 0)) AS total_goals,
    SUM(COALESCE(al.assists, 0)) AS total_assists,
    ROUND(SUM(COALESCE(ts.goals, 0))::numeric / COUNT(DISTINCT p.player_id), 2) AS avg_goals_per_player,
    ROUND(SUM(COALESCE(al.assists, 0))::numeric / COUNT(DISTINCT p.player_id), 2) AS avg_assists_per_player
FROM Players p
LEFT JOIN TopScorers ts ON p.player_id = ts.player_id
LEFT JOIN AssistLeaders al ON p.player_id = al.player_id
GROUP BY p.position
ORDER BY total_goals DESC;
