select pp.*, pu.gamertag, pu.profile_img from poggers_posts pp
join poggers_users pu on pu.user_id = pp.user_id
join poggers_game pg on pg.game_id = pp.game_id
where pg.name = $1
order by pp.date desc;