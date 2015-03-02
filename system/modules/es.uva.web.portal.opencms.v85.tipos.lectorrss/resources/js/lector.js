// Javascript

function mostrar_ocultar(i, rand) {
	// i = identificador del elemento
	
	// Toglemos el mostrar o no
	$(".texto_completo_"+rand+"_"+i).toggle("slow");
	
	// Cambiamos el icono del + o el -
	if ($(".ocultar_"+rand+"_"+i).html()=="+"){
		$(".ocultar_"+rand+"_"+i).html("&#8212;");
	} else {
		$(".ocultar_"+rand+"_"+i).html("&#43;");
	}
}

function lee_rss(url, total, rand) {
	// url = url del feed
	// total = numero de elementos
	
	// Creamos el elemento del feed con el objeto del feed
	var feed = new google.feeds.Feed(url, total);
	
	// Le inyectamos los totales
	feed.setNumEntries(total);
	var texto = "";
	
	// Cargamos el feed
	feed.load(function (data) {
		
		// Añadimos el titulo del feed
		texto = "<h2>"+data.feed.title+"</h2>";
		texto += "<div class=\"caja_rss_respuestas\">";
		// Recorremos
		for (var i=0; i< data.feed.entries.length; i++) {
			var entry = data.feed.entries[i];
			// Montamos los divs
			texto+="<div class=\"rss_respuesta\"><strong><a class=\"popupiframe\" href=\""+entry.link+"\">"+entry.title+"</a></strong> <a href=\""+entry.link+"\" target=\"_blank\"><img src=\"/system/modules/es.uva.web.portal.opencms.v85.tipos.lectorrss/resources/img/enlace_4.png\" align=\"absmiddle\" alt=\""+entry.contentSnippet+"\"></a>";
			if (entry.contentSnippet!="" && entry.content!="") {
				texto+=" <a class=\"ocultar_"+rand+"_"+i+" glyphicon\" href=\"javascript:mostrar_ocultar("+i+",'"+rand+"');\">&#43;</a>";
				texto+="<br>"+entry.contentSnippet+"<br>";
				texto+="<div class=\"texto_completo_"+rand+"_"+i+"\">"+entry.content+"</div>";
			}
			texto +="</div>";
			$(".popupiframe").colorbox({iframe:true, width:"80%", height:"80%"});
		}
		texto += "</div>"
		// Lo pintamos
		// Atencion, cuidado si hay muchos, hay que echar un ojo a esto
		$(".rss-respuesta-"+rand).html(texto);
		// Escondemos los textos
		for (var i=0; i< data.feed.entries.length; i++) {
			$(".texto_completo_"+rand+"_"+i).hide();
		}
	});
	
	// Como hemos creado contenido nuevo, lo llamamos para que el JS se de cuenta
	//$(".iframe").colorbox({iframe:true, width:"80%", height:"80%"});
}

function lee_rss_array(datos_array, rand) {
	// datos_array = datos del array formato [url, elementos, peso]
	// rand = identificador del div
	
	for (i=0; i<=datos_array.length; i++) {
		var feed = new google.feeds.Feed(datos_array[i]["url"], datos_array[i]["total"]);
		feed.setNumEntries(datos_array[i]["total"]);
		
		feed.load(function (data)) {
		
		}
	}
}

function total_elementos_sin_asignar (datos_array) {
	// funcion que devuelve el total de elementos sin asignar el peso
	var total = 0;
	for (i=0; i<=datos_array.lenght; i++) {
		if (datos_arrau[i]["total"]) {
			total ++;
		}
	}
	
	return datos_array.lenght-total;
}

function peso_elementos_asignados (datos_array) {
	// Funcion que devuelve el peso total de los elementos con peso asignado
	var total = 0;
	for (i=0; i<=datos_array.lenght; i++) {
		if (datos_array[i]["total"]) {
			total +=datos_array[i]["total"];
		}
	}
	
	return total;
}

function peso_elementos_sin_asignar (datos_array) {
	// Funcion que devuelve el peso de los elementos que no han sido ajustados
	var total_sin_asignar = total_elementos_sin_asignar(datos_array);
	var total_asignados = datos_array.lenght;
	var total_peso_asignados = peso_elementos_asignados (datos_array);
	
	return (100-total_peso_asignados)/(datos_array.lenght)
}

function recolocar_array (datos_array) {
	// Funcion que recoloca los tantos por ciento cuando estan mal
	// Comprobamos si esta bien o mal
	if (peso_elementos_asignados (datos_array)!=100) {
		var total_definitivo = 100;
		var total_viejo = peso_elementos_asignados (datos_array);
		
		// Les recorremos y les reasignamos
		for (i=0; i<=datos_array.lenght; i++) {
			if (datos_array[i]["total"]) {
				datos_array[i]["total"] = (total_viejo)/(datos_array[i]["total"]*100);
			}
		}
	}
	
	return datos_array;
}