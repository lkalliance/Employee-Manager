INSERT INTO department (name)
VALUES  ('HR'),
        ('Sales'),
        ('Marketing'),
        ('Accounting'),
        ('Engineering'),
        ('Customer Relations');

INSERT INTO role (title, salary, department_id)
VALUES  ('Intake', 40000, 1),
        ('Account Rep', 50000, 1),
        ('CFO', 200000, 4),
        ('Junior Developer', 75000, 5),
        ('Lead Developer', 125000, 5),
        ('Support Specialist', 40000, 6),
        ('Analyst', 82500, 3);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES  ('Joe', 'Dow', 5, null),
        ('John', 'Doe', 3, null),
        ('Jane', 'Dough', 7, null),
        ('Jenny', 'Dew', 1, null),
        ('Jalen', 'Dow', 4, 1),
        ('Joelle', 'Drew', 4, 1);
