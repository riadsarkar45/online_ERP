<?php

class Database {
    private $host = 'localhost';
    private $dbname = 'garmentsdata';
    private $username = 'root';
    private $password = '';
    private $pdo;

    public function connect() {
        try {
            // Create PDO connection
            $this->pdo = new PDO("mysql:host={$this->host};dbname={$this->dbname}", $this->username, $this->password);
            
            // Set the PDO error mode to exception
            $this->pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

            // Return the connection
            return $this->pdo;

        } catch (PDOException $e) {
            // Catch and display any connection errors
            echo "Connection failed: " . $e->getMessage();
            die();
        }
    }
}
