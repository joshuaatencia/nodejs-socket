const { io } = require('../index');
const Band = require('../models/band');
const Bands = require('../models/bands');

const bands = new Bands();

bands.addBand(new Band('Breaking Benjamin'));
bands.addBand(new Band('Bon Jovi'));
bands.addBand(new Band('Héroes del Silencio'));
bands.addBand(new Band('Metallica'));

console.log(bands);

io.on('connection', client => {
    console.log('Client connected');

    client.emit('active-bands', bands.getBands());


    client.on('disconnect', () => {
        console.log('Client disconnected');

    });

    client.on('mensaje', (payload) => {
        console.log('mensaje', payload);

        io.emit('mensaje', { admin: 'new mensagge' });
    });

    // client.on('emitir-mensaje', (payload) => {

    //     client.broadcast.emit('nuevo-mensaje', payload);
    // });

    client.on('vote-band', (payload) => {
        bands.voteBand(payload.id);
        io.emit('active-bands', bands.getBands());
    });

    client.on('add-band', (payload) => {
        bands.addBand(new Band(payload.name));
        io.emit('active-bands', bands.getBands());
    });

    client.on('delete-band', (payload) => {
        bands.deleteBand(payload.id);
        io.emit('active-bands', bands.getBands());
    });


});