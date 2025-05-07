<?php

class UserDetails extends CI_Model {

    public function get_all() {
        return $this->db->get('phonebook')->result();
    }


     public function getContacts($limit, $offset) {
        $this->db->limit($limit, $offset);
        $query = $this->db->get('phonebook');
        return $query->result_array();
    }


    public function countContacts() {
        return $this->db->count_all('phonebook');
    }

    public function insert($data) {
        if ($this->validate($data)) {
            $this->db->insert('phonebook', $data);
            return true;
        } else {
            return false;
        }
        return $this->db->insert('phonebook', $data);
    }

    public function update($id, $data) {
        if ($this->validate($data)) {
            $this->db->where('id', $id);
            $this->db->update('phonebook', $data);
            return true;
        } else {
            return false;
        }
    }

    public function delete($id) {
        $this->db->where('id', $id);
        return $this->db->delete('phonebook');
    }

    public function validate($data) {
        if (empty($data['name']) || empty($data['phone_no']) || empty($data['status'])) {
            return false;
        }

        if (!preg_match('/^(\+?6?01)[02-46-9]-*[0-9]{7}$|^(\+?6?01)[1]-*[0-9]{8}$/', $data['phone_no'])) {
            return false;
        }

        return true;
    }
}