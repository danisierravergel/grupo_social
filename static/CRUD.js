/* 
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Other/javascript.js to edit this template
 @Creado: 12/09/2022 11:58:28 p. m.
 @Autora: Daniela Sierra Vergel 
 */

class crud{
    create(tm, cl){
        var formData = new FormData();
        formData.append("key", 'C1');
        formData.append("celular", celular);
        formData.append("tema", tm);
        formData.append("columna", cl);
        //formData.append("columna", columna.toString());
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                console.log('this.responseText',this.responseText);
            }
        };
        xhttp.open("POST", 'https://danielasierra.com.co/gropo_social/conexion.php', true);
        xhttp.send(formData);
    }
    
    view(){
        var formData = new FormData();
        formData.append("key", 'Q1');
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                var fjson = JSON.parse(this.responseText);
                var dat = [];
                for(var i in fjson) dat.push(JSON.parse(fjson[i]));
                cruds.llenar_tabla(fjson);
                
            }
        };
        xhttp.open("POST", 'https://danielasierra.com.co/gropo_social/conexion.php', true);
        xhttp.send(formData);
    }
    
    llenar_tabla(dat){
        var htm = '';
        var tbo = document.getElementById('tbo');
        var htm = '';
        for (var i in dat) {
            htm += '<tr>';
            var subdatos = JSON.parse(dat[i]);
            console.log('subdatos', subdatos);
            htm += '<td>' + subdatos['fecha'] + '</td>';
            htm += '<td>' + subdatos['celular'] + '</td>';
            htm += '<td>' + subdatos['tema'] + '</td>';
            htm += '<td>' + subdatos['columna'] + '</td>';

                
            htm += '</tr>';
        }
        tbo.innerHTML = htm;
        $('#all_table').DataTable();
    }
}
var cruds = new crud();




var tableToExcel = (function() {
  var uri = 'data:application/vnd.ms-excel;base64,'
    , template = '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--></head><body><table>{table}</table></body></html>'
    , base64 = function(s) { return window.btoa(unescape(encodeURIComponent(s))) }
    , format = function(s, c) { return s.replace(/{(\w+)}/g, function(m, p) { return c[p]; }) }
  return function(table, name) {
    if (!table.nodeType) table = document.getElementById(table)
    var ctx = {worksheet: name || 'Worksheet', table: table.innerHTML}
    window.location.href = uri + base64(format(template, ctx))
  }
})()
