insert into poggers_posts (user_id, game_id, content_text, image_url, video_url)
values ($1, $2, $3, $4, $5)
returning *;