//Teste a parte do código
//Monitora os eventos de clique em todo o retangulo da neutralArea
document.querySelector('.neutralArea').addEventListener('click',(e)=>{
    //Demonstração de diferença entre target e current target
    console.log("Target:", e.target); 
    console.log("Current Target:", e.currentTarget); 
    
    
    console.log("Clicou!"); 
});

let areas = {
    a: null,
    b: null,
    c: null
}

//Inicia aqui

//Irá filtrar todos as divs com tag .item e adicionar eventos específicos em cada 
document.querySelectorAll('.item').forEach(item => {
    //Funções dragstart e dragend são padrões do JS
    item.addEventListener('dragstart', dragStart); //Irá acionar a função padrão de dragstart e acionar a dragStart
    item.addEventListener('dragend', dragEnd); //Irá acionar a função padrão de dragend e acionar a dragEnd
});

//Irá filtrar todas as divs com a tag .area e adicionar eventos específicos
document.querySelectorAll('.area').forEach(area => {
    //Funções para fazer os efeitos ao passar, sair e largar o item na área
    area.addEventListener('dragover', dragOver);
    area.addEventListener('dragleave', dragLeave);
    area.addEventListener('drop', drop);
});

document.querySelector('.neutralArea').addEventListener('dragover', dragOverNeutral);
document.querySelector('.neutralArea').addEventListener('dragleave', dragLeaveNeutral);
document.querySelector('.neutralArea').addEventListener('drop', dropNeutral);

//Function Item
function dragStart (e){
    e.currentTarget.classList.add('dragging'); //Importante: Irá adicionar a class do css - item.dragging
}

function dragEnd (e){
    e.currentTarget.classList.remove('dragging');
}

//Functions Area

function dragOver(e){
    if(e.currentTarget.querySelector('.item') === null){ //Condição para que os itens estejam vazios
        e.preventDefault(); //Irá prevenir o comportamento padrão do dragover (Permite adicionar)
        e.currentTarget.classList.add('hover'); //Adiciona a classList hover
    }
    console.log("Passou por cima!");
}

function dragLeave(e){
    console.log("Saiu de uma área de drop!");
    e.currentTarget.classList.remove('hover'); //Remove a classList hover
}

function drop(e){
    console.log("Liberou");
    e.currentTarget.classList.remove('hover'); //Remove a classList hover

    if(e.currentTarget.querySelector('.item') === null){ 
        let dragItem = document.querySelector('.item.dragging'); //dragItem recebrá o item com a caracteristica dragging
        e.currentTarget.appendChild(dragItem); //Se a div a qual o tem foi arrastado estiver vazia, é adicionado o dragItem
        updateAreas();
    }

}

//Funcions Neutral Area
function dragOverNeutral(e){
    e.preventDefault();
    e.currentTarget.classList.add('hover');
}
function dragLeaveNeutral(e){
    e.currentTarget.classList.remove('hover');
}
function dropNeutral(e){
    e.currentTarget.classList.remove('hover');
    let dragItem = document.querySelector('.item.dragging'); //dragItem recebrá o item com a caracteristica dragging
    e.currentTarget.appendChild(dragItem); //Se a div a qual o tem foi arrastado estiver vazia, é adicionado o dragItem
    updateAreas();
}

//Logic Functions

//Irá guardar e atualizar as informações dos itens atribuidos
function updateAreas(){
    document.querySelectorAll('.area').forEach(area => { //Dá um for em cada div .area
        let name = area.getAttribute('data-name'); //Armazena a informação do data-name de cada um

        //Armazena na variável áreas as informações
        if(area.querySelector('.item') !== null){
            areas[name] = area.querySelector('.item').innerHTML;
        } else{
            areas[name] = null;
        }
    });    
    console.log(areas);

    //Verificador dos itens correspondentes das áreas para coloração 
    if((areas.a ==='1') && (areas.b === '2') && (areas.c === '3')){
        document.querySelector('.areas').classList.remove('wrong');
        document.querySelector('.areas').classList.add('correct');

        //Incrementação no código
    }else if((areas.a === null) | (areas.b === null) | (areas.c === null)){
        document.querySelector('.areas').classList.remove('correct');
        document.querySelector('.areas').classList.remove('wrong');
        
        //Incrementação no código
    }else if((areas.a !== '1') | (areas.b !== '2') | (areas.c !== '3')){
        document.querySelector('.areas').classList.remove('correct');
        document.querySelector('.areas').classList.add('wrong');

    };
};