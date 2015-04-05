-- Add a READER role
-- username: READER, password: 'Iaaon0ghost!'
INSERT INTO roles (id,uuid,name,description,created_at,created_by) 
VALUES(5,'5050505050','READER','Reader Role','11/18/2014',1);

-- permissions
INSERT INTO permissions_roles (role_id,permission_id)VALUES(5,8);
INSERT INTO permissions_roles (role_id,permission_id)VALUES(5,9);

-- USER
INSERT INTO users (name,slug,password,email,uuid,created_at,created_by)
VALUES('READER','reader','33242423423','reader@netazoic.com','5050505050','11/18/2014',1);

-- SELECT * FROM users;
--Set password to 'Iaaon0ghost!'
UPDATE users SET password = '$2a$10$8FQ5YUmTeLRWyfP4A29Pq.pcRMtR9DkSAqnVikhfpgGnJLgjE6qMC' WHERE name='READER';

INSERT INTO roles_users(role_id,user_id)VALUES(
    5,
    (SELECT id FROM users WHERE name='READER')
    );

