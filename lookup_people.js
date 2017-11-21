const pg = require("pg");
const settings = require("./settings"); // settings.json

const args = process.argv.slice(2);

const client = new pg.Client({
  user     : settings.user,
  password : settings.password,
  database : settings.database,
  host     : settings.hostname,
  port     : settings.port,
  ssl      : settings.ssl
});


function getFirstNameOfFamousAthletes (name, cb) {
  client.query("SELECT * FROM famous_athletes WHERE first_name = $1", [name], cb);
};

function getLastNameOfFamousAthletes (name, cb) {
  client.query("SELECT * FROM famous_athletes WHERE last_name = $1", [name], cb);
};

client.connect((err) => {
  if (err) {
    console.error("Connection Error", err);
    return;
  }
  getFirstNameOfFamousAthletes(args[0], (err, result) => {
    if (err) {
      console.error("error running query", err);
      return
    }
    console.log(result.rows); //output: 1
    // client.end();
  });

// client.connect((err) => {
  if (err) {
    console.error("Connection Error", err);
    return;
  }
  getLastNameOfFamousAthletes(args[0], (err, result) => {
    if (err) {
      console.error("error running query", err);
      return
    }
    console.log(result.rows); //output: 1
    client.end();
  });
});

