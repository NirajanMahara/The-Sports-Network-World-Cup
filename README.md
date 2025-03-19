# World Cup Qatar 2022 Database

A comprehensive relational database for World Cup Qatar 2022 statistics, designed for The Sports Network to analyze and present performance data.

## Demo: https://the-sports-network.netlify.app
Site has been successfully deployed!

## Schema Overview

The database consists of interconnected tables capturing teams, players, performance metrics, and disciplinary records:

![ER Diagram The Sports Network World Cup](https://github.com/NirajanMahara/The-Sports-Network-World-Cup/blob/main/World%20Cup%202022%20ER%20Diagram-2025-03-18-154756.png?raw=true)
![Mermaid ER Diagram The Sports Network World Cup Screenshot](https://github.com/NirajanMahara/The-Sports-Network-World-Cup/blob/main/World%20Cup%202022%20ER%20Diagram%20Mermaid%20Screenshot%202025-03-18%20at%2011.49.16%20AM.png?raw=true)


## Supabase
Supabase is an open source Firebase alternative.
Start your project with a Postgres database,

![The Sports Network Supabase Database Screenshot](https://github.com/NirajanMahara/The-Sports-Network-World-Cup/blob/main/The%20Sports%20Network%20Database%20Screenshot%202025-03-18%20at%2011.32.05%20AM.png?raw=true)


## Tables

1. **Countries**
   - `country_id`: Unique identifier for each national team
   - `country_name`: Official name of the country
   - `fifa_ranking`: FIFA ranking as of the 2022 World Cup

2. **Players**
   - `player_id`: Unique identifier for each player
   - `country_id`: Foreign key referencing Countries
   - `player_name`: Full name of the player
   - `position`: Player's primary position (Forward, Midfielder, Defender, Goalkeeper)

3. **TopScorers**
   - `scorer_id`: Unique identifier for each scorer entry
   - `player_id`: Foreign key referencing Players
   - `goals`: Number of goals scored in the tournament
   - `matches_played`: Number of matches played by the player

4. **AssistLeaders**
   - `assist_id`: Unique identifier for each assist entry
   - `player_id`: Foreign key referencing Players
   - `assists`: Number of assists provided in the tournament
   - `matches_played`: Number of matches played by the player

5. **Matches**
   - `match_id`: Unique identifier for each match
   - `home_team_id`: Foreign key referencing Countries
   - `away_team_id`: Foreign key referencing Countries
   - `home_score`: Goals scored by the home team
   - `away_score`: Goals scored by the away team
   - `match_date`: Date when the match was played
   - `stadium`: Stadium where the match was played

6. **YellowCards**
   - `card_id`: Unique identifier for each yellow card
   - `player_id`: Foreign key referencing Players
   - `match_id`: Foreign key referencing Matches
   - `reason`: Description of the reason for the card

7. **RedCards**
   - `card_id`: Unique identifier for each red card
   - `player_id`: Foreign key referencing Players
   - `match_id`: Foreign key referencing Matches
   - `reason`: Description of the reason for the card

## Setup Instructions

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/worldcup-2022-db.git
   cd worldcup-2022-db
   ```

2. Install PostgreSQL if not already installed:
   ```bash
   # For Ubuntu/Debian
   sudo apt-get update
   sudo apt-get install postgresql postgresql-contrib

   # For macOS (using Homebrew)
   brew install postgresql
   ```

3. Create the database and tables:
   ```bash
   psql -U postgres -f schema.sql
   ```

4. Populate the database with sample data:
   ```bash
   python populate_data.py
   ```

5. Run sample queries:
   ```bash
   psql -U postgres -d worldcup2022 -f sample_queries.sql
   ```

## Example Queries

### Top Scorers by Team

```sql
SELECT c.country_name, p.player_name, ts.goals
FROM TopScorers ts
JOIN Players p ON ts.player_id = p.player_id
JOIN Countries c ON p.country_id = c.country_id
ORDER BY ts.goals DESC;
```

### Most Disciplined Teams

```sql
SELECT c.country_name,
       COUNT(DISTINCT yc.card_id) AS yellow_cards,
       COUNT(DISTINCT rc.card_id) AS red_cards,
       COUNT(DISTINCT yc.card_id) + COUNT(DISTINCT rc.card_id) AS total_cards
FROM Countries c
LEFT JOIN Players p ON c.country_id = p.country_id
LEFT JOIN YellowCards yc ON p.player_id = yc.player_id
LEFT JOIN RedCards rc ON p.player_id = rc.player_id
GROUP BY c.country_name
ORDER BY total_cards DESC;
```

### Player Performance Analysis

```sql
SELECT p.player_name,
       c.country_name,
       COALESCE(ts.goals, 0) AS goals,
       COALESCE(al.assists, 0) AS assists,
       COALESCE(ts.goals, 0) + COALESCE(al.assists, 0) AS total_contributions
FROM Players p
JOIN Countries c ON p.country_id = c.country_id
LEFT JOIN TopScorers ts ON p.player_id = ts.player_id
LEFT JOIN AssistLeaders al ON p.player_id = al.player_id
ORDER BY total_contributions DESC;
```

## Scalability and Future Expansion

This database is designed to be scalable for future tournaments:

1. Add more teams and players by simply inserting new records
2. Extend with additional tables for more detailed statistics (e.g., passes, shots, saves)
3. Create views for frequently accessed data combinations
4. Implement user authentication for secure data access
5. Develop a front-end dashboard for visualizing statistics

## Relevance for 2026 World Cup

With Canada co-hosting the 2026 World Cup, this database provides a solid foundation that can be expanded to:

1. Track qualification results and standings
2. Monitor Canadian players' performance
3. Analyze venue-specific statistics
4. Compare team performance across tournament editions

## Contributors

- Nirajan Mahara

## License

This project is licensed under the MIT License - see the LICENSE file for details.


# The-Sports-Network-World-Cup

[Edit in StackBlitz next generation editor ⚡️](https://stackblitz.com/~/github.com/NirajanMahara/The-Sports-Network-World-Cup)