drop database if exists reptiles;
create database reptiles;

use reptiles;

set foreign_key_checks=0;

create table reptiles (
	id INT primary key AUTO_INCREMENT, 
	name VARCHAR(255), 
	voeding VARCHAR(255), 
	huisvesting VARCHAR(255), 
	verzorgingsInformatie VARCHAR(255)
) engine=InnoDB;

grant all privileges on reptiles.* to 'harmster'@'localhost' identified by 'harmsterrocks2019!';
flush privileges;

set foreign_key_checks=1;

