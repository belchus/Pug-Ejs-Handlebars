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
app.set('views','./views' )
app.set('view engine', 'pug')
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

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



//routeProducts.get('/', (req, res) => {
  //  res.sendFile(__dirname + '/public/index.html')
//})

/*routeProducts.get('/', async (req, res) => {
    const productsList = await products.getAll()
    res.json(productsList)
})


routeProducts.get('/:id', async (req, res) =>{
    try {
        const productById = await products.getById(parseInt(req.params.id))
        if(productById === null) return res.status(404).json('El producto buscado no fue encontrado')
        res.json(productById)
    } catch (error){
        res.status(500).json({ Error:  error.message })
    }
})

routeProducts.post('/addProduct', async (req, res) =>{
    const savedProduct = await products.save(req.body)
    res.json(savedProduct)
})
*/
/*routeProducts.put('/:id', async (req, res) =>{
    const updateInfo = req.body
    const productsList = await products.getAll()
    regToUpdate = productsList.findIndex(product => product.id === parseInt(req.params.id))
    if (regToUpdate === -1) {
        return res.send({ Error:  'El producto no fue encontrado' })
    }
    productsList[regToUpdate] = { ...updateInfo, id: parseInt(req.params.id) }
    await products.saveData(productsList)
    res.json({ ...updateInfo, id: parseInt(req.params.id) })
})


routeProducts.delete('/:id', async (req, res) =>{
    const deletedId = await products.getById(parseInt(req.params.id))
    await products.deleteById(parseInt(req.params.id))
    deletedId === null
        ? res.json( {'Producto ': `${parseInt(req.params.id)} no fue encontrado`} )
        : res.json( {'Se ha eliminado eliminado': deletedId} )
})
*/