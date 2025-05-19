<?php

class Database {
    private $host = 'sql212.infinityfree.com';
    private $dbname = 'if0_39021065_online_erp';
    private $username = 'if0_39021065';
    private $password = 'Ys4108HMr8Y3J';
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

