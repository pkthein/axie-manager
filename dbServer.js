const express = require('express')
const app = require('express')()

const mariadb = require('mariadb');

const port = 6000

app.use(express.urlencoded({ extended: false }))
app.use(express.json())

app.use((req, res, next) => {
  const apiUrl = req.originalUrl
  const httpMethod = req.method

  console.log(httpMethod, apiUrl)

  next()
})

/*
  put the mariadb cred
*/
const pool = mariadb.createPool({
    host: 'localhost', 
    user:'root', 
    password: '',
    connectionLimit: 5
});

app.get('/api/db/test', async (req, res, next) => {
  try {
    const data = await pool.getConnection().then(conn => {
    
      /*
        example of query below
      */
      // conn.query("SELECT 1 as val")
      //   .then((rows) => {
      //     console.log(rows); //[ {val: 1}, meta: ... ]
      //     //Table must have been created before 
      //     // " CREATE TABLE myTable (id int, val varchar(255)) "
      //     return conn.query("INSERT INTO myTable value (?, ?)", [1, "mariadb"]);
      //   })
      //   .then((res) => {
      //     console.log(res); // { affectedRows: 1, insertId: 1, warningStatus: 0 }
      //     conn.end();
      //   })
      //   .catch(err => {
      //     //handle error
      //     console.log(err); 
      //     conn.end();
      //   })
      return conn.query("SELECT * from User;").then((rows) => {
        console.log(rows)
        conn.end()
        return rows
      }).catch(err => {
        //handle error
        console.log(err); 
        conn.end();
      })
    }).catch(err => {
      // not connected
    });

    res.data = { data }
    handle200Response(req, res);
  } catch (error) {
    console.log("ERRORED /api/notes/all", error);
    return res.status(400).send({
      ok: false,
      error: {
        reason: "Bad Request", code: 400
      }
    });
  }
});

// block the rest of the endpoints
app.all('*', (req, res, next) => {
  if (!req.session || !req.sessionId) {
    return res.status(404).send({
      ok: false,
      error: {
        reason: "Not Found",
        code: 404
      }
    });
  }
});

const handle200Response = (req, res) => {
  res.status(res.statusCode || 200).send({ ok: true, response: res.data });
}

app.listen(port, () => console.log(`DB server listening on port ${port}!`))
