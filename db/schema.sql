
DROP DATABASE IF EXISTS ratingsandreviews;

CREATE DATABASE ratingsandreviews;

\c ratingsandreviews;

CREATE TABLE reviews (
    id serial NOT NULL,
    product_id integer,
    rating integer,
    date varchar(50),
    summary varchar(300),
    body varchar(2500),
    recommend boolean,
    reported boolean,
    reviewer_name varchar(60),
    reviewer_email varchar(100),
    response varchar(2500),
    helpfulness integer,
    PRIMARY KEY (id)
);

CREATE TABLE reviewsphotos (
    id serial NOT NULL,
    review_id integer,
    url varchar(250),
    PRIMARY KEY (id),
    FOREIGN KEY (review_id) REFERENCES reviews(id)
);

CREATE TABLE characteristics (
    id serial NOT NULL,
    product_id integer,
    name varchar(50),
    PRIMARY KEY (id)
);


CREATE TABLE characteristicreviews (
    id serial NOT NULL,
    characteristic_id integer,
	  review_id integer,
    value varchar(25),
    PRIMARY KEY (id),
    FOREIGN KEY (review_id) REFERENCES reviews(id),
    FOREIGN KEY (characteristic_id) REFERENCES characteristics(id)
);

\COPY reviews (id, product_id, rating, date, summary, body, recommend, reported, reviewer_name, reviewer_email, response, helpfulness) FROM '/Users/aliciavillanueva/Desktop/SDC/reviews.csv' DELIMITER ',' CSV HEADER;

\COPY characteristics ( id, product_id, name) FROM '/Users/aliciavillanueva/Desktop/SDC/characteristics.csv' DELIMITER ',' CSV HEADER;

\COPY characteristicreviews (id, characteristic_id, review_id, value) FROM '/Users/aliciavillanueva/Desktop/SDC/characteristic_reviews.csv' DELIMITER ',' CSV HEADER;

\COPY reviewsphotos (id, review_id, url) FROM '/Users/aliciavillanueva/Desktop/SDC/reviews_photos.csv' DELIMITER ',' CSV HEADER;

