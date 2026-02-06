import express from "express"

const app = express()
const PORTA = 5000
app.use(express.json())

let listarAlunos = [ //indice é o id (0 = 1, 1 = 2, etc)
    {id:1, nome:"Dale"}, 
    {id:2, nome:"Laura"},
    {id:3, nome:"Henry"}
]

app.get("/", (req, res) => {
    res.status(200).json ({
        msg:"hello world"
    })
})

//localiza todos os alunos
app.get("/alunos", (req, res) => {
    res.status(200).json(listarAlunos)
})

//localiza um aluno em especifico
app.get("/alunos/:codigo", (req, res) => {
    const idParametro = Number(req.params.codigo) //Texto = String, Number, Boo (boolean)
    const aluno = listarAlunos.find(a=>a.id===idParametro)
    if (!aluno) {
        res.status(404).json({msg:"aluno nao encontrado"})
    }
    res.status(200).json(aluno)
})

//alterar aluno
app.put("/alunos/:codigo", (req, res) =>{
    const idParametro = Number(req.params.codigo)
    const indiceAluno = listarAlunos.findIndex(a=>a.id===idParametro) //localiza codigo aluno
    //console.log(req) - debug
    const {nome} = req.body
    if(!indiceAluno === -1) {
        return res.status(404).json({msg:"nao achamos o sujeito chefe"})
    }
    if(!nome) {
        return res.status(400).json({msg:"preencher com nome"})
    }
    listarAlunos[indiceAluno] = {id:idParametro, nome}

    res.status(200).json({msg:"alteração feita com sucesso", Indice:indiceAluno})

})

app.put("/alunos/", (req, res) => {
    const idParametro = req.params.codigo ? Number(req.params.codigo):0
    console.log("parametro:", req.params)
    if (idParametro === 0) {
        return res.status(400).json({msg:"Digite o nome chefe"})
    }
})

//deleta aluno
app.delete("/alunos/:codigo", (req, res) => {
    const idParametro = Number(req.params.codigo)
    const aluno = listarAlunos.findIndex(a=>a.id===idParametro)
    console.log(aluno)
    if (aluno === -1) {
        return res.status(404).json({msg:"sujeito nao encontrado"})
    }
        
    listarAlunos.splice(aluno, 1)
    return res.status(200).json({msg:"Aluno deletado com sucesso chefe!"})
})

app.delete("/alunos/", (req, res) => {
    const idParametro = req.params.codigo ? Number(req.params.codigo):0
    console.log("parametro:", req.params)
    if (idParametro === 0) {
        return res.status(400).json({msg:"Digite o id chefe"})
    }
})

app.listen(PORTA, () => {
    console.log(`servidor rodando!`)
})

