<?php
defined('BASEPATH') OR exit('No direct script access allowed');


/**
 * @property UserDetails $UserDetails
 */

class PhonebookController extends CI_Controller {

    public function __construct() {
        parent::__construct();
        $this->load->model('UserDetails');
        header('Content-Type: application/json');
    }

    // public function index() {
    //     $data = $this->UserDetails->get_all();
    //     echo json_encode($data);
    // }

    public function index() {
        $page = isset($_GET['page']) ? (int) $_GET['page'] : 1;
        $limit = isset($_GET['limit']) ? (int) $_GET['limit'] : 4;
        $offset = ($page - 1) * $limit;

        $this->load->model('UserDetails');
        $contacts = $this->UserDetails->getContacts($limit, $offset);
        $totalContacts = $this->UserDetails->countContacts(); // 获取总记录数
        $totalPages = ceil($totalContacts / $limit); // 计算总页数
    
        echo json_encode([
            'contacts' => $contacts,
            'totalContacts' => $totalContacts,
            'totalPages' => $totalPages,
            'currentPage' => $page, // 返回当前页数
        ]);
    }

    public function store() {
        $input = json_decode(file_get_contents('php://input'), true);
    
        if ($this->UserDetails->insert($input)) {
            echo json_encode(['status' => 'inserted']);
        } else {
            echo json_encode(['status' => 'error', 'message' => 'Validation failed.']);
        }
    }

    public function update($id) {
        $input = json_decode(file_get_contents('php://input'), true);
    
    if ($this->UserDetails->update($id, $input)) {
        echo json_encode(['status' => 'updated']);
    } else {
        echo json_encode(['status' => 'error', 'message' => 'Validation failed.']);
    }
    }

    public function delete($id) {
        $this->UserDetails->delete($id);
        echo json_encode(['status' => 'deleted']);
    }
}
