--Structure of the database
CREATE DATABASE SquishyDB;

CREATE TABLE Guilds(
    messageID INT NOT NULL PRIMARY KEY,
    description VARCHAR(100) NOT NULL,
    time TIMESTAMP NOT NULL
);
