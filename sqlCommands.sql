create table Questions(
    q_id int,
    question varchar(250)
);

create table Answers(
    a_id int,
    answer varchar(250)
);


-- Insert rows into table 'Questions'
INSERT INTO Questions
( q_id, question)
VALUES
( 1, "Who is the Prime Minister of India"),
( 2, "Gaand phatt chuki h mai kya gaand sach m phatt jati hai?"),
(3,"bhag bhag dk bsdk bsdk mai bsdk ka kitni bar prayog kia gaya hai");

INSERT INTO Answers
( a_id, answer)
VALUES
( 1, "Modi"),
( 2, "nahi"),
(3,"10");

--Query

SELECT answer
FROM Questions, Answers
WHERE q_id=a_id;