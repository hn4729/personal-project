insert into poggers_follow (user_id, following_id)
values ($1, (select user_id from poggers_users where gamertag = $2));