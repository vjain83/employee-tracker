USE employee_tracker_db;
INSERT INTO
  departments(departmentName)
VALUES
  ('Engineering'),('Marketing'),('HR'),('Accounts'),('Quality');
INSERT INTO
  roles(title, salary, department_id)
VALUES
  ('Engineer', 150000, 1),
  ('BusinessAnalyst', 100000, 2),
  ('HRHead', 80000, 3),
  ('Accountant', 80000, 4),
  ('jr.Accountant', 60000, 4),
  ('Qualityanalyst', 90000, 5),
  ('Intern', 30000, 1);
INSERT INTO
  employees (first_name, last_name, role_id, manager_id)
VALUES
  ('Robert', 'Clive', 1, NULL),
  ('Russell', 'Crowe', 1, 1),
  ('Ronald', 'Firbank', 1, 2),
  ('Virginia', 'Woolf', 1, 4),
  ('Piers', 'Gaveston', 3, 5),
  ('Charles', 'LeRoi', 4, 4),
  ('Katherine', 'Mansfield', 2, 3),
  ('Dora', 'Carrington', 5, 1),
  ('Edward', 'Bellamy', 4, NULL),
  ('Montague', 'Summers', 5, 5),
  ('Octavia', 'Butler', 7, 2),
  ('Unica', 'Zurn', 2, 5);