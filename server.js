const express = require('express');
var bodyparser = require('body-parser');
var sql = require("mssql");
var db = require('./config/db.js');

const app = express();
app.use(express.static(__dirname + '/public'));
app.use(bodyparser.json());
const port = 3000;

app.get('/employeeslist', (req, res) => {
    sql.connect(db, function (err) {
        if (err)
            console.log(err);

        var request = new sql.Request();

        request.query('select * from tblEmployees', function (err, result) {

            if (err) {
                console.log(err)
                res.send(err);
            }
            // var rowsCount = result.rowsAffected;
            sql.close();
            res.send(result.recordsets);

        }); // request.query
    }); // sql.conn
})

app.post('/employeeslist', (req, res) => {
    sql.connect(db, function (err) {
        if (err)
            console.log(err);

        var request = new sql.Request();
        request.input('Name', sql.NVarChar(50), req.body.Name)
            .input('Email', sql.NVarChar(50), req.body.Email)
            .input('Phone_No', sql.NVarChar(50), req.body.Phone_No)
            .query("insert into tblEmployees values (@Name,@Email,@Phone_No)", function (err, result) {

                if (err) {
                    console.log(err);
                    res.send(err);
                }
                sql.close();
                res.json(result.rowsAffected);
            });
    });

})

app.delete('/employeeslist/:id', (req, res) => {
    var id = req.params.id;
    sql.connect(db, function (err) {
        if (err)
            console.log(err);

        var request = new sql.Request();
        request.input('Employee_ID', sql.VarChar(20), req.params.id)
            .query('delete from tblEmployees where Employee_ID=@Employee_ID', function (err, result) {

                if (err) {
                    console.log(err);
                    res.send(err);
                }
                sql.close();
                res.json(result.rowsAffected);
            });
    });
})

app.get('/employeeslist/:id', (req, res) => {
    sql.connect(db, function (err) {
        if (err)
            console.log(err);

        var request = new sql.Request();

        request.input('Employee_ID', sql.VarChar(20), req.params.id)
        .query('select * from tblEmployees where Employee_ID=@Employee_ID', function (err, result) {

            if (err) {
                console.log(err)
                res.send(err);
            }
            // var rowsCount = result.rowsAffected;
            sql.close();
            res.send(result.recordsets);

        }); // request.query
    }); // sql.conn
})

app.put('/employeeslist/:id', (req, res) => {
    sql.connect(db, function (err) {
        if (err)
          console.log(err);
    
        var request = new sql.Request();
        request.input('Employee_ID', sql.VarChar(20), req.params.id)
        .input('Name', sql.NVarChar(50), req.body.Name)
        .input('Email', sql.NVarChar(50), req.body.Email)
        .input('Phone_No', sql.NVarChar(50), req.body.Phone_No)
          .query('update tblEmployees set Name=@Name,Email=@Email,Phone_No=@Phone_No where Employee_ID=@Employee_ID', function (err, result) {
    
            if (err) {
              console.log(err);
              res.send(err);
            }
            sql.close();
            res.json(result.rowsAffected);
          });
      });
})

app.listen(port, () => {
    console.log('Server is up on port ' + port);
});