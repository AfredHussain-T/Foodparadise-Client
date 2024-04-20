
const mongoose=require('mongoose')
const mongoURI = 'mongodb+srv://afredhussain69:eQ6e3NkqL3VmFDBG@fooddb.knygu8i.mongodb.net/foodParadise';
//'mongodb://foodParadise:w08mQyQe1le53L4X@ac-hrdmlwa-shard-00-00.orraka2.mongodb.net:27017,ac-hrdmlwa-shard-00-01.orraka2.mongodb.net:27017,ac-hrdmlwa-shard-00-02.orraka2.mongodb.net:27017/foodParadise?ssl=true&replicaSet=atlas-hqoqff-shard-0&authSource=admin&retryWrites=true&w=majority'
const connectMongo=()=> {mongoose.connect(mongoURI, { useNewUrlParser: true});
mongoose.connection
.once('open', ()=> console.log("connected"))
.on('error',error =>{
    console.log('error',error)
});}
module.exports = connectMongo;