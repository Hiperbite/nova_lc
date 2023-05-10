-- Active: 1667157413070@@127.0.0.1@3306@nova_lc

DROP PROCEDURE GetStudentsCountGender;

CREATE PROCEDURE GETSTUDENTSCOUNTGENDER() BEGIN 
	select
	    P.gender,
	    COUNT(*) as count
	from Students as S
	    INNER join Persons as P on P.id = S.personId
	GROUP BY P.gender;
END; 

DROP PROCEDURE GetStudentsCountMaritalStatus;

CREATE PROCEDURE GETSTUDENTSCOUNTMARITALSTATUS() BEGIN 
	select
	    P.maritalStatus,
	    COUNT(*) as count
	from Students as S
	    INNER join Persons as P on P.id = S.personId
	GROUP BY P.maritalStatus;
END; 

DROP PROCEDURE GetStudentsCountNationality;

CREATE PROCEDURE GETSTUDENTSCOUNTNATIONALITY() BEGIN 
	select
	    P.nationality,
	    COUNT(*) as count
	from Students as S
	    INNER join Persons as P on P.id = S.personId
	GROUP BY P.nationality;
END; 

DROP PROCEDURE GetStudentsCountAge;

CREATE PROCEDURE GETSTUDENTSCOUNTAGE() BEGIN 
	SELECT
	    count(age_range) as count,
	    age_range
	FROM (
	        select
	            case
	                when year(curdate()) - year(Persons.birthDate) < 18 then 'lessThan18'
	                when year(curdate()) - year(Persons.birthDate) between 18 and 20 then 'between18And20'
	                when year(curdate()) - year(Persons.birthDate) between 21 and 25 then 'between21And25'
	                ELSE 'greatThan25'
	            END as age_range
	        FROM Persons
	            INNER JOIN Students on Students.personId = Persons.id
	    ) t
	group by age_range
	order by age_range;
END; 

DROP PROCEDURE GetStudentsCountOlder;

CREATE PROCEDURE GETSTUDENTSCOUNTOLDER() BEGIN 
	SELECT
	    count(older) as count,
	    older
	FROM (
	        select
	            MONTH(curdate()) - MONTH(Enrollments.createdAt) as older
	        FROM Enrollments
	    ) t
	group by older
	order by older;
END; 

DROP PROCEDURE GetStudentsRegistered;

CREATE PROCEDURE GETSTUDENTSREGISTERED() BEGIN 
	SELECT C.*, COUNT(*) count
	from Students S
	    INNER JOIN Courses as C ON C.id = S.desiredCourseId
	where S.code is null
	GROUP BY desiredCourseId
	ORDER BY C.name;
END; 

DROP PROCEDURE GetStudentHonorRoll;

CREATE PROCEDURE GetStudentHonorRoll() BEGIN 
	select
	    MAX(U.avatar) as avatar,
	    C.code as classe,
	    C.semester as semester,
	    O.name as course,
	    R.code as period,
	    A.enrollmentId,
	    avg(A.value) AS avareg,
	    P.*
	from Assessments as A
	    INNER JOIN Enrollments as E on E.id = A.enrollmentId
	    INNER JOIN Classes as C on C.id = E.classeId
	    INNER JOIN Courses as O on O.id = C.courseId
	    INNER JOIN Period as R on R.id = C.periodId
	    LEFT JOIN Students as S on S.id = E.studentId
	    LEFT JOIN Persons as P on P.id = S.personId
	    LEFT JOIN Users as U on U.personId = P.id
	group by A.enrollmentId
	ORDER BY avareg DESC
	LIMIT 3;
END; 



DROP PROCEDURE GetStudentCount;
CREATE  PROCEDURE GetStudentCount() BEGIN 
	select 

	(select count(*) from Enrollments where isActive is false) as inActiveEnrollments,
		(select count(*) from Enrollments where isActive is false AND YEAR(createdAt)=YEAR(CURDATE())) as inActiveEnrollmentsThisYear,
	(select count(*) from Enrollments) as enrollments,
	(select count(*) from Enrollments where YEAR(createdAt)=YEAR(CURDATE())) as enrollmentsThisYear,
	(select count(*) from Enrollments where YEAR(createdAt)=YEAR(CURDATE())-1) as enrollmentsLastYear,
	(select count(*) from Students) as studets,
	(select count(*) from Students where YEAR(createdAt)=YEAR(CURDATE())) studentsThisYear
	from Period
	LIMIT 1;
END; 