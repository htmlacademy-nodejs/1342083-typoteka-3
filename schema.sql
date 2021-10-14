DROP TABLE IF EXISTS categories CASCADE;
DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS publications CASCADE;
DROP TABLE IF EXISTS comments CASCADE;
DROP TABLE IF EXISTS publications_categories CASCADE;

CREATE TABLE categories(
  id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  name varchar(255) NOT NULL
);

CREATE TABLE users(
  id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  email varchar(255) UNIQUE NOT NULL,
  first_name varchar(255) NOT NULL,
  last_name varchar(255) NOT NULL,
  password_hash varchar(255) NOT NULL,
  avatar varchar(50)
);

CREATE TABLE publications(
  id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  title varchar(250) NOT NULL,
  picture varchar(50),
  created_date timestamp DEFAULT current_timestamp,
  announce varchar(250) NOT NULL,
  full_text varchar(1000),
  user_id integer NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE comments(
  id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  text text NOT NULL,
  created_date timestamp DEFAULT current_timestamp,
  publication_id integer NOT NULL,
  user_id integer NOT NULL,
  FOREIGN KEY (publication_id) REFERENCES publications(id),
  FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE publications_categories(
  publication_id integer NOT NULL,
  category_id integer NOT NULL,
  PRIMARY KEY (publication_id, category_id),
  FOREIGN KEY (publication_id) REFERENCES publications(id),
  FOREIGN KEY (category_id) REFERENCES categories(id)
);

CREATE INDEX ON publications(title);
