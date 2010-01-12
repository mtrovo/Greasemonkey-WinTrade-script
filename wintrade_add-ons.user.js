// ==UserScript==
// @name           WinTrade Add-ons
// @namespace      com.github.mtrovo
// @include        http://www.wintrade.com.br/site/MinhaConta/default.aspx
// @require        http://code.jquery.com/jquery-latest.min.js
// ==/UserScript==

// This will be executed onLoad
// Append some text to the element with id #someText using the jQuery library.

function PtToEngNumber(str){
	return parseFloat(str.replace('.','').replace(',','.'));
}

function populatePositionTable(data, textStatus){
	var table = $(data).find("#panelmid > div > div > div > div > .box_table");
	table = $('<div>').append( table.eq(0).clone() ).html();
	alert(table);
	var str = "<div style='background-color: rgb(239, 241, 240);' class=''>" +
                    "<div style='margin-right: 7px; margin-left: 7px;'>" + table +
                    "</div></div>";
	$('#panelmid > div > .divisa_dashed').after(str);
}

function genPositionTable(){
	var url = "https://www.wintrade.com.br/site/MinhaConta/consolidado.aspx";
	$.get(url, '', populatePositionTable, 'html');
}

(function() {
    var c = PtToEngNumber($("#ctl00_ContentMid_lblCaixa").html());
	var ac = PtToEngNumber($("#ctl00_ContentMid_lblAcoes").html());
	var op = PtToEngNumber($("#ctl00_ContentMid_lblOpcoes").html());
	var ttal = (c + ac + op).toFixed(2).replace('.', ',');
	
	$("#panelmid > div > div > .box_grafico > .box_grafico_content > div > table > tbody")
		.append("<tr><td></td><td>Total</td><td>R$ " + ttal + "</td></tr>");
	
	
	var iframe = $("<iframe src='https://www.wintrade.com.br/Plataform/flashpages/winner_250x212.aspx?symbol=IBOV'></iframe>")
		.css({height: '170px', width: '200px', "overflow-y": 'hidden', 'border': 'none'});
	
	var aba = $("<div>CONSULTA</div>")
		.css({"float": 'right', margin: '5px'});
	
	var div = $("<div></div>")
		.css({	position: 'absolute', 
				height: '170px', 
				width: '200px',
				"font-family": 'sans-serif'})
		.append(iframe)
		.append(aba);
	$("body").append(div);
	
	genPositionTable();
}());