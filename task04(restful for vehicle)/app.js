const express = require('express');
const app = express();
app.use(express.json());

let vehicles = [];


app.post('/vehicles', (req, res) => {
    const { vehicleName, price, images, desc, brand } = req.body;
    const vehicle = { id: vehicles.length + 1, vehicleName, price, images, desc, brand };
    vehicles.push(vehicle);
    res.status(201).json(vehicle);
});


app.get('/vehicles', (req, res) => {
    res.json(vehicles);
});


app.get('/vehicles/:id', (req, res) => {
    const vehicle = vehicles.find(v => v.id == req.params.id);
    if (!vehicle) return res.status(404).json({ error: 'Not found' });
    res.json(vehicle);
});


app.put('/vehicles/:id', (req, res) => {
    const vehicle = vehicles.find(v => v.id == req.params.id);
    if (!vehicle) return res.status(404).json({ error: 'Not found' });
    const { vehicleName, price, images, desc, brand } = req.body;
    Object.assign(vehicle, { vehicleName, price, images, desc, brand });
    res.json(vehicle);
});

// DELETE
app.delete('/vehicles/:id', (req, res) => {
    const index = vehicles.findIndex(v => v.id == req.params.id);
    if (index === -1) return res.status(404).json({ error: 'Not found' });
    vehicles.splice(index, 1);
    res.status(204).send();
});

app.listen(3000, () => console.log('Server running on port 3000')); 