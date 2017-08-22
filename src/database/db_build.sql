BEGIN;

DROP TABLE IF EXISTS users cascade;
DROP TABLE IF EXISTS diary cascade;

CREATE TABLE users (
	username VARCHAR(20) PRIMARY KEY,
	password VARCHAR NOT NULL
);

CREATE TABLE diary(
	id SERIAL PRIMARY KEY NOT NULL,
	username VARCHAR(20) REFERENCES users(username),
	text text NOT NULL,
	date DATE NOT NULL
);

INSERT INTO users(username,password) VALUES
	('moaz','123'),
	('maha','1234'),
	('ahmed','1232'),
	('ali','1237');

INSERT INTO diary(username,text,date) VALUES 
	('moaz', 'hello world foram moaz','2017-08-20'),
	('maha', 'hello world from maha','2017-08-19'),
	('ahmed', 'hello world from ahmed','2017-08-18'),
	('ali', 'hello world from ali','2017-08-17');

COMMIT;