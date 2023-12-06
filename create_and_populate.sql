CREATE TABLE user_types (
    user_type_id SERIAL PRIMARY KEY,
    user_type_name VARCHAR(50) NOT NULL UNIQUE
);

INSERT INTO user_types (user_type_name) VALUES
    ('admin'),
	('member'),
    ('trainer');

CREATE TABLE users (
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
	member_id SERIAL PRIMARY KEY,
	loyalty_points INT DEFAULT 0
);

CREATE TABLE trainers (
	trainer_id SERIAL PRIMARY KEY
);

CREATE TABLE achievements (
	achievement_id SERIAL PRIMARY KEY,
	member_id INT,
	FOREIGN KEY (member_id) REFERENCES members(member_id),
	date_received DATE DEFAULT CURRENT_DATE NOT NULL,
	achievement_description VARCHAR(255) NOT NULL
);

CREATE TABLE metrics (
	metric_id SERIAL PRIMARY KEY,
	member_id INT,
	FOREIGN KEY (member_id) REFERENCES members(member_id),
	new_date DATE DEFAULT CURRENT_DATE,
	new_weight DECIMAL(5,2) NOT NULL,
	height DECIMAL(5,2),
	bmi DECIMAL(5, 2) GENERATED ALWAYS AS (new_weight / POW(height / 100, 2)) STORED
);

CREATE TABLE routines (
	routine_id SERIAL PRIMARY KEY,
	member_id INT,
	FOREIGN KEY (member_id) REFERENCES members(member_id),
	date_created DATE DEFAULT CURRENT_DATE NOT NULL,
	routine_description VARCHAR(255) NOT NULL,
	duration INT NOT NULL
);

CREATE TABLE goal_status_types (
    status_type_id SERIAL PRIMARY KEY,
    status_type_name VARCHAR(50) NOT NULL UNIQUE
);

INSERT INTO goal_status_types (status_type_name) VALUES
    ('ongoing'),
    ('expired'),
    ('achieved');

CREATE TABLE goals (
	goal_id SERIAL PRIMARY KEY,
	member_id INT,
	FOREIGN KEY (member_id) REFERENCES members(member_id),
	date_start DATE DEFAULT CURRENT_DATE NOT NULL,
	goal_description VARCHAR(255) NOT NULL,
	goal_status INTEGER REFERENCES goal_status_types(status_type_id)
);

CREATE TABLE transactions (
	transaction_id SERIAL PRIMARY KEY,
	member_id INT,
	FOREIGN KEY (member_id) REFERENCES members(member_id),
	date_made DATE DEFAULT CURRENT_DATE NOT NULL,
	amount DECIMAL(5,2) NOT NULL,
	transaction_description VARCHAR(255) NOT NULL
);

CREATE TABLE certification_types (
    certification_id SERIAL PRIMARY KEY,
    certification_name VARCHAR(50) NOT NULL UNIQUE,
	trainer_id INT
	FOREIGN KEY (trainer_id) REFERENCES trainers(trainer_id)
);

INSERT INTO certification_types (certification_name) VALUES
    ('ongoing'),
    ('expired'),
    ('achieved');

CREATE TABLE training (
	member_id INT,
	trainer_id INT UNIQUE,
	FOREIGN KEY (member_id) REFERENCES members(member_id),
	FOREIGN KEY (trainer_id) REFERENCES trainers(trainer_id),
	train_date DATE,
	start_time TIME,
	end_time TIME,
	room_id INT
);

CREATE TABLE rooms (
	room_id SERIAL PRIMARY KEY,
	max_people INT
);

CREATE TABLE equipment (
	equipment_id SERIAL PRIMARY KEY,
	room_id INT
	FOREIGN KEY (room_id) REFERENCES rooms(room_id),
	last_serviced DATE,
	equip_status VARCHAR(255) NOT NULL
);

INSERT INTO users (type_of_user, username, password_key, first_name, last_name, email, phone_num, sex, dob, home_addr) VALUES (1, 'admin', 'admin', '', '', '', '', '', '1000-10-10', '');

INSERT INTO users (type_of_user, username, password_key, first_name, last_name, email, phone_num, sex, dob, home_addr) VALUES (2, 'damibisi', 'thisisdamispassword', 'Damilola', 'Olabisi', 'damilolabisi@example.com', '2281027401', 'female', '2000-08-31', 'Apartment 2108, 101 Champagne Ave S, Ottawa, Ontario, Canada');