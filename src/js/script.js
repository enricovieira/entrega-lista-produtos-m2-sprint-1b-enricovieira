function criarCard(produtosLista){
    const ul = document.querySelector(".containerListaProdutos ul")
    ul.innerHTML = ""
    produtosLista.forEach((element) => {

        let li = document.createElement("li")
        let img = document.createElement("img")
        let h3 = document.createElement("h3")
        let span = document.createElement("span")
        let p = document.createElement("p")

        let imagemProduto = element.img
        let nomeProduto = element.nome
        let secaoProduto = element.secao
        let precoProduto = element.preco
        
        img.src = imagemProduto
        h3.innerText = nomeProduto
        span.innerText = secaoProduto
        p.innerText = `R$${precoProduto},00`
        
        ul.appendChild(li)
        li.appendChild(img)
        li.appendChild(h3)
        li.appendChild(span)
        li.appendChild(p)
        
    })
}
criarCard(produtos)

function valorProdutos(itens){
    const span = document.querySelector(".priceContainer span")
    let contador = 0
    span.innerHTML = ""

    itens.forEach((element) =>{
        contador += element.preco
    })
    
    span.innerText = `R$${contador},00`    
}
valorProdutos(produtos)

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
        if(element.nome.toLowerCase().includes(pesquisa)){
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
            const laticinio = produtos.filter(element => element.secao == "Laticínio")
            valorProdutos(laticinio)
            criarCard(laticinio)
        }
        
    }))
}


