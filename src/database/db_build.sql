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
	('moaz', 'hey today is 20 Aug','08-20-2017'),
	('moaz', 'hey today is 19 Aug','08-19-2017'),
	('moaz', 'hey today is 18 Aug','08-18-2017'),
	('maha', 'hello world from maha','08-19-2017'),
	('ahmed', 'hello world from ahmed','08-20-2017'),
	('ali', 'hello world from ali','08-27-2017');

COMMIT;
