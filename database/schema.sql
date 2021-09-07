--Structure of the database
CREATE DATABASE SquishyDB;

CREATE TABLE Reminders(
    messageID INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    description VARCHAR(100) NOT NULL,
    time TIMESTAMP NOT NULL
);
