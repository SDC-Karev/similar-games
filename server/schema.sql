DROP DATABASE IF EXISTS similarGames;

CREATE DATABASE similarGames;

USE similarGames;

CREATE TABLE series (
  id int NOT NULL AUTO_INCREMENT unique,
  seriesName varchar(50) unique,
  PRIMARY KEY (id)
);

CREATE TABLE games (
  id int NOT NULL AUTO_INCREMENT,
  name varchar(50) NOT NULL,
  price decimal(6, 2),
  sale_percent decimal(3, 2),
  seriesID int,
  releasedt date,
  reviews int,
  average_review decimal(2, 1),
  FOREIGN KEY (seriesID) REFERENCES series(id),
  PRIMARY KEY (ID)

);





CREATE TABLE media (
  id int NOT NULL AUTO_INCREMENT,
  gameID int NOT NULL,
  imageFile varchar(255),
  PRIMARY KEY (ID)
);

CREATE TABLE tags (
  id int NOT NULL AUTO_INCREMENT,
  tagName varchar(50) unique,
  PRIMARY KEY (id)
);

CREATE TABLE gameTags (
  gameID int NOT NULL,
  tagID int NOT NULL
);



DELIMITER //

CREATE PROCEDURE populateRow(
		  IN inGameName varchar(50)
		, IN inGamePrice decimal(6, 2)
		, IN inSale decimal(3, 2)
		, IN inReleaseDate date
		, IN inReviews int
		, IN inRating decimal(2, 1)
    , IN inSeriesName varchar(50)
		, IN inTag1 varchar(50)
		, IN inTag2 varchar(50)
		, IN inTag3 varchar(50)
		, IN inTag4 varchar(50)
		, IN inTag5 varchar(50)
		, IN inImage1 varchar(255)
		, IN inImage2 varchar(255)
		, IN inImage3 varchar(255)
		, IN inImage4 varchar(255)
)
BEGIN
  DECLARE CONTINUE HANDLER FOR 1062
  BEGIN
    SELECT 'Duplicatekey';
  END;
	INSERT INTO games (name, price, sale_percent, releasedt, reviews, average_review)
	VALUES (inGameName, inGamePrice, inSale, inReleaseDate, inReviews, inRating);

	SET @last_id_game = LAST_INSERT_ID();
    INSERT INTO series (seriesName) VALUES (inSeriesName);
    SELECT id INTO  @last_id_series FROM series WHERE series.seriesName = inSeriesName;
    UPDATE games SET seriesID = @last_id_series WHERE id = @last_id_game;

    INSERT INTO tags (tagName) VALUES (inTag1);
    SELECT id INTO @last_id_tag FROM tags WHERE tags.tagName = inTag1;
    INSERT INTO gameTags (gameID, tagID) VALUES (@last_id_game, @last_id_tag);
    INSERT INTO tags (tagName) VALUES (inTag2);
    SELECT id INTO @last_id_tag FROM tags WHERE tags.tagName = inTag2;
    INSERT INTO gameTags (gameID, tagID) VALUES (@last_id_game, @last_id_tag);
    INSERT INTO tags (tagName) VALUES (inTag3);
    SELECT id INTO @last_id_tag FROM tags WHERE tags.tagName = inTag3;
    INSERT INTO gameTags (gameID, tagID) VALUES (@last_id_game, @last_id_tag);
    INSERT INTO tags (tagName) VALUES (inTag4);
    SELECT id INTO @last_id_tag FROM tags WHERE tags.tagName = inTag4;
    INSERT INTO gameTags (gameID, tagID) VALUES (@last_id_game, @last_id_tag);
    INSERT INTO tags (tagName) VALUES (inTag5);
    SELECT id INTO @last_id_tag FROM tags WHERE tags.tagName = inTag5;
    INSERT INTO gameTags (gameID, tagID) VALUES (@last_id_game, @last_id_tag);

    INSERT INTO media (gameID, imageFile) VALUES (@last_id_game, inImage1);
    INSERT INTO media (gameID, imageFile) VALUES (@last_id_game, inImage2);
    INSERT INTO media (gameID, imageFile) VALUES (@last_id_game, inImage3);
    INSERT INTO media (gameID, imageFile) VALUES (@last_id_game, inImage4);
END //

DELIMITER ;

-- mysql -u root < server/schema.sql
