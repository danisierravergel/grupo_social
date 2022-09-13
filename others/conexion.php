<?php
//header('Content-Type: application/json;charset=UTF-8');
header("Content-Type: text/html;charset=utf-8");
class conexion {

    public function run() {
        $res = array();
        $fun = $_POST['key'];
        switch ($fun) {
            case 'C1':
                $res = $this->create_seach();
                break;
            case 'Q1':
                $res = $this->view_seach();
                break;
        }

        echo json_encode($res); die();
    }

    /* Hacer conexion con la db */

    private function conectar() {
        $mysqli = new mysqli("212.1.211.42", "u589874509_grupo_social", "9Hq~jE2;", "u589874509_grupo_social");

        // Check connection
        if ($mysqli->connect_errno) {
            echo "Failed to connect to MySQL: " . $mysqli->connect_error;
            exit();
        }
        return $mysqli;
    }

    /* Hacer cierre de conexion con la db */

    private function close_conexion($mysqli) {
        $mysqli->close();
    }

    /* Crear usuario en la db */

    private function create_seach() {
        $mysqli = $this->conectar();
        $row = array();
        
            $cel = $_POST['celular'];
            $tema = $_POST['tema'];
            $columna = $_POST['columna'];
            $sql = "INSERT INTO consultas (celular,tema,columna) values ($cel, '$tema', '$columna')";
            $result = $mysqli->query($sql);
            if($result) $row = $result;
                
        $this->close_conexion($mysqli);
        return $row;
    }

    /* busacar las formas creadas en la db */

    private function view_seach() {
        $mysqli = $this->conectar();
        $row = array();
        $sql = 'SELECT * FROM consultas';
        $result = $mysqli->query($sql);
        if ($result->num_rows > 0) {//Si hay resultados…
            /* obtener el array de objetos */
            while ($fila = $result->fetch_array(MYSQLI_ASSOC)) {
                //$row[] = ($fila);
                $row[] = json_encode($fila);
            }
        }
        $this->close_conexion($mysqli);
        return $row;
    }

}

$con = new conexion();
$con->run();