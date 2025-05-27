<?php
include '../controllers/database.php';
class Store
{
    private static $instance = null;
    private $db;
    private $conn;

    private function __construct()
    {
        // Initialize the database connection
        $this->db = new Database();
        $this->conn = $this->db->connect();
    }

    public static function getInstance()
    {
        if (self::$instance === null) {
            self::$instance = new Store();
        }
        return self::$instance;
    }

    public function getConnection()
    {
        return $this->conn;
    }

    public function insert($table, $data)
    {
        $columns = implode(", ", array_keys($data));
        $placeholders = ":" . implode(", :", array_keys($data));

        $sql = "INSERT INTO $table ($columns) VALUES ($placeholders)";
        $stmt = $this->conn->prepare($sql);

        foreach ($data as $key => $value) {
            $stmt->bindValue(":$key", $value);
        }

        return $stmt->execute();
    }

    public function update($table, $data, $where)
    {
        $set = "";
        $rawFields = [];

        // Detect raw SQL values by wrapping them in ["RAW" => value]
        foreach ($data as $key => $value) {
            if (is_array($value) && isset($value['RAW'])) {
                $set .= "$key = {$value['RAW']}, ";
                $rawFields[$key] = true;
            } else {
                $set .= "$key = :$key, ";
            }
        }

        $set = rtrim($set, ", ");
        $sql = "UPDATE $table SET $set WHERE $where";
        $stmt = $this->conn->prepare($sql);

        // Bind only non-raw values
        foreach ($data as $key => $value) {
            if (!isset($rawFields[$key])) {
                $stmt->bindValue(":$key", $value);
            }
        }

        return $stmt->execute();
    }


    public function fetchData(string $table, $where = null)
    {
        $sql = "SELECT * FROM $table";
        if ($where) {
            $sql .= " WHERE $where";
        }
        $stmt = $this->conn->prepare($sql);
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }



    public function find($table, $column, $value)
    {
        if (!preg_match('/^[a-zA-Z0-9_]+$/', $column)) {
            throw new Exception("Invalid column name.");
        }

        if (!preg_match('/^[a-zA-Z0-9_]+$/', $table)) {
            throw new Exception("Invalid table name.");
        }

        $sql = "SELECT * FROM $table WHERE $column = :value";
        $stmt = $this->conn->prepare($sql);
        $stmt->bindParam(':value', $value);
        $stmt->execute();
        // return $stmt->fetch(PDO::FETCH_ASSOC);
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }
}
