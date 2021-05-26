DROP DATABASE IF EXISTS dogs;
CREATE DATABASE dogs;

DROP TABLE IF EXISTS dogs;

CREATE TABLE dogs 
(
    name TEXT,
    breed TEXT,
    dogId SERIAL
);

INSERT INTO dogs (name, breed) VALUES ('Charlie', 'Husky');
INSERT INTO dogs (name, breed) VALUES ('Rusty', 'Blood Hound');
INSERT INTO dogs (name, breed) VALUES ('Boris', 'Fox Hound');
INSERT INTO dogs (name, breed) VALUES ('Sparky', 'Pug');
INSERT INTO dogs (name, breed) VALUES ('Potato', 'Pitbull');