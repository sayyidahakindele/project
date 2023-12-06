const pug = require("pug");
const express = require('express');
const session = require('express-session');
const pgSession = require('connect-pg-simple')(session);
const { Client } = require('pg');
const app = express();

// PostgreSQL connection
const db = new Client({
		connectionString: 'postgres://postgres:password@localhost:5432/project_1',
});

db.connect()
		.then(() => console.log('Connected to PostgreSQL database'))
		.catch(error => console.error('Error connecting to the database:', error));

// Configure session middleware
const sessionMiddleware = session({
	store: new pgSession({
		pool: db,
		tableName: 'sessions', 
		schemaName: 'public',
		createTableIfMissing: true,
		ttl: 86400, 
		pruneSessionInterval: 86400,
		errorIfSessionNotFound: false,
		loggedin: false,
		// Add other configuration options as needed
}),
		secret: 'secret', 
		resave: false,
		saveUninitialized: true,
		cookie: { maxAge: 1000*60*60 },
});

app.use(sessionMiddleware);
app.set("view engine", "pug");
app.use(exposeSession);
app.use(express.static("public"));
app.use(express.json()); 

function exposeSession(req, res, next) {
    if (req.session) {
        res.locals.session = req.session;;
    }
    next();
}

app.get(["/", "/home"], (req, res) => {
	console.log(req.method + " " + req.url);
	res.statusCode = 200;
	res.setHeader("Content-Type","text/html");
	res.render("pages/home");
});

app.get("/login", (req, res)=> { 
		console.log(req.method + " " + req.url);
	res.statusCode = 200;
	res.setHeader("Content-Type","text/html");
	res.render("pages/whoareyou");
});

app.get("/memberlogin", (req, res)=> { 
		console.log(req.method + " " + req.url);
	res.statusCode = 200;
	res.setHeader("Content-Type","text/html");
	res.render("pages/memberlogin");
});

app.post("/memberlogin", async (req, res)=> { 
	console.log(req.method + " " + req.url);

	if (req.session.loggedin) {
		res.status(400);
		console.log("already logged in")
		res.send("already logged in")
		return;
	}

	if (req.body.username === '') {
		res.status(400);
		res.send("no username");
	} else if (!req.body.password || req.body.password === '') {
		res.status(400);
		res.send("no password");
	} else {
		const { username, password } = req.body;
        const result1 = await db.query('SELECT * FROM users WHERE username = $1', [
			username,
        ]);
		if (result1.rows.length > 0) {
			const result2 = await db.query('SELECT * FROM users WHERE username = $1 AND password_key = $2', [
				username,
				password,
			]);
			if (result2.rows.length > 0) {
				const user = result2.rows[0];
				req.session.user_id = user.user_id;
				req.session.loggedin = true;
				req.session.type = 2;
				req.session.username = username;
				res.send();
			} else {
				res.status(400);
				res.send("not right password");
			}
		} else {
			res.status(400);
			res.send("username doesn't exist");
		}
	}
});

app.get("/trainerlogin", (req, res)=> { 
    console.log(req.method + " " + req.url);
	res.statusCode = 200;
	res.setHeader("Content-Type","text/html");
	res.render("pages/trainerlogin");
});

app.post("/trainerlogin", async (req, res)=> { 
	console.log(req.method + " " + req.url);

	if (req.session.loggedin) {
		res.status(400);
		console.log("already logged in")
		res.send("already logged in")
		return;
	}

	if (req.body.username === '') {
		res.status(400);
		res.send("no username");
	} else if (!req.body.password || req.body.password === '') {
		res.status(400);
		res.send("no password");
	} else {
		const { username, password } = req.body;
        const result1 = await db.query('SELECT * FROM users WHERE username = $1', [
			username,
        ]);
		if (result1.rows.length > 0) {
			const result2 = await db.query('SELECT * FROM users WHERE username = $1 AND password_key = $2', [
				username,
				password,
			]);
			if (result2.rows.length > 0) {
				const user = result2.rows[0];
				req.session.user_id = user.user_id;
				req.session.loggedin = true;
				req.session.type = 3;
				req.session.username = username;
				const result3 = await db.query('SELECT trainer_id FROM trainers WHERE user_id = $1', [
					user.user_id,
				]);
				res.send(result3);
			} else {
				res.status(400);
				res.send("not right password");
			}
		} else {
			res.status(400);
			res.send("username doesn't exist");
		}
	}
});

app.get("/adminlogin", (req, res)=> { 
    console.log(req.method + " " + req.url);
	res.statusCode = 200;
	res.setHeader("Content-Type","text/html");
	res.render("pages/adminlogin");
});

app.post("/adminlogin", async (req, res)=> { 
	console.log(req.method + " " + req.url);

	if (req.session.loggedin) {
		res.status(400);
		console.log("already logged in")
		res.send("already logged in")
		return;
	}

	if (req.body.username === '') {
		res.status(400);
		res.send("no username");
	} else if (!req.body.password || req.body.password === '') {
		res.status(400);
		res.send("no password");
	} else {
		const { username, password } = req.body;
        const result1 = await db.query('SELECT * FROM users WHERE username = $1', [
			username,
        ]);
		if (result1.rows.length > 0) {
			const result2 = await db.query('SELECT * FROM users WHERE username = $1 AND password_key = $2', [
				username,
				password,
			]);
			if (result2.rows.length > 0) {
				const user = result2.rows[0];
				req.session.user_id = user.user_id;
				req.session.loggedin = true;
				req.session.type = 1;
				req.session.username = username;
				res.send();
			} else {
				res.status(400);
				res.send("not right password");
			}
		} else {
			res.status(400);
			res.send("username doesn't exist");
		}
	}
});

app.get("/memberregister", (req, res)=> { 
    console.log(req.method + " " + req.url);
	res.statusCode = 200;
	res.setHeader("Content-Type","text/html");
	res.render("pages/memberregister");
});

app.post("/memberregister", async (req, res) => {
    console.log(req.method + " " + req.url);
    if (req.session.loggedin) {
        res.status(400);
        res.send("already logged in")
        return;
    }
    if (req.body.username == "") {
        res.status(400);
        res.send("no username");
    } else if (req.body.password == "") {
        res.status(400);
        res.send("no password");
    } else if (req.body.first_name == "") {
        res.status(400);
        res.send("no first");
    } else if (req.body.last_name == "") {
        res.status(400);
        res.send("no last");
    } else if (req.body.email == "") {
        res.status(400);
        res.send("no email");
    } else if (req.body.phone_num == "") {
        res.status(400);
        res.send("no phone");
    } else if (req.body.sex == "") {
        res.status(400);
        res.send("no sex");
    } else if (req.body.dob == "") {
        res.status(400);
        res.send("no dob");
    } else if (req.body.home_addr == "") {
        res.status(400);
        res.send("no address");
		return;
    } else {
        const { username, password, first_name, last_name, email, phone_num, sex, dob, home_addr } = req.body;
        const result1 = await db.query('SELECT * FROM users WHERE username = $1', [
			username,
        ]);
		if (result1.rows.length > 0) {
			res.status(400);
            res.send("already");
		} else {
			const result = await db.query('INSERT INTO users (type_of_user, username, password_key, first_name, last_name, email, phone_num, sex, dob, home_addr) VALUES (2, $1, $2, $3, $4, $5, $6, $7, $8, $9)', [
				username,
				password,
				first_name,
				last_name,
				email,
				phone_num,
				sex,
				dob,
				home_addr,
			]);
			const new_id = await db.query('SELECT user_id from users WHERE username = $1', [
				username,
			]);
			req.session.user_id = new_id;
			req.session.loggedin = true;
			req.session.type = 2;
			req.session.username = username;
			res.status(200);
			res.send(new_id);
		}
    }
});

app.get("/adminprofile", (req, res)=> {
	console.log(req.method + " " + req.url);
	res.statusCode = 200;
	res.setHeader("Content-Type","text/html");
	res.render("pages/adminprofile");
});

app.get('/total', async (req, res) => {
		try {
			// Use the helper function to connect to the database
			const client = await connectDatabase();
	
			// Execute a SELECT query
			const result = await client.query('SELECT * FROM user_types');
	
			// Send the data to the web page
			res.send(`<pre>${JSON.stringify(result.rows, null, 2)}</pre>`);
		} catch (error) {
			// Handle errors
			console.error('Error:', error);
			res.status(500).send('Internal Server Error');
		}
});

app.get('/sessions', async (req, res) => {
    try {
        const result = await db.query('SELECT * FROM session');
        res.json(result.rows);
    } catch (error) {
        console.error('Error fetching sessions:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

//GET request that renders logout page
app.get("/logout", (req, res) => {
    console.log(req.method + " " + req.url);
    if (req.session.loggedin) {
        res.status(200);
        res.setHeader("Content-Type","text/html");
        res.render("pages/logout");
    } else {
        res.status(403);
        res.send();
    }
});

//POST request that signs out user if they are logged in
app.post("/logout", (req, res) => {
    console.log(req.method + " " + req.url);
    if (req.session.loggedin) {
        req.session.loggedin = false;
        req.session.destroy();
        res.locals.session = req.session;
        res.status(200);
        res.send();
    } else {
        res.status(400);
        res.send("already logged out")
        return;
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
	console.log(`Server is running on http://localhost:${PORT}`);
});


