const mysql = require('mysql'); // INSTALL mysql in cmd npm install mysql
const dotenv = require('dotenv'); // install dotenv
const cors = require("cors"); // install cors
const path = require('path'); // install path
var http = require('http'); // install http

dotenv.config(); 
const db=mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE
})



db.connect((err)=>{
    if(err){
        throw err;
    }
    console.log('Database connected');
})

//create a server object:
const server = http.createServer(function (req, res) {
     //write a response
     
     if(req.url === '/getUsers' && req.method == 'GET'){
        let sql = 'SELECT * FROM users';
        let query = db.query(sql, (err, result)=>{
            //console.log(result[1].UserID);
            res.writeHead(200, { 'Content-Type': 'application/json' })
            res.end(JSON.stringify(result))
        })
     }
    if(req.url === '/register' && req.method == 'POST'){
    req.on('data', data=>{
        const jsondata = JSON.parse(data);
        const user = jsondata.username;
        const pass = jsondata.password;
        const FirstName = jsondata.firstname;
        const age = jsondata.age;
        const lastname = jsondata.lastname_;
        console.log(user);
        const query = `SELECT * FROM users where UserName = '${user}';`;
        db.query(query, (err,result)=>{
            
            console.log(result.length);
            if(result.length > 0){
                console.log('Username already taken please try again');
                res.write("Username already taken please try again");
                res.end("Username already taken please try again");
            }
            if(result.length === 0){
            const query_ = "INSERT INTO users (UserName, password, FirstName, Age, LastName) VALUES (?,?,?,?,?);";
            db.query(query_, [user,pass, FirstName, age, lastname],(err,result)=>{
            if(err) reject(new Error(err.message));
            res.end("Successfully register!");
        })

            }
            if(err) reject(new Error(err.message));
        })


    })
    
    
     }
     if(req.url === '/Login' && req.method == 'POST'){
        req.on('data', data=>{
            const jsondata = JSON.parse(data);

            const user = jsondata.username;
            const pass = jsondata.password;
            const query = `SELECT * FROM users where UserName ='${user}' and password = '${pass}';`;
            db.query(query, (err, result)=>{
              console.log(result.length);
              if(result.length === 1){
                const query_= `SELECT ArtistName FROM artists,users where UserName = '${user}' and UserID = ArtistID;`;
                db.query(query_, (err, result)=>{
                  if(result.length === 1){
                    res.writeHead(200, { 'Content-Type': 'application/json' })
                    res.end(JSON.stringify(true))
                  }
                  else if(result.length === 0){
                    res.writeHead(200, { 'Content-Type': 'application/json' })
                    res.end(JSON.stringify(true))

                  }
                })
          
              }
              else if(result.length === 0){
                res.writeHead(200, { 'Content-Type': 'application/json' })
                res.end(JSON.stringify(false))

              }
          
              if(err) reject(new Error(err.message));
          
            })
        })
     }
     if(req.url === '/promote' && req.method == 'PUT'){
        req.on('data', data=>{
          const jsondata = JSON.parse(data);
          const user = jsondata.username;
          const query = `UPDATE users SET isAdmin = 1 WHERE UserName = '${user}';`;
          db.query(query, (err,result)=>{
            res.end("Promoted");
            if(err) reject(new Error(err.message));
          })

        })
     }
     if(req.url === '/demote' && req.method == 'PUT'){
      req.on('data', data=>{
        const jsondata = JSON.parse(data);
        const user = jsondata.username;
        const query = `UPDATE users SET isAdmin = 0 WHERE UserName = '${user}';`;
        db.query(query, (err,result)=>{
          res.end("Demoted");
          if(err) reject(new Error(err.message));
        })

      })
   }


     if(req.url === '/deleteUser' && req.method == 'DELETE'){
      req.on('data', data=>{
        const jsondata = JSON.parse(data);
        const user = jsondata.username;
        const query = `DELETE FROM users where UserName = '${user}';`
        db.query(query, (err, result)=>{
          res.end(`USER '${user} DELETED'`);
        })
      })
   }
   if(req.url === '/createPlaylist' && req.method == 'POST'){
    req.on('data', data=>{
    })
 }

     
     
   
  })

  server.listen(1000);
