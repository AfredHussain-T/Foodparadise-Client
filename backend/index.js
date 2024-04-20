const express = require('express')
const app = express()
const cors = require("cors");
const port = 5000
const connectMongo=require("./mgdb")
app.use((req,res,next)=>{
    res.setHeader("Access-Control-Allow-Origin","http://localhost:3000");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
})
connectMongo();
app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use(cors());
app.use(express.json())

app.use('/api',require("./Routes/UserCreation"))
app.use('/api',require("./Routes/Menu"))
app.use('/api',require("./Routes/MyData"))

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})