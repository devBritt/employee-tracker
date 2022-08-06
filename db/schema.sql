drop table if exists employees;
drop table if exists roles;
drop table if exists departments;

create table departments (
    id int auto_increment primary key,
    department_name varchar(30) not null
);

create table roles (
    id int auto_increment primary key,
    role_title varchar(30) not null,
    salary decimal(8, 2) not null,
    department_id int not null,
    constraint fk_department foreign key (department_id) references departments(id)
);

create table employees (
    id int auto_increment primary key,
    first_name varchar(30) not null,
    last_name varchar(30) not null,
    role_id int not null,
    manager_id int not null,
    constraint fk_role foreign key (role_id) references roles(id),
    constraint fk_manager foreign key (manager_id) references employees(id)
);