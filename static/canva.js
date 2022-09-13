/* 
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Other/javascript.js to edit this template
 @Creado: 12/09/2022 3:42:11 p. m.
 @Autora: Daniela Sierra Vergel 
 */

class canvasss {
    
    init1(fjson) {
        var x_y = [];
        console.log('fjson',fjson);
        x_y.push({label: 'Media', y: fjson.media});
        x_y.push({label: 'Moda', y: fjson.moda});
        x_y.push({label: 'Mediana', y: fjson.mediana});
        x_y.push({label: 'Desviación estándar', y: fjson.st_dev});
        x_y.push({label: 'Rango intercuartil', y: fjson.iqr});
        x_y.push({label: 'Máximo', y: fjson.maxi});
        x_y.push({label: 'Mínimo', y: fjson.mini});


        canvas1.view1(fjson.name, x_y);
    }

    view1(name, x_y) {
        var chart = new CanvasJS.Chart("chartContainer", {
            animationEnabled: true,
            theme: "light2",
            title: {
                text: name
            },
            axisX: {title: "Datos"},
            axisY: {title: name ,includeZero: true, yValueFormatString: "#,### "+name},
            data: [{
                    type: "column",
                    toolTipContent: "<b> {label}:</b> {y}",
                    dataPoints: x_y
                }]
        });
        chart.render();

    }

    
}
var canvas1 = new canvasss();
    