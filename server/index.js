const app = require('./server');

let PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Server is listening: http://localhost:${PORT}`));
