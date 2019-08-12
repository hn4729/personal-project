select pf.*, pu.gamertag from poggers_follow pf
join poggers_users pu on pu.user_id = pf.following_id
where pf.user_id = $1 and pu.gamertag = $2;