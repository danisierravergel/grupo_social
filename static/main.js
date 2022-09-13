/* 
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Other/javascript.js to edit this template
 @Creado: 12/09/2022 1:05:40 a. m.
 @Autora: Daniela Sierra Vergel 
 */

var datos_temas;
var cabezotes;
class todos_datos {
    listar() {
        var sel = document.getElementById('sel_temas');
        sel.innerHTML = '<option value="0"></option>';
        for (var i in list_json)
            sel.innerHTML += '<option value="' + i + '">' + list_json[i] + '</option>';
        document.getElementById('cont_temas').style.display = "block";
    }

    selecccion() {
        var sel = document.getElementById("sel_temas");
        if (sel && sel.value) {
            document.getElementById('the').innerHTML = '';
            document.getElementById('tbo').innerHTML = '';
            var formData = new FormData();
            formData.append("$limit", "20");
            var xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function () {
                if (this.readyState == 4 && this.status == 200) {
                    var fjson = JSON.parse(this.responseText);

                    if (fjson[0]) {
                        all_date.tabla(fjson);
                        var cab = [];
                        var tip = [];
                        for (var i in fjson[0]) {
                            cab.push(i);
                            if (!isNaN(fjson[0][i]))
                                tip.push(i);
                        }
                        all_date.cabezotes(cab, tip);
                        
                    }
                }
            };
            xhttp.open("GET", 'https://www.datos.gov.co/resource/' + sel.value + '.json', true);
            xhttp.send(formData);
        }
    }

    cabezotes(cab, tip) {
        cabezotes = cab;
        var the = document.getElementById('the');
        var htm = '<tr>';
        for (var i in cab) {
            if (tip.includes(cab[i]))
                htm += '<th class="filtrar">' + cab[i] + '</th>';
            else
                htm += '<th>' + cab[i] + '</th>';
        }
        htm += '</tr>';
        the.innerHTML = htm;
        all_date.sel_columna(tip);
    }

    tabla(datos) {
        datos_temas = datos;
        var tbo = document.getElementById('tbo');
        var htm = '';
        for (var i in datos) {
            htm += '<tr>';
            var subdatos = datos[i];
            for (var j in subdatos)
                htm += '<td>' + subdatos[j] + '</td>';
            htm += '</tr>';
        }
        tbo.innerHTML = htm;
    }

    sel_columna(tipos) {

        var sel = document.getElementById('sel_col');
        sel.innerHTML = '<option value="0"></option>';
        for (var i in tipos)
            sel.innerHTML += '<option value="' + tipos[i] + '">' + tipos[i] + '</option>';
        document.getElementById('cont_columna').style.display = "block";
    }

    check_columna() {
        var sel = document.getElementById("sel_col");
        if (sel && sel.value) {
            var columna = [];
            for (var i in datos_temas) {
                var subdatos = datos_temas[i];
                for (var j in subdatos) {
                    if (j == sel.value)
                        columna.push(parseFloat(subdatos[j]));
                }
            }
            all_date.calcular(columna, sel.value);
            var tm =  document.getElementById("sel_temas").value;
            cruds.create( tm, sel.value);
        }
    }

    calcular(columna, name) {
        var formData = new FormData();
        formData.append("columna", columna.toString());
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                var fjson = JSON.parse(this.responseText);
                fjson.name = name;
                fjson.columnas = columna;
                canvas1.init1(fjson);
            }
        };
        xhttp.open("POST", window.location.origin + '/calcular', true);
        xhttp.send(formData);
    }


}

var all_date = new todos_datos();


