select pp.*, pu.gamertag, pu.profile_img, pg.name as game from poggers_posts pp
join poggers_users pu on pu.user_id = pp.user_id
join poggers_game pg on pg.game_id = pp.game_id
where pp.post_id = $1;