<?php

class Usuario{

    public $nome = "Matheus";
    public $logado = true;
}

$user = new Usuario();
var_dump($user);
echo serialize($user);
