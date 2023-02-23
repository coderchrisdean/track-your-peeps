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

INSERT INTO employee (id, first_name, last_name, role_id)
VALUES
    (800283001, "Christopher", "Dean", 1),
    (800283002, "Emma", "Smith", 2),
    (800283003, "Jane", "Doe", 3),
    (800283004, "Mary", "Jane", 4),
    (800283005, "Sally", "May", 5),
    (800283006, "Bob", "Jones", 6),
    (800283007, "Sue", "Smith", 7);
    
--      INSERT INTO manager (id, name)
-- VALUES
--     (1, 'CEO'),
--     (2, 'VP of Sales');