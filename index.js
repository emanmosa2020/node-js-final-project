const express = require('express')

const app = express()

const port = 3000 || process.env.PORT

require('./db/mongoose')

app.use(express.json())

const reporterRouter = require('./routers/reporter')
app.use(reporterRouter)

const bcrypt = require('bcryptjs')

//////////////////////////////////////////

const passwordFucntion = async () =>{
    const password ='R123456'
    const hashedPassword = await bcrypt.hash(password,8)
    

    const compare = await bcrypt.compare('R123456',hashedPassword)
    
}
passwordFucntion()

///////////////////////////////////////////////////////////////////////////////////////////

//Jsonwebtoken

const jwt = require('jsonwebtoken')

const myToken = async() =>{

    const token = jwt.sign({_id:'123'},'node course',{expiresIn: '7 days'})
    console.log(token)

    const tokenVerify = jwt.verify(token,'node course')
    console.log(tokenVerify)
}
myToken()

/////////////////////////////////////////////////////////////////////////////////////////////



app.listen(port,()=>{
    console.log('Server is running')
})


