update poggers_posts
set image_url = $2,
	video_url = $3,
	content_text = $4,
	game_id = (
	select game_id from poggers_game where name = $5
	)
where post_id = $1;