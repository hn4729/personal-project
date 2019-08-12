delete from poggers_follow
where user_id = $1 and following_id = (select user_id from poggers_users where gamertag = $2);