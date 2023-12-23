let thisPageIngresos = 1;
let thisPageEgresos = 1;
let limit = 6;

const ingresos = [
    new Ingreso('Salario 1', 2100),
    new Ingreso ('Venta Coche 2', 1500),
    new Ingreso ('Venta Coche 3', 1500),
    new Ingreso ('Venta Coche 4', 1500),
    new Ingreso ('Venta Coche 5', 1500),
    new Ingreso ('Venta Coche 6', 1500),
    new Ingreso ('Venta Coche 7', 1500),
    new Ingreso ('Venta Coche 8', 1500)
];

const egresos = [
    new Egreso('Renta 1', 900),
    new Egreso("Ropa 2", 400),
    new Egreso('Renta 3', 900),
    new Egreso("Ropa 4", 400),
    new Egreso('Renta 5', 900),
    new Egreso("Ropa 6", 400),
    new Egreso('Renta 7', 900),
    new Egreso("Ropa 8", 400),
    new Egreso('Renta 9', 900),
    new Egreso("Ropa 10", 400)
];

//Items a Aparecer en pantalla Ingresos
function loadItemsIngresos() {
    let listIngresos = document.querySelectorAll('#lista-ingresos div.elemento');
    let beginGet = limit *(thisPageIngresos - 1);
    let endGet = limit * thisPageIngresos - 1;

    listIngresos.forEach((item, key) => {
        if (key >= beginGet && key <= endGet) {
            item.style.display = "block";
        } else {
            item.style.display = "none";
        }
    });

    listPageIngresos(listIngresos);
}

function listPageIngresos(listaIngresos){
    let count = Math.ceil(listaIngresos.length / limit);
    document.querySelector('.listPage-ingresos').innerHTML = "";

    if (thisPageIngresos != 1){
        let prev = document.createElement('li');
        let iconprev = document.createElement("ion-icon");
        iconprev.setAttribute("name", "chevron-back-outline");
        prev.appendChild(iconprev);
        // prev.innerText = 'PREV';
        prev.setAttribute('onclick', "changePageIngresos(" + (thisPageIngresos - 1) + ")");
        document.querySelector('.listPage-ingresos').appendChild(prev);
    }
 
    for(i = 1; i <= count; i++){
        let newPage = document.createElement('li');
        newPage.innerText = i;
        if(i == thisPageIngresos){
            newPage.classList.add('active');
        }

        newPage.setAttribute('onclick', "changePageIngresos(" + i + ")");

        document.querySelector('.listPage-ingresos').appendChild(newPage);

    } 

    if(thisPageIngresos != count){
        let next = document.createElement('li');
        let iconnext = document.createElement("ion-icon");
        iconnext.setAttribute("name", "chevron-forward-outline");
        next.appendChild(iconnext);
        //next.innerText = 'NEXT';
        next.setAttribute('onclick', "changePageIngresos(" + (thisPageIngresos + 1) + ")");
        document.querySelector('.listPage-ingresos').appendChild(next);
    }
}

function changePageIngresos(i) {
    thisPageIngresos = i;
    loadItemsIngresos();
}

//Items a Aparecer Egresos
function loadItemsEgresos() {
    let listEgresos = document.querySelectorAll('#lista-egresos div.elemento');
    let beginGet = limit *(thisPageEgresos - 1);
    let endGet = limit * thisPageEgresos - 1;

    listEgresos.forEach((item, key) => {
        if (key >= beginGet && key <= endGet) {
            item.style.display = "block";
        } else {
            item.style.display = "none";
        }
    });

    listPageEgresos(listEgresos);
}

function listPageEgresos(listaEgresos){
    console.log(listaEgresos);
    
    let count = Math.ceil(listaEgresos.length / limit);
    document.querySelector('.listPage-egresos').innerHTML = "";

    if (thisPageEgresos != 1){
        let prev = document.createElement('li');
        let iconprev = document.createElement("ion-icon");
        iconprev.setAttribute("name", "chevron-back-outline");
        prev.appendChild(iconprev);
        // prev.innerText = 'PREV';
        prev.setAttribute('onclick', "changePageEgresos(" + (thisPageEgresos - 1) + ")");
        document.querySelector('.listPage-egresos').appendChild(prev);
    }
 
    for(i = 1; i <= count; i++){
        let newPage = document.createElement('li');
        newPage.innerText = i;
        if(i == thisPageEgresos){
            newPage.classList.add('active');
        }

        newPage.setAttribute('onclick', "changePageEgresos(" + i + ")");

        document.querySelector('.listPage-egresos').appendChild(newPage);

    } 

    if(thisPageEgresos != count){
        let next = document.createElement('li');
        let iconnext = document.createElement("ion-icon");
        iconnext.setAttribute("name", "chevron-forward-outline");
        next.appendChild(iconnext);
        //next.innerText = 'NEXT';
        next.setAttribute('onclick', "changePageEgresos(" + (thisPageIngresos + 1) + ")");
        document.querySelector('.listPage-egresos').appendChild(next);
    }
}

function changePageEgresos(i){
    thisPageEgresos = i;
    loadItemsEgresos();
}

let cargarApp =  () => {
    cargarCabecero();
    cargarIngresos();
    cargarEgresos();
}

let totalIngresos = () => {
    let totalIngreso = 0;
    for (let ingreso of ingresos){
        totalIngreso += ingreso.valor;
    }
    return totalIngreso;
}

let totalEgresos = () => {
    let totalEgreso = 0;
    for (let egreso of egresos){
        totalEgreso += egreso.valor;
    }
    return totalEgreso;
}

let cargarCabecero = () => {
    let presupuesto = totalIngresos() - totalEgresos();
    //porcentaje de egresos en base a los ingresos
    let porcentaje_Egreso = totalEgresos() / totalIngresos();

    document.getElementById("presupuesto").innerHTML = formato_Moneda(presupuesto);
    document.getElementById("porcentaje").innerHTML = formatoPorcentaje(porcentaje_Egreso);
    document.getElementById("ingresos").innerHTML = formato_Moneda(totalIngresos());
    document.getElementById("egresos").innerHTML = formato_Moneda(totalEgresos());

}

const formato_Moneda = (valor) => {
    return valor.toLocaleString('en-US', {style:'currency', currency:"USD", minimumFractionDigits:2});
}

const formatoPorcentaje = (valor) => {
    return valor.toLocaleString("en-US", {style:"percent", minimumFractionDigits:2})
}

const cargarIngresos = () => {
    let ingresosHTML = "";
    for (let ingreso of ingresos){
        ingresosHTML += crearIngresoHTML(ingreso);
    } 
    document.getElementById("lista-ingresos").innerHTML = ingresosHTML;
    loadItemsIngresos();
}

const crearIngresoHTML = (ingreso) => {
    let ingresoHTML = `
    <div class="elemento limpiarEstilos">
    <div class="elemento_descripcion">${ingreso.descripcion}</div>
    <div class="derecha limpiarEstilos">
                <div class="elemento_valor">+ ${formato_Moneda(ingreso.valor)}</div>
                <div class="elemento_eliminar">
                <button class="elemento_eliminar--btn">
                    <ion-icon name="close-circle-outline"
                    onclick='eliminarIngreso(${ingreso.id})'></ion-icon>
                </button>
            </div>
        </div>
    </div>`;

    return ingresoHTML;
}

const eliminarIngreso = (id) => {
    let borrar = ingresos.findIndex(ingreso => ingreso.id === id);
    ingresos.splice(borrar, 1);
    cargarCabecero();
    cargarIngresos();
}

const cargarEgresos = () => {
    let egresosHTML = "";
    for (let egreso of egresos){
        egresosHTML += crearEgresoHTML(egreso);
    }
    document.getElementById("lista-egresos").innerHTML = egresosHTML;
    loadItemsEgresos();
}

const crearEgresoHTML = (egreso) => {
    let egresoHTML = `
    <div class="elemento limpiarEstilos">
                    <div class="elemento_descripcion">${egreso.descripcion}</div>
                    <div class="derecha limpiarEstilos">
                        <div class="elemento_valor">- ${formato_Moneda(egreso.valor)}</div>
                        <div class="elemento_porcentaje">${formatoPorcentaje(egreso.valor/totalEgresos())}</div>
                        <div class="elemento_eliminar">
                            <button class="elemento_eliminar--btn">
                                <ion-icon name="close-circle-outline"
                                onclick='eliminarEgreso(${egreso.id})'></ion-icon>
                            </button>
                        </div>
                    </div>
                </div>
    `;

    return egresoHTML;
}

const eliminarEgreso = (id) => {
    let borrar = egresos.findIndex(egreso => egreso.id === id);
    egresos.splice(borrar, 1);
    cargarCabecero();
    cargarEgresos();
}

const agregarDato = () => {
    let formulario = document.forms['forma'];
    let tipo = formulario['tipo'];
    let descripcion  = formulario['descripcion'];
    let valor = formulario['valor'];

    if (descripcion.value == '' || valor.value == ''){
        Swal.fire({
            title: 'Error!',
            text: 'La descripcion ni el valor moentario pueden estar vacíos',
            icon: 'error',
            confirmButtonText: 'Ok'
            });

        return false;
    }

    if (+valor.value == 0){
        Swal.fire({
            title: 'Error!',
            text: 'El valor monetario no puede ser: 0',
            icon: 'error',
            confirmButtonText: 'Ok'
            });

        return false;
    }

    if (tipo.value === "ingreso"){
        ingresos.push(new Ingreso(descripcion.value, +valor.value));
        cargarIngresos();
    }else if (tipo.value === 'egreso'){
        egresos.push(new Egreso(descripcion.value, +valor.value));
        cargarEgresos();
    }


    descripcion.value = ""
    valor.value = ""

    cargarCabecero();   

}