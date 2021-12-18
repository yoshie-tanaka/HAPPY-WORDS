const express = require('express');
const mysql = require('mysql');
const app = express();

app.use(express.urlencoded({extended: false})); 
app.use(express.static('public'));
app.use('/selfwriting/:id', express.static('public'));
app.use('/happywriting/:id', express.static('public'));
app.use('/lifewriting/:id', express.static('public'));
app.use('/lovewriting/:id', express.static('public'));
app.use(express.static('app'));
app.use(express.static('img'));
app.use('/selfwriting/:id', express.static('img'));
app.use('/happywriting/:id', express.static('img'));
app.use('/lifewriting/:id', express.static('img'));
app.use('/lovewriting/:id', express.static('img'));


// // mysqlの接続情報
// const connection = mysql.createConnection({
//   host: '127.0.0.1',
//   user: 'root',
//   password: '&%CDQT,7F&z#',
//   database: 'words_app'
// });

//mysqlの接続情報


db_config = {
  host: 'us-cdbr-east-05.cleardb.net',
  user: 'bf490e21a7fb9b',
  password: '24a8e7ce',
  database: 'heroku_9faee0357652928'
};


function handleDisconnect() {
    console.log('INFO.CONNECTION_DB: ');
    connection = mysql.createConnection(db_config);
    
    //connection取得
    connection.connect(function(err) {
        if (err) {
            console.log('ERROR.CONNECTION_DB: ', err);
            setTimeout(handleDisconnect, 1000);
        }
    });
    
    //error('PROTOCOL_CONNECTION_LOST')時に再接続
    connection.on('error', function(err) {
        console.log('ERROR.DB: ', err);
        if (err.code === 'PROTOCOL_CONNECTION_LOST') {
            console.log('ERROR.CONNECTION_LOST: ', err);
            handleDisconnect();
        } else {
            throw err;
        }
    });
}

handleDisconnect();

// //mysqlが接続されていないときのエラー表示
// connection.connect((err) => {
//   if (err) {
//     console.log('error connecting: ' + err.stack);
//     return;
//   }
//   console.log('success');
// });

app.get('/', (req, res) => {
  connection.query(
    'SELECT * FROM self',
    (error, results) => {
      // console.log(results);
      res.render('top.ejs');
    }
  );
});

app.get('/', (req, res) => {
  res.render('top.ejs');
});

// -------------self画面-------------------
app.get('/self', (req, res) => {
  connection.query(
    'SELECT * FROM self',
    (error, results) => {
      res.render('self.ejs', { self: results });
    }
  );
});

app.get('/selfwriting/:id', (req, res) => {
  const id = req.params.id;
  connection.query(
    'SELECT * FROM self WHERE id = ?',
    [id],
    (error, results) => {
      const title = results[0].title;
      const writing = results[0].writing;
      res.render('writing.ejs',{
        title: title,
        writing: writing
       });
    }
  );
});

//---------------happy画面-----------------
app.get('/happy', (req, res) => {
  connection.query(
    'SELECT * FROM happy',
    (error, results) => {
      res.render('happy.ejs', { happy: results });
    }
  );
});

app.get('/happywriting/:id', (req, res) => {
  const id = req.params.id;
  connection.query(
    'SELECT * FROM happy WHERE id = ?',
    [id],
    (error, results) => {
      const title = results[0].title;
      const writing = results[0].writing;
      res.render('writing.ejs',{
        title: title,
        writing: writing
       });
    }
  );
});

//-------------life画面-------------------
app.get('/life', (req, res) => {
  connection.query(
    'SELECT * FROM life',
    (error, results) => {
      res.render('life.ejs', { life: results });
    }
  );
});

app.get('/lifewriting/:id', (req, res) => {
  const id = req.params.id;
  connection.query(
    'SELECT * FROM life WHERE id = ?',
    [id],
    (error, results) => {
      const title = results[0].title;
      const writing = results[0].writing;
      res.render('writing.ejs',{
        title: title,
        writing: writing
       });
    }
  );
});

//-------------love画面-------------------
app.get('/love', (req, res) => {
  connection.query(
    'SELECT * FROM love',
    (error, results) => {
      res.render('love.ejs', { love: results });

    }
  );
});


//-------------lovewriting画面-------------------


app.get('/lovewriting/:id', (req, res) => {
  const id = req.params.id;
  connection.query(
    'SELECT * FROM love WHERE id = ?',
    [id],
    (error, results) => {
      const title = results[0].title;
      const writing = results[0].writing;
      res.render('writing.ejs',{
        title: title,
        writing: writing
       });
    }
  );
});


// --------------db-----------------------

app.get('/dblove', (req, res) => {
 
  connection.query('select * from love', function (err, results, fields) {
      if (err) throw err
      res.render('db.ejs', { content: results })
  });

})

app.get('/dblife', (req, res) => {
 
  connection.query('select * from life', function (err, results, fields) {
      if (err) throw err
      res.render('db.ejs', { content: results })
  });

})

app.get('/dbself', (req, res) => {
 
  connection.query('select * from self', function (err, results, fields) {
      if (err) throw err
      res.render('db.ejs', { content: results })
  });

})

app.get('/dbhappy', (req, res) => {
 
  connection.query('select * from happy', function (err, results, fields) {
      if (err) throw err
      res.render('db.ejs', { content: results })
  });

})


// ---------------追加用

app.get('/new', (req, res) => {
  res.render('new.ejs');
});

app.post('/lifecreate', (req, res) => {
  connection.query(
    'INSERT INTO life(title, writing) VALUES(?, ?)',
    [req.body.title, req.body.writing],
    (error, results) => {
      res.redirect('/new');
    }
  );
});

app.post('/happycreate', (req, res) => {
  connection.query(
    'INSERT INTO happy(title, writing) VALUES(?, ?)',
    [req.body.title, req.body.writing],
    (error, results) => {
      res.redirect('/new');
    }
  );
});

app.post('/selfcreate', (req, res) => {
  connection.query(
    'INSERT INTO self(title, writing) VALUES(?, ?)',
    [req.body.title, req.body.writing],
    (error, results) => {
      res.redirect('/new');
    }
  );
});

app.post('/lovecreate', (req, res) => {
  connection.query(
    'INSERT INTO love(title, writing) VALUES(?, ?)',
    [req.body.title, req.body.writing],
    (error, results) => {
      res.redirect('/new');
    }
  );
});



let port = process.env.PORT;
if (port == null || port == "") {
  port = 8000;
}
app.listen(port);