-- Show every user 
-- O cara criou o circulo

-- Criamos o cara
INSERT INTO users 
(name, lastname, email, creationdate)
VALUES
('fulano','beltrano','fulano@email.com', NOW());


INSERT INTO users 
(name, lastname, email, creationdate)
VALUES
('ciclano','beltrano','ciclano@email.com', NOW());

SELECT * from users;

-- Criamos o circulo
INSERT INTO circle
(name, token, owneruserid)
VALUES
('test', 'ABC123', '7d9af0d6-4af1-46f6-9345-a0c94bc9febd');


-- Criamos o circulo
INSERT INTO circle
(name, token, owneruserid)
VALUES
('test2', 'XYZ123', 'fd41e068-e3e0-4fdb-b457-b3b7f850ada6');

SELECT * FROM CIRCLE;

-- Insere dono do circ no circle
INSERT INTO circleusers
(circleId,userId, online)
VALUES
('b17da7b6-e208-46f8-addf-af0f6f151638', '7d9af0d6-4af1-46f6-9345-a0c94bc9febd', 1);

-- Insere outro no circle
INSERT INTO circleusers
(circleId,userId)
VALUES
('b17da7b6-e208-46f8-addf-af0f6f151638', 'fd41e068-e3e0-4fdb-b457-b3b7f850ada6', 1);

-- Quais circulos usuario percentile_cont_interval_final
SELECT cu.CircleId, c.name, c.token, cu.online
FROM circleusers cu join Circle c on cu.circleId = c.circleId
WHERE cu.userid = 'fd41e068-e3e0-4fdb-b457-b3b7f850ada6'

