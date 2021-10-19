SELECT * FROM categories;

SELECT id, name FROM categories
  JOIN articles_categories
  ON id = article_id
  GROUP BY id
  ORDER BY id ASC;

SELECT id, name, count(article_id) FROM categories
  LEFT JOIN articles_categories
  ON id = article_id
  GROUP BY id
  ORDER BY count DESC;

SELECT
  articles.id,
  articles.title,
  articles.announce,
  articles.created_date,
  users.first_name,
  users.last_name,
  users.email,
  (
    SELECT COUNT(comments.id)
    FROM comments
    WHERE comments.article_id = articles.id
  ) as comments_count,
  STRING_AGG(DISTINCT categories.name, ', ') AS categoriest_list
FROM articles
  JOIN users ON users.id = articles.user_id
  JOIN articles_categories ON articles_categories.article_id = articles.id
  JOIN categories ON categories.id = articles_categories.category_id
GROUP BY articles.id, users.id
ORDER BY articles.created_date DESC;

SELECT
  articles.id,
  articles.title,
  articles.announce,
  articles.full_text,
  articles.created_date,
  articles.picture,
  users.first_name,
  users.last_name,
  users.email,
  (
    SELECT COUNT(comments.id)
    FROM comments
    WHERE comments.article_id = articles.id
  ) AS comments_count,
  STRING_AGG(DISTINCT categories.name, ', ') as categoriest_list
FROM articles
  JOIN users ON users.id = articles.user_id
  JOIN articles_categories ON articles_categories.article_id = articles.id
  JOIN categories ON categories.id = articles_categories.category_id
WHERE articles.id = 1
GROUP BY articles.id, users.id;

SELECT
  comments.id,
  comments.article_id,
  users.first_name,
  users.last_name,
  users.email,
  comments.text
FROM comments
  JOIN users ON users.id = comments.user_id
GROUP BY comments.id, users.id
  ORDER BY comments.created_date DESC
  LIMIT 5;

SELECT
  comments.id,
  comments.article_id,
  users.first_name,
  users.last_name,
  comments.text
FROM comments
  JOIN users on users.id = comments.user_id
WHERE comments.article_id = 1
  ORDER BY comments.created_date DESC;

UPDATE articles
SET title = 'Уникальное предложение!'
WHERE id = 1;
