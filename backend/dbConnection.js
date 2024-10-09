import express from 'express';  
import mysql from 'mysql2';
import cors from 'cors';
import bodyParser from 'body-parser';


const app = express();
const port = 3001;

// Configurar el middleware para parsear el cuerpo de las solicitudes
app.use(bodyParser.json());
app.use(cors());

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

// Loguin
app.post('/login', (req, res) => {
  const {role, email, password,  } = req.body;

  if (!role || !password || !email) {
    console.log(role, email, password);
    return res.status(400).json({ error: 'Email, password, and role are required' });
  }

  const query = `SELECT * FROM ${role} WHERE email = ? AND password = ?`;
  connection.query(query, [email, password], (error, results) => {
    if (error) {
      return res.status(500).json({ error });
    }
    if (results.length === 0) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }
    res.json(results);
  });
});

// Admin

app.get('/warehouse', (req, res) => {
  const query = 'SELECT * FROM warehouse';
  connection.query(query, (error, results) => {
    if (error) {
      return res.status(500).json({ error });
    }
    res.json(results);
  });
});

app.post('/warehouse', (req, res) => {
  const { name, email, password, ubicacion} = req.body;
  const query = 'INSERT INTO Almacenes (name, email, password, ubicacion) VALUES (?, ?, ?, ?)';
  connection.query(query, [name, email, password, ubicacion], (error, results) => {
    if (error) {
      return res.status(500).json({ error });
    }
    res.json(results);
  });
});

app.get('/produsers', (req, res) => {
  const query = 'SELECT * FROM produsers';
  connection.query(query, (error, results) => {
    if (error) {
      return res.status(500).json({ error });
    }
    res.json(results);
  });
});



app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
