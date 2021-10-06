
DROP DATABASE IF EXISTS ratingsandreviews;

CREATE DATABASE ratingsandreviews;

\c ratingsandreviews;


CREATE TABLE reviews (
    id serial NOT NULL,
    product_id integer NOT NULL,
    rating integer NOT NULL,
    epoch bigint,
    summary varchar(300),
    body varchar(2500),
    recommend boolean,
    reported boolean,
    reviewer_name varchar(60),
    reviewer_email varchar(100),
    response varchar(2500),
    helpfulness integer NOT NULL,
    date_written timestamp null default null,
    PRIMARY KEY (id)
);

CREATE INDEX product_review_index ON reviews(product_id);
CREATE INDEX review_index ON reviews(id);
CREATE INDEX helpfulness_index ON reviews(helpfulness);
CREATE INDEX rating_index ON reviews(rating);


CREATE TABLE reviewsphotos (
    id serial NOT NULL,
    review_id integer,
    url varchar(250),
    PRIMARY KEY (id),
    FOREIGN KEY (review_id) REFERENCES reviews(id)
);

CREATE INDEX reviews_photos_index ON reviewsphotos(id);
CREATE INDEX review_id_index ON reviewsphotos(review_id);

CREATE TABLE characteristics (
    id serial NOT NULL,
    product_id integer,
    name varchar(50),
    PRIMARY KEY (id)
);
CREATE INDEX product_characteristics_index ON characteristics(product_id);


CREATE TABLE characteristicreviews (
    id serial NOT NULL,
    characteristic_id integer,
	  review_id integer,
    value int not null,
    PRIMARY KEY (id),
    FOREIGN KEY (review_id) REFERENCES reviews(id),
    FOREIGN KEY (characteristic_id) REFERENCES characteristics(id)
);
CREATE INDEX product_characteristicreviews_index ON characteristicreviews(id);

CREATE INDEX product_characteristicreviews_char_index ON characteristicreviews(characteristic_id);

CREATE INDEX product_characteristicreviews_review_index ON characteristicreviews(review_id);


\COPY reviews (id, product_id, rating, epoch, summary, body, recommend, reported, reviewer_name, reviewer_email, response, helpfulness) FROM '/Users/aliciavillanueva/Desktop/SDC/reviews.csv' DELIMITER ',' CSV HEADER;

update reviews set date_written = to_timestamp(floor(epoch/1000));

CREATE INDEX date_index ON reviews(date_written);

SELECT setval(pg_get_serial_sequence('reviews', 'id'), max(id)) FROM reviews;

ALTER TABLE reviews DROP COLUMN epoch;

\COPY characteristics ( id, product_id, name) FROM '/Users/aliciavillanueva/Desktop/SDC/characteristics.csv' DELIMITER ',' CSV HEADER;

\COPY characteristicreviews (id, characteristic_id, review_id, value) FROM '/Users/aliciavillanueva/Desktop/SDC/characteristic_reviews.csv' DELIMITER ',' CSV HEADER;

\COPY reviewsphotos (id, review_id, url) FROM '/Users/aliciavillanueva/Desktop/SDC/reviews_photos.csv' DELIMITER ',' CSV HEADER;

