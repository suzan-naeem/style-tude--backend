import express from 'express';
// import data from './data.js';
import mongoose from 'mongoose';
import userRouter from './routers/userRouter.js';
import productRouter from './routers/productRouter.js';
import cors  from 'cors';
import orderRouter from './routers/orderRouter.js';



const app = express();
// core
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const port = process.env.PORT || 5000;



mongoose.connect(process.env.MONGODB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
 
});
const db = mongoose.connection;
db.on("error", (error) => console.log(error));
db.once("open", () => console.log("Connected to Mongodb.."));

app.use((err, req, res, next) => {
    res.status(500).send({ message: err.message });
  });

app.use('/api/users', userRouter);
app.use('/api/products', productRouter);
app.use('/api/orders', orderRouter);

app.get('/', (req, res) => {
    res.send('server is ready');
  });

// app.get('/api/products/:id', (req, res) => {
//     const product = data.products.find((product) => product._id === req.params.id);
//     if (product){
//         res.send(product);
//     }else{
//         res.status(404).send({ message: 'Product not Found'});
//     }
// });

// app.get('/api/products', (req, res) => {
//         res.send(data.products);    
// });

app.listen(port, () => {
    console.log(`Serve at http://localhost:${port}`);
}); 
