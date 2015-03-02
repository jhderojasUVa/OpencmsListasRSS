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
			texto+="<div class=\"rss_respuesta\"><strong><a class=\"popupiframe\" href=\""+entry.link+"\">"+entry.title+"</a></strong> <a href=\""+entry.link+"\" target=\"_blank\"><img src=\"/system/modules/es.uva.web.portal.opencms.v85.tipos.lectorrss/resources/img/enlace_4.png\" align=\"absmiddle\" alt=\""+entry.contentSnippet+"\"></a> <a class=\"ocultar_"+rand+"_"+i+" glyphicon\" href=\"javascript:mostrar_ocultar("+i+","+rand+");\">&#43;</a>"
			if (entry.contentSnippet!="" && entry.content!="") {
				texto+="<br>"+entry.contentSnippet+"<br>"
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