-- DROP DATABASE IF EXISTS typoteka;

CREATE DATABASE typoteka
  WITH
  OWNER = username
  ENCODING = 'UTF8'
  LC_COLLATE = 'C'
  LC_CTYPE = 'UTF-8'
  TABLESPACE = pg_default
  CONNECTION LIMIT = -1;
