const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;

app.use(cors());
app.get('/:operator/:num1/:num2', (req, res) => {
    let num1 = parseInt(req.params.num1);
    let num2 = parseInt(req.params.num2);
    let calc = {
        'add': num1 + num2,
        'takeaway': num1 - num2,
        'times': num1 * num2,
        'over': num1 / num2
    };
    res.send(calc[req.params.operator].toString());
});
  
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});