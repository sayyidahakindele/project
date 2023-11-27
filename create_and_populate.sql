CREATE TABLE user_types (
    user_type_id SERIAL PRIMARY KEY,
    user_type_name VARCHAR(50) NOT NULL UNIQUE
);

-- Insert data for user types
INSERT INTO user_types (user_type_name) VALUES
    ('admin'),
	('member'),
    ('trainer');

CREATE TABLE users ( -- members/table
	user_id SERIAL PRIMARY KEY,
	type_of_user INTEGER REFERENCES user_types(user_type_id),
	username VARCHAR(255) NOT NULL,
	password_key VARCHAR(255) NOT NULL,
	first_name VARCHAR(255) NOT NULL,
	last_name VARCHAR(255) NOT NULL,
	email VARCHAR(255) NOT NULL,
	phone_num VARCHAR(15) NOT NULL,
	sex VARCHAR(32) NOT NULL,
	dob DATE NOT NULL,
	address VARCHAR(255) NOT NULL
);

INSERT INTO users (type_of_user, username, password_key) VALUES (1, 'admin', 'admin');

CREATE TABLE administration (
	admin_id SERIAL PRIMARY KEY,
    user_id INTEGER UNIQUE REFERENCES users(user_id)
);

CREATE TABLE members ( --id=user_id
	-- billing/payments

);

CREATE TABLE trainers (--id=user_id
	
);

INSERT INTO users (type_of_user, username, password_key) VALUES (1, 'admin', 'admin');
