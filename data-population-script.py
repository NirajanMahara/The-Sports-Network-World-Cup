import psycopg2
from psycopg2 import sql

# Connect to the database
conn = psycopg2.connect(
    dbname="worldcup2022",
    user="postgres",
    password="your_password",  # Replace with your actual password
    host="localhost"
)

# Create a cursor
cur = conn.cursor()

# Insert countries
countries = [
    (1, 'Argentina', 1),
    (2, 'France', 4),
    (3, 'Croatia', 12)
]

for country in countries:
    cur.execute(
        "INSERT INTO Countries (country_id, country_name, fifa_ranking) VALUES (%s, %s, %s)",
        country
    )

# Insert players
players = [
    # Argentina
    (1, 1, 'Lionel Messi', 'Forward'),
    (2, 1, 'Julián Álvarez', 'Forward'),
    (3, 1, 'Ángel Di María', 'Midfielder'),
    (4, 1, 'Emiliano Martínez', 'Goalkeeper'),
    (5, 1, 'Nicolás Otamendi', 'Defender'),
    
    # France
    (6, 2, 'Kylian Mbappé', 'Forward'),
    (7, 2, 'Olivier Giroud', 'Forward'),
    (8, 2, 'Antoine Griezmann', 'Midfielder'),
    (9, 2, 'Hugo Lloris', 'Goalkeeper'),
    (10, 2, 'Raphaël Varane', 'Defender'),
    
    # Croatia
    (11, 3, 'Luka Modrić', 'Midfielder'),
    (12, 3, 'Ivan Perišić', 'Forward'),
    (13, 3, 'Andrej Kramarić', 'Forward'),
    (14, 3, 'Dominik Livaković', 'Goalkeeper'),
    (15, 3, 'Joško Gvardiol', 'Defender')
]

for player in players:
    cur.execute(
        "INSERT INTO Players (player_id, country_id, player_name, position) VALUES (%s, %s, %s, %s)",
        player
    )

# Insert top scorers
top_scorers = [
    (1, 1, 7, 7),  # Messi - 7 goals
    (2, 2, 4, 7),  # Álvarez - 4 goals
    (3, 6, 8, 7),  # Mbappé - 8 goals
    (4, 7, 4, 7),  # Giroud - 4 goals
    (5, 11, 1, 7), # Modrić - 1 goal
    (6, 13, 2, 7)  # Kramarić - 2 goals
]

for scorer in top_scorers:
    cur.execute(
        "INSERT INTO TopScorers (scorer_id, player_id, goals, matches_played) VALUES (%s, %s, %s, %s)",
        scorer
    )

# Insert assist leaders
assist_leaders = [
    (1, 1, 3, 7),  # Messi - 3 assists
    (2, 3, 1, 7),  # Di María - 1 assist
    (3, 8, 3, 7),  # Griezmann - 3 assists
    (4, 11, 2, 7), # Modrić - 2 assists
    (5, 12, 1, 7)  # Perišić - 1 assist
]

for leader in assist_leaders:
    cur.execute(
        "INSERT INTO AssistLeaders (assist_id, player_id, assists, matches_played) VALUES (%s, %s, %s, %s)",
        leader
    )

# Insert matches
matches = [
    (1, 1, 2, 3, 3, '2022-12-18', 'Lusail Stadium'),  # Argentina vs France (Final)
    (2, 1, 3, 3, 0, '2022-12-13', 'Lusail Stadium'),  # Argentina vs Croatia (Semi-Final)
    (3, 2, 3, 2, 1, '2022-12-14', 'Al Bayt Stadium')  # France vs Morocco (Semi-Final)
]

for match in matches:
    cur.execute(
        "INSERT INTO Matches (match_id, home_team_id, away_team_id, home_score, away_score, match_date, stadium) VALUES (%s, %s, %s, %s, %s, %s, %s)",
        match
    )

# Insert yellow cards
yellow_cards = [
    (1, 5, 1, 'Reckless tackle'),  # Otamendi in Final
    (2, 6, 1, 'Time wasting'),      # Mbappé in Final
    (3, 10, 1, 'Unsporting behavior'), # Varane in Final
    (4, 11, 2, 'Dissent'),          # Modrić in Semi-Final
    (5, 3, 2, 'Tactical foul')      # Di María in Semi-Final
]

for card in yellow_cards:
    cur.execute(
        "INSERT INTO YellowCards (card_id, player_id, match_id, reason) VALUES (%s, %s, %s, %s)",
        card
    )

# Insert red cards
red_cards = [
    (1, 15, 2, 'Serious foul play')  # Gvardiol in Semi-Final
]

for card in red_cards:
    cur.execute(
        "INSERT INTO RedCards (card_id, player_id, match_id, reason) VALUES (%s, %s, %s, %s)",
        card
    )

# Commit the changes
conn.commit()

# Close the cursor and connection
cur.close()
conn.close()

print("Database populated successfully!")
