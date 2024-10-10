 import mysql from 'mysql2';
import cors from 'cors';
import bodyParser from 'body-parser';


// Configurar conexión a la base de datos
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'test',
  database: 'trackingchain'
});

connection.connect(err => {
  if (err) {
    console.error('Error connecting to the database:', err);
    return;
  }
  
  console.log('Connected to the database');
});



export default connection;