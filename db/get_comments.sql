select pc.*, pu.gamertag, pu.profile_img from poggers_comments pc
join poggers_users pu on pu.user_id = pc.user_id
where pc.post_id = $1
order by date desc;