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

// Login
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

// Admin - Usuarios

// Admin - Productores

app.get('/produsers', (req, res) => {
  const query = 'SELECT * FROM Productores';
  connection.query(query, (error, results) => {
    if (error) {
      return res.status(500).json({ error });
    }
    res.json(results);
  });
});

app.post('/produsers', (req, res) => {
  const { nombre, email, password, ubicacion, wallet_address } = req.body;
  const query = 'INSERT INTO Productores (nombre, email, password, ubicacion, creado_en, wallet_address) VALUES (?, ?, ?, ?, NOW(), ?)';

  connection.query(query, [nombre, email, password, ubicacion, wallet_address], (error, results) => {
    if (error) {
      console.error('Error en la inserción:', error);
      return res.status(500).json({ 
        message: 'Error al insertar el productor', 
        error: error.message,
        sqlMessage: error.sqlMessage
      });
    }
    res.json({ message: 'Productor insertado con éxito', id: results.insertId });
  });
})

;app.delete('/produsers/:id', (req, res) => {
  const { id } = req.params;
  const query = 'DELETE FROM Productores WHERE productor_id = ?';
  connection.query(query, [id], (error, results) => {
    if (error) {
      return res.status(500).json({ error });
    }
    res.json(results);
  });
});

app.get('/produsers', (req, res) => {
  const query = `
    SELECT p.productor_id, p.nombre, p.email, p.ubicacion, p.wallet_address, p.creado_en, pr.product_id, pr.nombre AS product_name
    FROM Productores p
    LEFT JOIN Productos pr ON p.productor_id = pr.producer_id
  `;
  connection.query(query, (error, results) => {
    if (error) {
      return res.status(500).json({ error });
    }
    res.json(results);
  });
});





// Admin - Almacen

app.get('/warehouse', (req, res) => {
  const query = 'SELECT * FROM Almacenes';
  connection.query(query, (error, results) => {
    if (error) {
      return res.status(500).json({ error });
    }
    res.json(results);
  });
});

app.post('/warehouse', (req, res) => {
  const { name, email, password, ubicacion, wallet_address} = req.body;
  const query = 'INSERT INTO Almacenes (nombre, email, password, ubicacion, wallet_address ) VALUES (?, ?, ?, ?, ?)';
  connection.query(query, [name, email, password, ubicacion, wallet_address], (error, results) => {
    if (error) {
      console.log(query(query, [name, email, password, ubicacion, wallet_address]));
      return res.status(500).json({ error });
      
    }
    res.json(results);
  });
});

app.delete('/warehouse/:id', (req, res) => {
  const { id } = req.params;
  const query = 'DELETE FROM Almacenes WHERE almacen_id = ?';
  connection.query(query, [id], (error, results) => {
    if (error) {
      return res.status(500).json({ error });
    }
    res.json(results);
  });
});

// Admin - Mayoristas
// Admin - Minoristas

// Admin - Productos



app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

