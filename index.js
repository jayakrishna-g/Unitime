const express = require('express');
const apiRoutes = require('./rest/index');
const app = express();
const port = process.env.PORT || 5050;
const cors = require('cors');

app.use(cors());

app.use(express.json());

app.use('/api', apiRoutes);

app.use(express.static(`${__dirname}/ui/dist/ui`));
app.get('*', (req, res) => res.sendFile(`${__dirname}/ui/dist/ui/index.html`));

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
