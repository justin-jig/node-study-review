const express = require('express');
const app = express();
const PORT = 8000;
const indexRouter = require('./router/index.route');


app.set('view engine', 'ejs');
app.use(express.urlencoded({extended:true}));
app.use(express.json());

app.use('/', indexRouter)

app.use('*', (req,res) => {
    res.render('404');
})

app.listen(PORT,() => {
    console.log(`localhost:${PORT}`);
})