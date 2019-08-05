INSERT INTO poggers_users
(username, password, gamertag, profile_img)
VALUES
($1, $2, $3, $4)
returning *;