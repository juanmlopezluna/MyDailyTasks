let arrTasks = new Array();

let num = 1;
let timer;

let size; //SIZE en px
let Rgb, rGb, rgB; //RGB
let lastTaks;

const archCesto = "images/cesto.png";

//Al presionar tecla enter > que sea el SAVE (si esta onfocus la caja de texto)
document.addEventListener("keyup", function(event) 
{
	if (event.code === 'Enter') {
		let focusElem = document.activeElement;
		if (focusElem.className === "intask") 
		{
			saveTask();
		}
	}
});

	inicialiceVarTaks();

	//Fx inicializar var de color y tamaño (tambien Reinicializa)
	function inicialiceVarTaks(){
		//px Inicial task
		size = 50; 

		//color inicial task RGB 178 35 34 	
		Rgb = 178;
		rGb = 35;
		rgB = 34

		lastTaks = false;
	}

	//Recalcular size y rgb (cada nueva tarea)
	function recalcSizeRgb()
	{
		//Modifico size y rGb para los proximos
		if ((size > 15) && (size - 5 > 15))
		{
			size = size - 5;
		}
		else
		{
			size = 15;
		}

		if ((lastTaks) && (rGb > 235 || rGb === 235)) 
		{
			//Entra aca unicamente para el ultimo color de task (gris)
			Rgb = 128;
			rGb = 129;
			rgB = 123;
		} 
		else 
		{
			if (!lastTaks)
			{
				rGb = rGb + 40;
			
				if (rGb > 235 || rGb == 235) 
				{
					lastTaks = true;
				}
			}
		}
	}

	//Fx ocultar cesto
	function hiddenCesto()
	{
		cesto = document.getElementById("cesto");
		cesto.style.visibility = "hidden";
	}

	//Fx limpio textBox y hago foco
	function cleanIntask()
	{
		//Limpio text input y hago foco nuevamente en el textBox
		textBox = document.getElementById("idtask");
		textBox.value = "";    
		textBox.focus(); 
	}

	//Fx visibilizo contenedor de tasks y cesto
	function FirstInicVisible()
	{
			if (arrTasks.length === 1)
			{
				//Visibilizo Contenedor de Tasks y Cesto cuando dan de alta la primera tarea
				let contenedor = document.getElementById("contenedor0");
				let divCesto = document.getElementById("cesto");
				let imgCesto = document.getElementById("idCesto");

				//Contenedor
				contenedor.style.visibility = "visible";

				//Visibilizo el Cesto con Animacion
				//Tamaño
				imgCesto.style.maxWidth = "150%"; //150%
				imgCesto.style.marginTop = "-250px"; //-14
				divCesto.style.visibility = "visible";

				//Animacion
				divCesto.style.animationDuration = "5s";	
				divCesto.style.animationName = "slidein";	
		}

	}

	//Fx "limpia" el label ITSDONE (droppable) 
	function cleanItsDone()
	{
		itsDoneTittle = document.getElementById("idCol2");
		itsDoneTittle.style.color = "green";
	}

	//Fx limpia cesto
	function cleanCesto()
	{
		cesto = document.getElementById("idCesto");
		cesto.src = archCesto;
	}

	//Funcion swal final para cuando resuelve todas las tareas
	function funSucce()
	{		
		Swal.
		fire({
			title:"You have finished all your tasks. Good job!!!",
			icon: 'success',
			
			/*
			background:`
			rgba(0,0,123,0.4)
			url("images/fuegosArtifi.gif")
			no-repeat
 			`
			*/

			/*
			color: white
			height: 260px
			width: 400px
			*/
			
			/*
			backdrop: `
			rgba(0,0,123,0.4)
			url("images/fuegosArtifi.gif")
			no-repeat
 			`
			*/

			}).then(resultado => { 

			//Reinicializo variables para que el color y el tamaño
			inicialiceVarTaks();

			//Oculto Cesto
			hiddenCesto();

			//Limpia el label istDone
			cleanItsDone()

			//cleanIntask
			cleanIntask();

			//Limpia el Tacho/Cesto
			cleanCesto()

		});	
	}

	//Mensaje cuando quiere guardar tarea vacia
	function funEmptytask()
	{
		Swal.
		fire({
			title:"You should type your task before...",
			icon: 'error'
			});
	}

	//Fx mensaje tarea repetida
	function funRepeatTask()
	{
		Swal.
		fire({
			title:"The task has already been registered before.",
			icon: 'warning'
			});
	}

	//Boton Reload page
	function reload()
	{
		location.reload();
	}
	
	//Clic boton SAVE (Dispara la creacion del boton Task)
	function saveTask() 
	{
		//tomo valor de la caja de texto
		const val = document.getElementById("idtask").value;

		//Es vacio?
		if ((val != undefined) && (val != "")) 
		{
			//Verifico que no sea tarea repetida
			const valorEncontrado = arrTasks.filter(item => item == val)
				
			//Si el array es CERO, la tarea es unica
			if (valorEncontrado.length === 0) 
			{
				//Tarea unica
				//Agrego al array el valor
				arrTasks.push(val);

				//funcion para agregar Boton de la task
				addButtonTask(val);
			} 
			else 
			{
				cleanIntask();
				funRepeatTask();
			}

			
		}
		else
		{
			//Tarea vacia
			funEmptytask();
		}
	}

	//Crea boton Task - Agregar TASK
	function addButtonTask(val) 
	{

		//Creo elemento y seteo atributos
		var task = document.createElement('button');
		task.id = `taskId`;
		task.className = "buttonTask";
		task.innerHTML =`${val}`;
		task.setAttribute('style',`font-size:${size}px`);
		task.style.backgroundColor = `rgb(${Rgb} ${rGb} ${rgB})`; 	//178 35 34 (color inicial)

		/* No va mas el Onclick, porque ahora se moverian los elementos
			task.setAttribute("onclick", "addTaskDone(this)");	
		*/
		
		//efecto hover
		task.addEventListener("mouseover", (event) => {
		// highlight the mouseenter target
			event.target.style.color = "darkorange";})
			
		task.addEventListener("mouseout", (event) => {
		// highlight the mouseenter target
			event.target.style.color = "";})
		
		//Aca le podria agregar el Listener del mousedown para que dispare toda esa logica
		task.addEventListener("mousedown", fxDragDrop)
			
		//Agregando el boton al contenedor (hijo de quien corresponde)
		let hijo = document.getElementById("TasksList");
		hijo.appendChild(task);


			//Recalculo size y rGb para los proximos
			recalcSizeRgb();
		
			//Limpio text input y hago foco nuevamente en el textBox
			cleanIntask();

			//Visibilizo contendor y tacho (la primera vez)
			FirstInicVisible();
	}
	
	//Crea Label Done - TASK DONE (Finalizar la tarea) (elementoCliqueado es el ".this")
	function addTaskDone(elementoCliqueado, event, shiftX, shiftY)
	{
			Swal
			.fire({
				title: "¿Do you want to finish the task?",
				icon: 'warning',
				showDenyButton: true,
				confirmButtonText: "YES",
				denyButtonText: `Don't save`,
			})
			.then(resultado => 
			{
				if (resultado.value) 
				{
					//Bbtener la fecha y la hora para agregar info
					var today = new Date();
					var now = today.toLocaleString();

					//Creo elemento y seteo atributos
					var taskDone = document.createElement('label');
					var labelHour  = document.createElement('label');

					taskDone.id = "taskId";	
					taskDone.className = "labelDone";

					labelHour.id = "idLabelHour";
					labelHour.className = "labelHour";
					
					taskDone.innerHTML =`#${num} ${elementoCliqueado.textContent}`;
					
					labelHour.innerHTML += `${now}`
					labelHour.innerHTML += "</br>"

					//incremento variable >numero de task<
					num++;	

					//Agregando el label
					var contenedor2 = document.getElementById('idCol2');
					contenedor2.appendChild(taskDone);
					contenedor2.appendChild(labelHour);

					//saca del DOM y saca del array la Task
					resolverTask(elementoCliqueado);
					
				} 
				else
				{				
					//Vuelve el boton a su lugar original
					moveToFirstPos(ball, shiftX, shiftY, event);
				}
			});		

			//Limpia el label istDone
			cleanItsDone()
		}

	//Fx para sacar task de pantalla y array (por finalizacion o eliminacion)
	function resolverTask(elementoCliqueado) 
	{
		//Eliminar boton original del DOM
		elementoCliqueado.remove();

		//Elimino el elemento del array
		const resultado = arrTasks.filter(item => item != elementoCliqueado.textContent)
		arrTasks = resultado;
			
		//Si el array queda vacio, se terminaron todas las tasks
		if (arrTasks == "") 
		{
			//Mensaje de exito
			funSucce();
		}	

	}

	function moveToFirstPos(ball, shiftX, shiftY, event)
	{
		//Vuelve el boton a su lugar original
		//Se resta el shift
		let x = event.pageX - shiftX;
		let y = event.pageY - shiftY;

		moveAt(x, y);
		
		function moveAt(pageX, pageY) 
		{
		ball.style.left = pageX + 'px';
		ball.style.top = pageY + 'px';
		}
	}