select pp.*, pu.gamertag, pu.profile_img from poggers_posts pp
join poggers_users pu on pu.user_id = pp.user_id
order by date desc;