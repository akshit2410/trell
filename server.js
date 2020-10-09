const express = require('express');
const mysql = require('mysql');
const app = express();
const bodyParser= require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine','ejs');
app.use(express.static('public'));
const port = process.env.PORT;

const bcrypt = require('bcrypt')

const connection = mysql.createConnection({
  host:'localhost',
  user:'root',
  password:'',
  database:'trell',
});
app.use(function(req, res, next) {
    if (!req.user) {
        res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
        res.header('Expires', '0');
        res.header('Pragma', 'no-cache');
    }
    next();
});
connection.connect((err)=>{
  if(!!err){
    console.log(err);
  }else{
    console.log("connected");
  }
})
//index
app.get('/',(req,res)=>{
connection.query('SELECT * FROM user',(err,result)=>{
  console.log(result);
  if(result.length===0){
    res.render('register');
  }else {
    res.render('login');
  }
})
});
app.get('/homepage',(req,res)=>{
  res.render('homepage');
})
app.get('/login',(req,res)=>{
  res.render('login');
})
//if register is requested
app.get('/register',(req,res)=>{
  res.render('register');
})

app.get('/addmovie',(req,res)=>{
  res.render('addmovie');
})

app.get('/addtiming',(req,res)=>{
  res.render('addtiming');
})

app.get('/buytickets',(req,res)=>{
  res.render('buytickets');
})
app.get('/login1',(req,res)=>{
  res.render('login1');
})

//register
app.post('/login',(req,res)=>{
  const email = req.body.email;
  const password = req.body.password;
  const saltRounds =10;
  const encyptedpassword = bcrypt.hash(password, saltRounds)
  const post = {email:req.body.email,password:encyptedpassword}
  connection.query('SELECT * FROM user where email=?',[email],(err,result)=>{
    if(result.length===0){
      connection.query('INSERT INTO user SET ?',post,(err,result)=>{
        if(!!err){
          console.log("cant insert :(")
        }else {
          res.render('login')
          console.log("inserted");
        }
      })
    }else {
      res.render('userexist');
    }
  })
  })
//login

app.post('/homepage',(req,res)=>{

  const email = req.body.email;
  const password = req.body.password;

  connection.query('SELECT * FROM user where email=?',[email],(err,result,fields)=>{
    if(!!err){
      res.send({
        "code":400,
        "failed":"error ocurred"
      })
    }else {
    if(result.length>0){
       const comparision = bcrypt.compare(password, result[0].password)
       if(comparision){
           res.render('homepage');
       } else{
          res.send({
               "code":204,
               "success":"Email and password does not match"
          })
        }
    }else{
      res.send({
          "code":206,
          "success":"Email does not exits"
            });
    }
  }
  })
});

/////

app.post('/addmovie',(req,res)=>{
  console.log(req.body);
  const mname=req.body.mname;
  const post = {mname:req.body.mname,
    mdesc:req.body.mdesc,
    mdirection : req.body.mdirection,
    duration:req.body.duration}
  // connection.query('SELECT * FROM movie WHERE  ')
connection.query('INSERT INTO movie SET ?',post,(err,result)=>{
  if(!!err){
    console.log("error in insertion in movies");
  }else{
    res.render('done')
    console.log("inserted into movie");
  }
})
})

////


app.post('/addtiming',(req,res)=>{
  const data = {
    mname : req.body.mname,
    start_time:req.body.start_time,
    end_time : req.body.end_time,
    ticket_price:req.body.ticket_price,
    total_ticket:req.body.total_ticket,
  }
connection.query('INSERT INTO timing SET ?',data,(err,result)=>{
  if(!!err){
    console.log("error in insertion in movies");
  }else{
    res.render('done')
    console.log("inserted into timing");
  }
})
})
/////
app.post('/buytickets',(req,res)=>{
  const data = {
    mname : req.body.mname,
    time:req.body.time,
    no_tickets : req.body.no_tickets,
  }
  const mname=req.body.mname;
  const no_tickets=req.body.no_tickets;

  connection.query('SELECT total_ticket FROM timing where mname=?',[mname],(err,row,fields)=>{
    if (no_tickets>row[0].total_ticket){
      res.send({"status":404,"message":"sold out"})
    }else {

      connection.query('INSERT INTO ticket SET ?',data,(err,result)=>{
        if(!!err){
          console.log("error in insertion in tickets");
        }else{
          connection.query('SELECT total_ticket FROM timing where mname=?',[mname],(err,row,fields)=>{
            const newticket = row[0].total_ticket-no_tickets;
            console.log(newticket);
            connection.query('UPDATE timing SET total_ticket=? WHERE mname=?',[newticket,mname],(err,result)=>{
              if(!!err){
                console.log("error");
              }else{
                console.log("accept");
              }
            })
          })

          res.render('done')
          console.log("inserted into movie");
        }
      })

    }

  })



})



app.listen(3000,(err)=>{
  if(!!err){
    console.log(err);
  }
  else{
    console.log("hey ,i am listening");
  }
})
