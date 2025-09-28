const express = require('express');

const PORT = process.env.port || 8000

const app = express();

app.listen(PORT,()=>{
    console.log(`Server running on port ${PORT}`);
})