-- prideti post title prie comm lenteles
SELECT COUNT(post_comments.post_id), posts.title
FROM `post_comments` 
JOIN `posts`
ON `posts`.`post_id`=`post_comments`.`post_id`
GROUP BY post_comments.post_id

-- prideti post title prie comm lenteles
SELECT `comm_id`, post_comments.`author`,`content`, post_comments.`post_id`,`created_at`, posts.title
FROM `post_comments` 
JOIN `posts`
ON `posts`.`post_id`=`post_comments`.`post_id`