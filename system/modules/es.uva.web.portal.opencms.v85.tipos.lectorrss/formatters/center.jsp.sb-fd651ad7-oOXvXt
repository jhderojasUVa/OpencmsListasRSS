<%@page buffer="none" session="false" taglibs="c,cms,fn" %>
<cms:formatter var="content" val="value" rdfa="rdfa">
<c:if test="${value.Numero==''}">
	<c:set var="total" value="5" />
</c:if>
<c:if test="${value.Numero!=''}">
	<c:set var="total" value="${value.Numero}" />
</c:if>
<c:set var="rand">${cms:vfs(pageContext).resource[cms.element.sitePath].structureId}</c:set>
<c:if test="${cms.element.settings.around==false}">
<div class="lectorrss" style="width:${cms.element.settings.width}px;">
</c:if>
<c:if test="${cms.element.settings.around==true}">
<div class="lectorrss" style="float: left; width:${cms.element.settings.width}px; margin-right: 25px; margin-bottom: 20px;">
</c:if>
	<script type="text/javascript">google.load("feeds", "1");</script>
	<c:if test="${value.URL!=''}">
		<script>
		$(document).ready(function () {
			lee_rss("${value.URL}",${total},"${rand}");
		});
		</script>
		<div class="rss-respuesta-${rand} rss-respuesta">
		</div>
	</c:if>
	<c:if test="${value.URL==''}">
		<h3>Elemento RSS - VACIO</h3>
		<p>Edite el elemento para a&ntilde;adir un feed de RSS.</p>
	</c:if>
</div>
</cms:formatter>