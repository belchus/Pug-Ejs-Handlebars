const express = require('express')
const Container = require('./app')

const app = express()

const PORT = 8080

const server = app.listen(PORT, () =>{
    console.log(`Servidor HTTP escuchando en puerto ${server.address().port}`)
})
server.on('error', error => console.log(`Error en servidor, ${error}`))

const products = new Container('productos.txt')
app.use(express.static('./public'))
app.set('view engine', 'ejs')
app.set('views','./views' )
app.use(express.urlencoded({ extended: true }))
app.use(express.json())


app.post('/productos', (req, res) => {
    const producto = req.body
    products.save(producto)
    res.redirect('/')
})

app.get('/productos', async (req, res) => {
    const misProd = await products.getAll()
    res.render('datos', {
        misProd: misProd,
        productos: misProd.length
    })
})
app.post('/addProduct', async (req, res) =>{
    const savedProduct = await products.save(req.body)
    res.json(savedProduct)
})

