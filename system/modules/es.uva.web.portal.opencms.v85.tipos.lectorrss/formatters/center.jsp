<%@page buffer="none" session="false" taglibs="c,cms,fn" %>

<cms:formatter var="content" val="value" rdfa="rdfa">
<c:set var="rand">${cms:vfs(pageContext).resource[cms.element.sitePath].structureId}</c:set>
<c:if test="${cms.element.settings.around==false}">
<div class="lectorrss" style="width:${cms.element.settings.width}px; margin-bottom: 5px;">
</c:if>
<c:if test="${cms.element.settings.around==true}">
<div class="lectorrss" style="float: left; width:${cms.element.settings.width}px; margin-right: 10px; margin-left: 10px; margin-bottom: 10px;">
</c:if>
	<script type="text/javascript">google.load("feeds", "1");</script>
	<%--<c:forEach var="ElementoRSS" items="value.RSS">
	<c:if test="${ElementoRSS.value.Numero==''}">
		<c:set var="total" value="5" />
	</c:if>
	<c:if test="${ElementoRSS.value.Numero!=''}">
		<c:set var="total" value="${value.Numero}" />
	</c:if>
	<c:if test="${value.URL!=''}">
		<script>
		$(document).ready(function () {
			lee_rss("${ElementoRSS.value.URL}",${total},"${rand}");
		});
		</script>
		<div class="rss-respuesta-${rand} rss-respuesta">
		</div>
	</c:if>
	
	</c:forEach>
	--%>
	<%-- Montamos los array de JS --%>
	<script>
		var rss = [
		<c:forEach var="ElementoRSS" items="value.RSS">
			url: '${ElementoRSS.value.URL}',
			elementos: ${ElementoRSS.value.Numero},
			porciento: ${ElementoRSS.value.PorCiento}
		</c:forEach>
		];
		lee_rss_array(rss, "${rand}");
	</script>
	<div class="rss-respuesta-${rand} rss-respuesta"></div>
</div>
</cms:formatter>