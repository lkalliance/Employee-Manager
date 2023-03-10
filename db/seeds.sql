INSERT INTO department (name)
VALUES  ('HR'),
        ('Sales'),
        ('Marketing'),
        ('Accounting'),
        ('Engineering'),
        ('Customer Relations');

INSERT INTO role (title, salary, department_id)
VALUES  ('Intake', 40000, 1),
        ('Account Rep', 50000, 6),
        ('CFO', 200000, 4),
        ('Junior Developer', 75000, 5),
        ('Lead Developer', 125000, 5),
        ('Support Specialist', 40000, 6),
        ('Analyst', 82500, 3),
        ('Director of Marketing', 180000, 3),
        ('Director of Sales', 80000, 2),
        ('Marketing Rep', 55000, 3),
        ('Sales Rep', 42000, 2),
        ('Senior Developer', 185000, 5),
        ('CR Director', 225000, 6),
        ('HR Director', 90000, 1),
        ('Accountant', 45000, 4);


INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES  ('Roberta', 'Roberts', 3, null),
        ('James', 'Jameson', 8, null),
        ('Mark', 'Marsden', 9, null),
        ('Ben', 'Benson', 12, null),
        ('Jerry', 'Jensen', 14, null),
        ('Samantha', 'Samuelson', 13, null),
        ('Bill', 'Williams', 1, 5),
        ('John', 'Johnson', 2, 6),
        ('Joe', 'Josephson', 5, 4),
        ('Frank', 'Franklin', 6, 6),
        ('Mindy', 'Minoso', 7, 2),
        ('Jeff', 'Jefferson', 10, 2),
        ('Jill', 'Jillian', 11, 3),
        ('Wilma', 'Wilkins', 4, 9),
        ('Cindy', 'Sinclair', 15, 1);