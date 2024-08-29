// ###############################################################################
// Web Technology at VU University Amsterdam
// Assignment 3
//
// The assignment description is available on Canvas.
// Please read it carefully before you proceed.
//
// This is a template for you to quickly get started with Assignment 3.
// Read through the code and try to understand it.
//
// Have you read the zyBook chapter on Node.js?
// Have you looked at the documentation of sqlite?
// https://www.sqlitetutorial.net/sqlite-nodejs/
//
// Once you are familiar with Node.js and the assignment, start implementing
// an API according to your design by adding routes.

// ###############################################################################
//
// Database setup:
// First: Our code will open a sqlite database file for you, and create one if it not exists already.
// We are going to use the variable "db' to communicate to the database:
// If you want to start with a clean sheet, delete the file 'media.db'.
// It will be automatically re-created and filled with one example item.

const sqlite = require("sqlite3").verbose();
let db = my_database("./media.db");

// ###############################################################################
// The database should be OK by now. Let's setup the Web server so we can start
// defining routes.
//
// First, create an express application `app`:

var express = require("express");
var app = express();

// We need some middleware to parse JSON data in the body of our HTTP requests:
app.use(express.json());

// This example route responds to http://localhost:3000/hello with an example JSON object.
// Please test if this works on your own device before you make any changes.
// Do not remove this endpoint as it is used for codegrade evaluation.
app.get("/hello", function (req, res) {
  response_body = { Hello: "World" };

  // This example returns valid JSON in the response, but does not yet set the
  // associated HTTP response header.  This you should do yourself in your
  // own routes!
  res.json(response_body);
});


/* 1. Retrieve the full data set */
app.get("/database", function (req, res) {
  
  // Set headers for response
  res.setHeader('Accept', 'application/json'); // Receiving json data
  res.setHeader('Content-Type', 'application/json'); // Responding json data

  /* Canvas template: Retrive all items */
  db.all("SELECT id, name, year, genre, poster, description FROM media", function(err, rows) {

    // Check if query received an error
    if (err) {
      return res.status(500).json({error : err.message});
    }

    // OK, everything is fine
    return res.status(200).json(rows);
  });
});


/* 2. Add data for a new photo item (Create) */ 
app.post("/database", function (req, res) {
  
  // Set headers for response
  res.setHeader('Accept', 'application/json'); // Receiving json data
  res.setHeader('Content-Type', 'application/json'); // Responding json data

  // Check if Content-Type is application/json
  const contentType = req.get('Content-Type');
  if (!contentType || contentType !== 'application/json') {
    return res.status(400).json({error: 'Invalid Content-Type. Expected application/json.'});
  }

  // Check if the necessary fields are present in the JSON body
  const { name, year, genre, poster, description } = req.body;
  if (!name || !year || !genre || !poster || !description) {
    return res.status(400).json({error: 'Missing required fields in the JSON body.'});
  }
  
  const item = req.body;

  /* Canvas template: Insert single item */
  db.run(`INSERT INTO media (name, year, genre, poster, description) VALUES (?, ?, ?, ?, ?)`,
          [item['name'], item['year'], item['genre'], item['poster'], item['description']], 
          function(err) {

            // Check if query received an error
            if (err) {
              return res.status(500).json({error : err.message});
            }

            // OK, everything is fine
            console.log(`Row ID: ${this.lastID} - Inserted`);
            return res.status(200).send();
          });
});


/* 3. List the data of a specific item (Retrieve) */
app.get("/database/item/:id", function (req, res) {

  // Set headers for response
  res.setHeader('Accept', 'application/json'); // Receiving json data
  res.setHeader('Content-Type', 'application/json'); // Responding json data

  const id = req.params.id;
  // Check if ID is a number
  if (isNaN(id)){
    return res.status(400).json({error : 'Invalid ID. Expected a number.'});
  }

  db.all(`select count(*) as count from media`, function (err, result) {
    // Check if ID is out of bounds
    if (result[0].count < id) {
      return res.status(400).json({error : 'Invalid ID. Out of bounds.'});
    } 
    // Preform task
    else {
      /* Canvas template: Query single item matching with the ID */
      db.all("SELECT name, year, genre, poster, description FROM media WHERE id=" + id, function(err, row) {

        // Check if query received an error
        if (err) {
          return res.status(500).json({error : err.message});
        }

        // Check if the ID has any content
        if (row.length == 0) {
          return res.status(404).json({error : 'ID and its content could not be found.'});
        }
        
        // OK, everything is fine
        console.log(`Row ID: ${id} - Retrieved`);
        return res.status(200).json(row);
      });
  }});
});


/* 4. Change data of a specific item (Update) */
app.put("/database/item/:id", function(req, res) {
  
  // Set headers for response
  res.setHeader('Accept', 'application/json'); // Receiving json data
  res.setHeader('Content-Type', 'application/json'); // Responding json data

  // Check if Content-Type is application/json
  const contentType = req.get('Content-Type');
  if (!contentType || contentType !== 'application/json') {
    return res.status(400).json({error: 'Invalid Content-Type. Expected application/json.'});
  }

  // Check if the necessary fields are present in the JSON body
  const { name, year, genre, poster, description } = req.body;
  if (!name || !year || !genre || !poster || !description) {
    return res.status(400).json({error: 'Missing required fields in the JSON body.'});
  }

  const item = req.body;

  const id = req.params.id;
  // Check if ID is a number
  if (isNaN(id)){
    return res.status(400).json({error : 'Invalid ID. Expected a number.'});
  }

  db.all(`select count(*) as count from media`, function (err, result) {
    // Check if ID is out of bounds
    if (result[0].count < id) {
      return res.status(400).json({error : 'Invalid ID. Out of bounds.'});
    } 
    // Preform task
    else {
      /* Canvas template: Update a single item matching with the ID */
      db.run(`UPDATE media SET name=?, year=?, genre=?, poster=?, description=? WHERE id=?`,
              [item['name'], item['year'], item['genre'], item['poster'], item['description'], id], 
              function(err) {

                // Check if query received an error
                if (err) {
                  return res.status(500).json({error : err.message});
                }

                // OK, everything is fine
                console.log(`Row ID: ${id} - Updated`);
                return res.status(200).send();
              });
  }});
});


/* 5. Remove data of a specific item (Delete) */
app.delete("/database/item/:id", function(req, res) {

  // Set headers for response
  res.setHeader('Accept', 'application/json'); // Receiving json data
  res.setHeader('Content-Type', 'application/json'); // Responding json data

  const id = req.params.id;
  // Check if ID is a number
  if (isNaN(id)){
    return res.status(400).json({error : 'Invalid ID. Expected a number.'});
  }

  db.all(`select count(*) as count from media`, function (err, result) {
    // Check if ID is out of bounds
    if (result[0].count < id) {
      return res.status(400).json({error : 'Invalid ID. Out of bounds.'});
    } 
    // Preform task
    else {
      /* Canvas template: Delete a single item matching with the ID */
      db.run("DELETE FROM media WHERE id=" + id, function(err) {
    
        // Check if query received an error
        if (err) {
          return res.status(500).json({error : err.message}).send();
        }
    
        // OK, everything is fine
        console.log(`Row ID: ${id} - Deleted`);
        return res.status(200).send();
      });
  }});
    
});

// ###############################################################################
// This should start the server, after the routes have been defined, at port 3000:

app.listen(3000);
console.log(
  "Your Web server should be up and running, waiting for requests to come in. Try http://localhost:3000/hello"
);

// ###############################################################################
// Some helper functions called above
function my_database(filename) {
  // Conncect to db by opening filename, create filename if it does not exist:
  var db = new sqlite.Database(filename, (err) => {
    if (err) {
      console.error(err.message);
    }
    console.log("Connected to the media database.");
  });
  // Create our media table if it does not exist already:
  db.serialize(() => {
    db.run(`
        	CREATE TABLE IF NOT EXISTS media
        	 (
                    id INTEGER PRIMARY KEY,
                    name CHAR(100) NOT NULL,
                    year CHAR(100) NOT NULL,
                    genre CHAR(256) NOT NULL,
                    poster char(2048) NOT NULL,
                    description CHAR(1024) NOT NULL
		 )
		`);
    db.all(`select count(*) as count from media`, function (err, result) {
      if (result[0].count == 0) {
        db.run(
          `INSERT INTO media (name, year, genre, poster, description) VALUES (?, ?, ?, ?, ?)`,
          [
            "Arcane",
            "2021",
            "animation, action, adventure, tv-show",
            "https://www.nerdpool.it/wp-content/uploads/2021/11/poster-arcane.jpg",
            "Set in Utopian Piltover and the oppressed underground of Zaun, the story follows the origins of two iconic League Of Legends champions and the power that will tear them apart.",
            ]
        );
        db.run(
          `INSERT INTO media (name, year, genre, poster, description) VALUES (?, ?, ?, ?, ?)`,
          [
            "Celeste",
            "2018",
            "platformer, video-game",
            "https://upload.wikimedia.org/wikipedia/commons/0/0f/Celeste_box_art_full.png",
            "Celeste is a critically acclaimed two-dimensional platform game developed by Maddy Makes Games. The player controls Madeline, a young woman who sets out to climb Celeste Mountain. The game features tight controls, challenging levels, and a touching story about overcoming personal demons.",
          ]
        );
        console.log("Inserted dummy photo entry into empty database");
      } else {
        console.log(
          "Database already contains",
          result[0].count,
          " item(s) at startup."
        );
      }
    });
  });
  return db;
}
