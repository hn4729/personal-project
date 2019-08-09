update poggers_comments
set comment_text = $2,
	giphy = $3
where comment_id = $1;