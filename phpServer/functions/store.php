<?php
include '../controllers/database.php';
class Store {
    private static $instance = null;
    private $db;
    private $conn;

    private function __construct() {
        // Initialize the database connection
        $this->db = new Database();
        $this->conn = $this->db->connect();
    }

    public static function getInstance() {
        if (self::$instance === null) {
            self::$instance = new Store();
        }
        return self::$instance;
    }

    // Optional: expose connection
    public function getConnection() {
        return $this->conn;
    }

    public function insert($table, $data) {
        // Get keys and values
        $columns = implode(", ", array_keys($data));
        $placeholders = ":" . implode(", :", array_keys($data));

        // SQL query
        $sql = "INSERT INTO $table ($columns) VALUES ($placeholders)";
        $stmt = $this->conn->prepare($sql);

        // Bind values
        foreach ($data as $key => $value) {
            $stmt->bindValue(":$key", $value);
        }

        // Execute and return status
        return $stmt->execute();
    }

    public function fetchData($table, $where = null) {
        $sql = "SELECT * FROM $table";
        if ($where) {
            $sql .= " WHERE $where";
        }
        $stmt = $this->conn->prepare($sql);
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }
}

