-- Seed The Schema With Intial Information
-- --------------------------------------

INSERT INTO department (id, name)
VALUES
    (1, 'Sales'),
    (2, 'Engineering'),
    (3, 'Finance'),
    (4, 'Legal');

INSERT INTO role (id, title, salary, department_id)
VALUES
    (1, 'Sales Lead', 100000, 1),
    (2, 'Salesperson', 80000, 1),
    (3, 'Lead Engineer', 120000, 2),
    (4, 'Software Engineer', 100000, 2),
    (5, 'Accountant', 130000, 3),
    (6, 'Legal Team Lead', 130000, 4),
    (7, 'Lawyer', 120000, 4);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES
    (800283001, "Christopher", "Dean", 1, 1),
    (800283002, "John", "Smith", 2, 1),
    (800283003, "Jane", "Doe", 3, 1),
    (800283004, "Mary", "Jane", 4, 1),
    (800283005, "Sally", "May", 5, 1),
    (800283006, "Bob", "Jones", 6, 1),
    (800283007, "Sue", "Smith", 7, 1);
    
     