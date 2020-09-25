const express = require('express');

const app = express();

app.use(express.static('./dist/frenzy-dashboard-demo'));

app.get('/*', function (req, res) {
  res.sendFile('index.html', { root: 'dist/Global-Market-CMS' }
  );
});

app.listen(process.env.PORT || 8080);
