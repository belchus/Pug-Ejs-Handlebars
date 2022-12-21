const express = require('express')
const app = express()
const { engine } = require('express-handlebars')
const Container = require('./app')


const PORT = 8080
const server = app.listen(PORT, () => {
    console.log(`Servidor http escuchando en puerto ${server.address().port}`)
})
server.on('error', error => console.log(`Error en servidor, ${error}`))

app.engine(
    'handlebars',
    engine({
        extname: '.handlebars',
        defaultLayout: 'main.handlebars',
        layoutsDir: __dirname + '/views/layout'
    })
)

app.set('view engine', 'handlebars')
app.set('views', './views')

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))


const products = new Container('productos.txt')

app.post('/productos', (req, res) => {
    const newProduct = req.body
    products.save(newProduct)
    res.redirect('/')
})

app.get('/productos', async (req, res) => {
    const misProd = await products.getAll()
    res.render('datos', {
        misProd: misProd,
        productos: misProd.length
    })
})
