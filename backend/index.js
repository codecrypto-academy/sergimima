import express from 'express';
import mysql from 'mysql2';
import cors from 'cors';
import bodyParser from 'body-parser';
import connection from './dbConnection.js';
import { v4 as uuidv4 } from 'uuid';
const app = express();
const port = 3001;

app.use(cors());
app.use(bodyParser.json());

// Aquí puedes agregar tus rutas y middleware



// Login
app.post('/login', (req, res) => {
    const { role, email, password, } = req.body;

    if (!role || !password || !email) {
        console.log(role, email, password);
        return res.status(400).json({ error: 'Email, password, and role are required' });
    }

    const query = `SELECT * FROM ${role} WHERE email = ? AND password = ?`;
    connection.query(query, [email, password], (error, results) => {
        if (error) {
            //console.log(query);
            return res.status(500).json({ error });
        }
        if (results.length === 0) {
            console.log(query, [email, password]);
            return res.status(401).json({ error: 'Invalid email or password' });
        }
        res.status(200).json({ message: 'Login successful', user: results[0] });
    });
});

//---------------
//#region TRANSFERS
//---------------

app.get('/transfers', (req, res) => {
    const { product_id } = req.query;
    const query = `SELECT * FROM Transfers WHERE product_id = ?`;
    connection.query(query, [product_id], (error, results) => {
        if (error) {
            return res.status(500).json({ error });
        }
        res.json(results);
    });
});

//#endregion

//---------------
//#region ADMIN
//---------------

// Admin - Usuarios

// Admin - Productores

app.get('/produsers', (req, res) => {
    const query = 'SELECT * FROM Productores';
    connection.query(query, (error, results) => {
        if (error) {
            console.log(query, [nombre, description, productor_id, quantity]);
            return res.status(500).json({ error: error.message });
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

    ; app.delete('/produsers/:id', (req, res) => {
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
    const { name, email, password, ubicacion, wallet_address } = req.body;
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

app.get('/wholesalers', (req, res) => {
    const query = 'SELECT * FROM Distribuidores';
    connection.query(query, (error, results) => {
        if (error) {
            return res.status(500).json({ error });
        }
        res.json(results);
    });
});

app.post('/wholesalers', (req, res) => {
    const { nombre, email, password, ubicacion, wallet_address } = req.body;
    const query = 'INSERT INTO Distribuidores (nombre, email, password, ubicacion, creado_en ,wallet_address) VALUES (?, ?, ?, ?, NOW(), ?)';
    connection.query(query, [nombre, email, password, ubicacion, wallet_address], (error, results) => {
        if (error) {
            return res.status(500).json({ error });
        }
        res.json(results);
    });
});

app.delete('/wholesalers/:id', (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM Distribuidores WHERE distribuidor_id = ?';
    connection.query(query, [id], (error, results) => {
        if (error) {
            return res.status(500).json({ error });
        }
        res.json(results);
    });
});


// Admin - Minoristas

app.get('/sellers', (req, res) => {
    const query = 'SELECT * FROM Minoristas';
    connection.query(query, (error, results) => {
        if (error) {
            return res.status(500).json({ error });
        }
        res.json(results);
    });
});

app.post('/sellers', (req, res) => {
    const { nombre, email, password, ubicacion, wallet_address } = req.body;
    const query = 'INSERT INTO Minoristas (nombre, email, password, ubicacion, creado_en ,wallet_address) VALUES (?, ?, ?, ?, NOW(), ?)';
    connection.query(query, [nombre, email, password, ubicacion, wallet_address], (error, results) => {
        if (error) {
            return res.status(500).json({ error });
        }
        res.json(results);
    });
});

app.delete('/sellers/:id', (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM Minoristas WHERE minorista_id = ?';
    connection.query(query, [id], (error, results) => {
        if (error) {
            return res.status(500).json({ error });
        }
        res.json(results);
    });
});

// Admin - Productos
//#endregion

//---------------
//#region PRODUCTORES
//---------------

// Productores - Productor

app.get('/products', (req, res) => {
    const { productor_id } = req.query;
    const query = 'SELECT * FROM Productos WHERE productor_id = ?';
    connection.query(query, [productor_id], (error, results) => {
        if (error) {
            return res.status(500).json({ error: error.message });
        }
        res.json(results);
    });
});

app.post('/productorCreate', (req, res) => {
    const uniqueId = uuidv4();
    const { nombre, description, productor_id, quantity } = req.body;
    const query = 'INSERT INTO Productos (nombre, descripcion, productor_id, distribuidor_id, almacen_id, minorista_id, fecha_creacion, quantity, state, uuid) VALUES (?, ?, ?, NULL, NULL, NULL, NOW(),  ?, "Creado", ?)';
    const values = [nombre, description, productor_id, quantity, uniqueId];
    connection.query(query, [nombre, description, productor_id, quantity, uniqueId], (error, results) => {
        if (error) {
            const formattedQuery = mysql.format(query, values);
            console.log('Formatted query:', formattedQuery);
            return res.status(500).json({ error });
        }
        res.json(results);
    });
});

app.post('/productSent', (req, res) => {
    const { producto_id, productor_id, almacen_id, quantity } = req.body;
    const updateProductQuery = 'UPDATE Productos SET almacen_id = ?, quantity = quantity - ? , state = "Enviado"WHERE producto_id = ? ';
    const insertTransferQuery = 'INSERT INTO Transfers (product_id, producer_id, sent_to_almacen_ID, quantity_sent_almacen, date_sent_almacen, status) VALUES (?, ?, ?, ?, NOW(), "Enviado a almacen")';

    connection.beginTransaction((err) => {
        if (err) { return res.status(500).json({ error: err }); }

        connection.query(updateProductQuery, [almacen_id, quantity, producto_id], (error, results) => {
            if (error) {
                return connection.rollback(() => {
                    res.status(500).json({ error });
                });
            }

            connection.query(insertTransferQuery, [producto_id, productor_id, almacen_id, quantity], (error, transferResults) => {
                if (error) {
                    return connection.rollback(() => {
                        res.status(500).json({ error });
                    });
                }

                connection.commit((err) => {
                    if (err) {
                        return connection.rollback(() => {
                            res.status(500).json({ error: err });
                        });
                    }
                    res.json({ message: "Product sent and transfer recorded successfully", results, transferResults });
                });
            });
        });
    });
});
app.post('/productDeleted', (req, res) => {
    const { producto_id } = req.body;
    console.log(producto_id);
    const query = 'DELETE FROM Productos WHERE producto_id = ?';
    connection.query(query, [producto_id], (error, results) => {
        if (error) {
            return res.status(500).json({ error });
        }
        res.json(results);
    });
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});

//#endregion

//---------------
//#region ALMACEN
//---------------4

app.get('/productsPendingReveiveAlmacen', (req, res) => {
    const { almacen_id } = req.query;
    const query = `
        SELECT p.* 
        FROM Productos p
        JOIN Transfers t ON p.producto_id = t.product_id
        WHERE p.almacen_id = ? 
        AND t.status = 'Enviado a almacen'
    `;
    connection.query(query, [almacen_id], (error, results) => {
        if (error) {
            return res.status(500).json({ error: error.message });
        }
        res.json(results);
    });
});

app.get('/productsAlmacen', (req, res) => {
    const { almacen_id } = req.query;

    const query = `
        SELECT p.* 
        FROM Productos p
        JOIN Transfers t ON p.producto_id = t.product_id
        WHERE p.almacen_id = ? 
        AND t.status = 'Recivido por Almacen'
    `;

    connection.query(query, [almacen_id], (error, results) => {
        if (error) {
            return res.status(500).json({ error: error.message });
        }
        res.json(results);
    });
});

app.get('/productsAlmacen', (req, res) => {
    const { almacen_id } = req.query;
    const query = 'SELECT * FROM Productos WHERE almacen_id = ?';
    connection.query(query, [almacen_id], (error, results) => {
        if (error) {
            return res.status(500).json({ error: error.message });
        }
        res.json(results);
    });
});

app.post('/receiveProduct', (req, res) => {
    const { productId, } = req.body;
    const query = 'UPDATE Productos SET state = "Recivido por Almacen" WHERE producto_id = ? ';
    connection.query(query, [productId], (error, results) => {
        if (error) {
            //console.log(query, [producto_id]);
            return res.status(500).json({ error });
        }
        console.log(query, [productId]);
        res.json(results);
    });
});

app.post('/sentProdcutToMayorista', (req, res) => {
    const { productId, } = req.body;
    const query = 'UPDATE Productos SET almacen_id = ?, state = "Enviado a Mayorista" WHERE producto_id = ? ';
    connection.query(query, [productId], (error, results) => {
        if (error) {
            //console.log(query, [producto_id]);
            return res.status(500).json({ error });
        }
        console.log(query, [productId]);
        res.json(results);
    });
});
//#endregion

//---------------
//#region MAYORISTA
//---------------

app.get('/distribuidor', (req, res) => {

    const query = 'SELECT * FROM Distribuidores';
    connection.query(query, (error, results) => {
        if (error) {
            return res.status(500).json({ error: error.message });
        }
        res.json(results);
    });
});


//#endregion