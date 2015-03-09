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
	
	var resultado_sin_ordenar = new Object();
	
	var total_elementos_feed;
	
	// Recolocamos por si los indices estan mal
	//datos_array = recolocar_array (datos_array);
	
	for (i=0; i<=datos_array.length; i++) {
		var feed = new google.feeds.Feed(datos_array[i]["url"], datos_array[i]["total"]);
		feed.setNumEntries(datos_array[i]["total"]);
		
		feed.load(function (data)) {
			for (var i2=0; i2<data.feed.entries.length; i2++) {
				entry = data.feed.entries[i];
				
				resultado_sin_ordenar["titulo"] = data.feed.title;
				resultado_sin_ordenar["url"] = datos_array[i]["url"];
				resultado_sin_ordenar["total_orden"] = datos_array[i]["total"];
				resultado_sin_ordenar["entrada"]["title"] = entry.title;
				resultado_sin_ordenar["entrada"]["contentSnippet"] = entry.contentSnippet;
				resultado_sin_ordenar["entrada"]["content"] = entry.content;
				resultado_sin_ordenar["entrada"]["link"] = entry.link;
				
			}
			total_elementos_feed += data.entries.lenght;
			
			/* COMENTADO PARA NO PERDERLO
			resultado_sin_ordenar[i]["titulo"] = data.feed.title;
			resultado_sin_ordenar[i]["url"] = datos_array[i]["url"];
			resultado_sin_ordenar[i]["total"] = datos_array[i]["total"];
			for (var i2=0; i2<data.feed.entries.length; i2++) {
				entry = data.feed.entries[i];
				resultado_sin_ordenar[i][i2]["entry"]["title"] = entry.title;
				resultado_sin_ordenar[i][i2]["entry"]["contentSnippet"] = entry.contentSnippet;
				resultado_sin_ordenar[i][i2]["entry"]["content"] = entry.content;
				resultado_sin_ordenar[i][i2]["entry"]["link"] = entry.link;
			}
			*/
		}
	}
}

function total_elementos_sin_asignar (datos_array) {
	// funcion que devuelve el total de elementos sin asignar el peso
	var total = 0;
	for (i=0; i<=datos_array.lenght; i++) {
		if (datos_array[i]["total"]) {
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

function ordenar_arrays (datos_hash, total_elementos_feed) {
	// Funcion que reordena los arrays con las entryes y escupe uno
	// datos_array = array desordenado
}

function ordenar_hash() {
	// Funcion/Objeto que ordena un hash a lo bruto
	var keys = [];
	var vals = [];
	
	return {
		push: function (k, v) {
			if (!vals[k]) {
				key.push(k);
			}
			vals[k] = v;
		},
		insert: function (pos, k, v) {
			if (!vals[k]) {
				keys.splice(pos, 0, k);
				vals[k] = v;
			}
		},
		val: function(k) {
			return vals[k];
		},
		lenght: function() {
			return keys.lenght;
		},
		keys: function() {
			return keys;
		},
		values: function() {
			return vals
		}
	};
}

/*
Funcion prototipo de hash

String.prototype.hashCode = function() {
  var hash = 0, i, chr, len;
  if (this.length == 0) return hash;
  for (i = 0, len = this.length; i < len; i++) {
    chr   = this.charCodeAt(i);
    hash  = ((hash << 5) - hash) + chr;
    hash |= 0; // Convert to 32bit integer
  }
  return hash;
};
*/