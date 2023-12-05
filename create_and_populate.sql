CREATE TABLE user_types (
    user_type_id SERIAL PRIMARY KEY,
    user_type_name VARCHAR(50) NOT NULL UNIQUE
);

-- Insert data for user types
INSERT INTO user_types (user_type_name) VALUES
    ('admin'),
	('member'),
    ('trainer');

CREATE TABLE users ( -- members/trainer
	user_id SERIAL PRIMARY KEY,
	type_of_user INTEGER REFERENCES user_types(user_type_id),
	username VARCHAR(255) NOT NULL UNIQUE,
	password_key VARCHAR(255) NOT NULL,
	first_name VARCHAR(255) NOT NULL,
	last_name VARCHAR(255) NOT NULL,
	email VARCHAR(255) NOT NULL,
	phone_num VARCHAR(15) NOT NULL,
	sex VARCHAR(32) NOT NULL,
	dob DATE NOT NULL,
	home_addr VARCHAR(255) NOT NULL
);

CREATE TABLE members (
	member_id INT REFERENCES users(user_id) PRIMARY KEY
);

INSERT INTO users (type_of_user, username, password_key, first_name, last_name, email, phone_num, sex, dob, home_addr) VALUES (1, 'admin', 'admin', '', '', '', '', '', '1000-10-10', '');

INSERT INTO users (type_of_user, username, password_key, first_name, last_name, email, phone_num, sex, dob, home_addr) VALUES (2, 'damibisi', 'thisisdamispassword', 'Damilola', 'Olabisi', 'damilolabisi@example.com', '2281027401', 'female', '2000-08-31', 'Apartment 2108, 101 Champagne Ave S, Ottawa, Ontario, Canada');
