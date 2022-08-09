function criarCard(produtosLista){
    const ul = document.querySelector(".containerListaProdutos ul")
    ul.innerHTML = ""
    produtosLista.forEach((element) => {

        let li = document.createElement("li")
        let img = document.createElement("img")
        let h3 = document.createElement("h3")
        let span = document.createElement("span")
        let p = document.createElement("p")
        let div = document.createElement("div")
        let button = document.createElement("button")
        let ol = document.createElement("ol")

        let imagemProduto = element.img
        let nomeProduto = element.nome
        let secaoProduto = element.secao
        let precoProduto = Number(element.preco)
        
        img.src = imagemProduto
        h3.innerText = nomeProduto
        span.innerText = secaoProduto
        p.innerText = `R$${precoProduto}`
        button.id = element.id
        button.innerText = "Comprar"
        
        nutrientes()
        
        ul.appendChild(li)
        li.appendChild(img)
        li.appendChild(h3)
        li.appendChild(span)
        li.appendChild(ol)
        li.appendChild(div)
        div.appendChild(p)
        div.appendChild(button)

        function nutrientes(){
                for(let i = 0; i <element.componentes.length; i++){ 
                    let listaComponentes = document.createElement("li")
                     listaComponentes.innerText = element.componentes[i]
                     ol.appendChild(listaComponentes)
        }}        
        
    })
}
criarCard(produtos)

function valorProdutos(itens){
    const span = document.querySelector(".priceContainer span")
    let contador = 0
    span.innerHTML = ""

    itens.forEach((element) =>{
        let preco = Number(element.preco)
        contador += preco
    })
    
    span.innerText = `R$${contador}`    
}

const buttonPesquisa = document.querySelector(".containerBuscaPorNome button")
const inputPesquisa = document.querySelector(".containerBuscaPorNome input")

buttonPesquisa.addEventListener("click", buscarItem)

function buscarItem(){
    let valorPesquisa = inputPesquisa.value
    let pesquisar = verificandoPesquisa(valorPesquisa)

    valorProdutos(pesquisar)
    criarCard(pesquisar)
}

function verificandoPesquisa(valor){
    let resultadoBusca = []
    let pesquisa = valor.trim().toLowerCase()
    produtos.forEach((element) => {
        if(element.nome.toLowerCase().includes(pesquisa) || element.secao.toLowerCase().includes(pesquisa) || element.categoria.toLowerCase().includes(pesquisa)){
            resultadoBusca.push(element)
        }else if(pesquisa === ""){
            resultadoBusca = []
        }
    })
    return resultadoBusca
}

const secaoFiltro = document.querySelectorAll(".estiloGeralBotoes--filter")
for(let i = 0; i<secaoFiltro.length; i++){
    let btnFiltro = secaoFiltro[i]

    btnFiltro.addEventListener("click",(()=>{
        if(i == 0){
            valorProdutos(produtos)
            criarCard(produtos)
            
        }
        if(i == 1){
            const hortifruti = produtos.filter(element => element.secao == "Hortifruti")
            valorProdutos(hortifruti)
            criarCard(hortifruti)
        }
        if(i == 2){
            const panificadora = produtos.filter(element => element.secao == "Panificadora")
            valorProdutos(panificadora)
            criarCard(panificadora)
        }
        if(i == 3){
            const laticinio = produtos.filter(element => element.secao == "Laticinio")
            valorProdutos(laticinio)
            criarCard(laticinio)
        }
        
    }))
}

const listaProdutos = document.querySelector(".containerListaProdutos ul")
const listaCarrinho = document.querySelector(".setorCarrinho")

listaProdutos.addEventListener("click", adicionarAoCarrinho)
let arrayCarrinho = []
function adicionarAoCarrinho(clique){
    listaCarrinho.innerHTML = ""
    let btnClique = clique.target
    if(btnClique.tagName === "BUTTON"){
        let produto = btnClique.id
        produtos.forEach((element) => {
            if(produto == element.id){
                arrayCarrinho.push(element)
            }
        })
        criarItemCarrinho(arrayCarrinho)
        valorProdutos(arrayCarrinho)
        carrinhoQuantidade(arrayCarrinho)
    }
}

function criarItemCarrinho(compra){
    let ul = document.querySelector(".setorCarrinho")
    compra.forEach((element) => {
        let li = document.createElement("li")
        let carrinhoInfo = document.createElement("div")
        let containerImg = document.createElement("div")
        let img = document.createElement("img")
        let h3 = document.createElement("h3")
        let span = document.createElement("span")
        let p = document.createElement("p")
        let button = document.createElement("button")
    
        let imagemProduto = element.img
        let nomeProduto = element.nome
        let secaoProduto = element.secao
        let precoProduto = Number(element.preco)

        img.src = imagemProduto
        h3.innerText = nomeProduto
        span.innerText = secaoProduto
        p.innerText = `R$${precoProduto}`
        button.id = element.id
        button.innerText = "Remover"
        carrinhoInfo.classList = "carrinhoInfo"
        containerImg.classList = "containerImg"

        ul.appendChild(li)
        li.appendChild(containerImg)
        containerImg.appendChild(img)
        li.appendChild(carrinhoInfo)
        carrinhoInfo.appendChild(h3)
        carrinhoInfo.appendChild(span)
        carrinhoInfo.appendChild(p)
        li.appendChild(button)
    })
}

listaCarrinho.addEventListener("click",removerDoCarrinho)
function removerDoCarrinho(clique){
    listaCarrinho.innerHTML = ""
    let btnClique = clique.target
    if(btnClique.tagName === "BUTTON"){
        let produto = btnClique.id
        arrayCarrinho.forEach((element,i)=>{
            if(produto == element.id){
                arrayCarrinho.splice(i,1)
            }
        })
        criarItemCarrinho(arrayCarrinho)
        valorProdutos(arrayCarrinho)
        carrinhoQuantidade(arrayCarrinho)
    }

}

function carrinhoQuantidade(array){
    let quantidade = document.querySelector(".quantidade")
    quantidade.innerText = array.length

    return quantidade
}