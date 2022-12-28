let currentDroppable = null;

const archCestoVioleta = "images/cestoOscuro.png";

function fxDragDrop(event) 
{
ball = event.path[0];

let shiftX = event.clientX - ball.getBoundingClientRect().left;
let shiftY = event.clientY - ball.getBoundingClientRect().top;

ball.style.position = 'absolute';
ball.style.zIndex = 1000;

var hijo = document.getElementById("TasksList");
hijo.appendChild(ball);

moveAt(event.pageX, event.pageY);

	function moveAt(pageX, pageY) 
	{
	ball.style.left = pageX - shiftX + 'px';
	ball.style.top = pageY - shiftY + 'px';
	}

	function onMouseMove(event)
	{
		moveAt(event.pageX, event.pageY);
		ball.hidden = true;

		let elemBelow = document.elementFromPoint(event.clientX, event.clientY);
		ball.hidden = false;
		
		if (!elemBelow) return;

		let droppableBelow = elemBelow.closest('.divCol2');
		let droppableBelowCesto = elemBelow.closest('.imgCesto');
		let droppableBelowToDo =  elemBelow.closest('.divCol1');

		let cesto = document.getElementById("idCesto");
		let istdone = document.getElementById("idCol2");
		let toDo = document.getElementById("idCol1");

		//Entra al TODO
		if ((currentDroppable != droppableBelowToDo) 
					&& (currentDroppable != cesto) 
					&& (currentDroppable != istdone))
		{
			//Permito movimiento
			if (currentDroppable) 
			{ // null si no estábamos sobre un receptor (droppable) antes de este evento
				leaveDroppable(currentDroppable);
			}

			currentDroppable = droppableBelowToDo;

			if (currentDroppable) 
			{ // null si no estamos sobre un receptor ahora // (pudo haber dejado el receptor recién)
				enterDroppable(currentDroppable);
			}
		}

		//ITS DONE > Entra SI  >>>
			/*
				null    !=  null	>>
				null	!= itsDone	>> entra

				itsDone != null		>> entra
				istDOne != itsDone	>>

				Cesto   != null		>> entra >> no quiero que entre
				Cesto   != istDone	>> entra >> no quiero que entre

				toDo	!= null		>> entra >> no quiero que entre
				toDo	!= null		>> entra >> no quiero que entre
			*/  

		//Entra al ITSDONE
		if ((currentDroppable != droppableBelow) && (currentDroppable != cesto) && (currentDroppable != toDo))
		{
			if (currentDroppable) 
			{ // null si no estábamos sobre un receptor (droppable) antes de este evento
				leaveDroppable(currentDroppable);
			}

			currentDroppable = droppableBelow;

			if (currentDroppable) 
			{ // null si no estamos sobre un receptor ahora // (pudo haber dejado el receptor recién)
				enterDroppable(currentDroppable);
			}
		}
		
		//CESTO > Entra SI
			/*
				null    != null		> no entra
				null	!= Cesto	> entra

				itsDone != null		> entra > no quiero que entre
				istDOne != Cesto	> entra > no quiero que entre

				Cesto   != null		> entra 
				Cesto   != Cesto	> no entra

				toDo	!= null		>> entra >> no quiero que entre
				toDo	!= null		>> entra >> no quiero que entre
			*/ 
		
		if ((currentDroppable != droppableBelowCesto) && (currentDroppable != istdone) && (currentDroppable != toDo))
		{
				// null > Si no estábamos sobre un receptor (droppable) antes de este evento no entra
				if (currentDroppable) 
				{
					leaveDroppable(currentDroppable);
				}

				//Asigno que el current es donde estaba (Sobre el cesto)
				currentDroppable = droppableBelowCesto;

				if (currentDroppable) 
				{ 
					// null si no estamos sobre un receptor ahora // (pudo haber dejado el receptor recién)
					enterDroppable(currentDroppable);
				}
		}	
	}

document.addEventListener('mousemove', onMouseMove);

ball.onmouseup = function() //no detecta el mouseup cuando el cursor esta fuera de la pagina
{
	//console.log("SOLTO EL BOTON CLICK");

	//Si solto el boton en..
	if (currentDroppable != null)
	{  
		if (currentDroppable.id === "idCol1") // (toDo)
		{
			//no hago nada
		} 

		if (currentDroppable.id === "idCol2") //itsdone
		{
			addTaskDone(ball,event,shiftX,shiftY);	//finaliza la tarea
		} 

		if (currentDroppable.id === "idCesto") //cesto
		{
			removeTask(ball,event, shiftX, shiftY);	//elimina la tarea
		}
	} 
	else
	{
		//Movimiento no permitido
		//console.log("MOVIMIENTO NO PERMITIDO");
		incorrectMove();
		moveToFirstPos(ball, shiftX, shiftY, event)

	}

	document.removeEventListener('mousemove', onMouseMove);
	ball.onmouseup = null;
};

	ball.ondragstart = function(){
	return false;}

	/*
	let miBodicito = document.getElementById("myBody");
	miBodicito.onmouseover = function()
	{
		console.log("miBodicito OVER.. " + event);
	}
	
	miBodicito.onmouseout = function()
	{
		console.log("miBodicito OUT.. " + event);

	}
	*/

}

//Si entra en zona detectable
function enterDroppable(elem) 
{
	/* Si es el itsDone */
	if (elem.id === "idCol2") 
	{elem.style.color = "rgb(38 242 21)";} //Verde manzana

	//Si es el Cesto
	if (elem.id === "idCesto") 
	{elem.src = archCestoVioleta;}	//Tacho violeta
}

//Si sale de zona detectable
function leaveDroppable(elem) 
{
	/* Si es el itsDone */
	if (elem.id === "idCol2") 
	{elem.style.color = "green";} //Verde comun

	//Si es el Cesto
	if (elem.id === "idCesto") 
	{elem.src = archCesto;}	//Tacho blanco
}

function removeTask(ball,event, shiftX, shiftY)
{
    Swal
	.fire({
		title: "¿Do you want to REMOVE the task?",
		icon: 'warning',
		showDenyButton: true,
		confirmButtonText: "YES",
		denyButtonText: `NO`,
	})
	.then(resultado => {
		if (resultado.value) 
		{
			//saca del DOM y saca del array la Task
			resolverTask(ball);
		} 
		else
		{	//Vuelve el boton a su lugar original
			moveToFirstPos(ball, shiftX, shiftY, event);
		}
	});	

	cleanCesto();
}

function incorrectMove()
{
	Swal.
		fire({
			title:"Task cannot be moved here",
			icon: 'warning'
			});
}

//De aca saque el Movimiento (Con ejemplo de la pelota de futbol)
//https://es.javascript.info/mouse-drag-and-drop

	