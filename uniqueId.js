const express = require('express');
const path = require('path');
const mysql = require('mysql')

const app = express();

app.use(express.urlencoded({extended:false}));
app.use(express.static(path.join(__dirname, 'public')))
app.set('view engine','ejs')
app.set('views',path.join(__dirname,"views"))

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'uniqueId'
})

connection.connect( (err) => {
    if(err)  throw err
    console.log("connection success full");
})

app.get('/', (req, res) => {
    res.render('home')
})

app.get('/reward', (req, res) => {
    res.render('index')
})

app.post('/result',(req,res)=>{
    const token = req.body.token
    const selectQry = `SELECT token from uniqueId where token = ?`
    connection.query(selectQry, [token],(err,rows) =>{
    console.log(rows);
    if(rows[0]){
        res.render('winner')
    }else{
        res.render('wrong')
    }
})
})

app.listen(3000);
