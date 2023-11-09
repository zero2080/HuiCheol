# DataBase

종류: RDB , NoSql

## RDB의 종류

`PostgreSQL`, `MySql`, `Db2`, `MS-SQL`, `MariaDB`, `Oracle`, `SQLite`, `Access`. `H2`, `HSQLDB`, `Derby`, `Infomix`, `Sybase`

## Nosql종류

`MongoDB`, `Firebase`

## MySQL

### 특징

- 오픈소스
- 무료
- 다양한 운영체제 지원
  - Windows, Linux, Mac OS 등
- 다양한 언어 지원
  - C, C++, C#, Java, Python, PHP 등
- 다양한 GUI 툴 지원
  - HeidiSQL, MySQL Workbench 등
- 다양한 API 지원
  - JDBC, ODBC 등
- 다양한 연동 라이브러리 지원
  - Node.js, Spring 등
- 다양한 스토리지 엔진 지원
  - InnoDB, MyISAM 등
- 다양한 용도로 사용 가능
  - 웹, 모바일, 임베디드 등

### 트랜잭션

- Database의 상태를 변화시키기 위해 수행하는 작업의 단위

### DML( Data Manipulation Language )

데이터 조작어

> 데이터 스키마(테이블, 뷰, 인덱스 등)를 조작하는데 사용

`SELECT`, `INSERT`, `UPDATE`, `DELETE`

- `SELECT` : 조회
- `INSERT` : 삽입
- `UPDATE` : 수정
- `DELETE` : 삭제

### DCL( Data Control Language )

데이터 제어어

> 데이터의 보안, 무결성, 회복, 병행 수행 제어하는데 사용

`GRANT`, `REVOKE`

- `GRANT` : 사용자에게 권한 부여
- `REVOKE` : 사용자로부터 권한 제거

### DDL( Data Definition Language )

데이터 정의어

> 데이터베이스, 테이블, 뷰, 인덱스 등의 개체를 생성, 변경, 삭제하는데 사용

`CREATE`, `ALTER`, `DROP`, `TRUNCATE`

- `CREATE` : 생성
  - `CREATE DATABASE` : 데이터베이스 생성
  - `CREATE TABLE` : 테이블 생성
  - `CREATE VIEW` : 뷰 생성
  - `CREATE INDEX` : 인덱스 생성
- `ALTER` : 변경

  - `ALTER TABLE` : 테이블 변경
  - `ALTER VIEW` : 뷰 변경
  - `ALTER INDEX` : 인덱스 변경

- `DROP` : 삭제

  - `DROP DATABASE` : 데이터베이스 삭제
  - `DROP TABLE` : 테이블 삭제
  - `DROP VIEW` : 뷰 삭제
  - `DROP INDEX` : 인덱스 삭제

- `TRUNCATE` : 삭제
  - `DELETE`와 다른점은 `TRUNCATE`는 테이블의 모든 데이터를 삭제하고 테이블 구조는 그대로 남아있음
  - `DELETE`는 테이블의 모든 데이터를 삭제하고 테이블 구조도 삭제됨
  - `ROLLBACK`이 불가능함
  - `WHERE`절을 사용할 수 없음
  - `AUTO_INCREMENT`를 초기화함
  - `COMMIT`이 불가능함
  - `TRIGGER`를 사용할 수 없음
  - `DELETE`보다 빠름
  - `DELETE`보다 로그가 적게 생성됨

### TCL( Transaction Control Language )

트랜잭션 제어어

> 트랜잭션을 제어하는 명령어

`COMMIT`, `ROLLBACK`, `SAVEPOINT`

- `COMMIT` : 트랜잭션의 작업이 성공적으로 끝났음을 알림
  - `COMMIT`이 실행되면 트랜잭션의 모든 작업이 정상적으로 수행되고 트랜잭션은 종료됨
- `ROLLBACK` : 트랜잭션의 작업이 실패했음을 알림

  - `ROLLBACK`이 실행되면 트랜잭션의 모든 작업이 취소되고 트랜잭션은 종료됨

- `SAVEPOINT` : 트랜잭션 내에서 저장점을 설정
  - `SAVEPOINT`이 실행되면 트랜잭션 내에서 저장점이 설정됨
  - `ROLLBACK`이 실행되면 저장점까지만 취소되고 트랜잭션은 종료되지 않음

### KEY

- `PRIMARY KEY` : 기본키

  - 테이블에서 행을 구분하는 유일한 키
  - `NOT NULL`이어야 함
  - `UNIQUE`해야 함
  - `AUTO_INCREMENT`가능

- `FOREIGN KEY` : 외래키

  - 다른 테이블의 기본키를 참조하는 키
  - 참조하는 테이블의 기본키와 데이터 타입이 같아야 함
  - 참조하는 테이블의 기본키가 삭제되면 참조하는 테이블의 외래키도 삭제되어야 함
  - 참조하는 테이블의 기본키가 수정되면 참조하는 테이블의 외래키도 수정되어야 함

- `UNIQUE KEY` : 유일키

  - 중복된 값을 가질 수 없음

- `INDEX KEY` : 인덱스키
  - 검색 속도를 높이기 위해 사용하는 키
  - `UNIQUE`해야 함

### 트랜잭션 특징

- 원자성(Atomicity)

  - 트랜잭션의 모든 작업이 정상적으로 수행되거나 아니면 전혀 수행되지 않아야 함

- 일관성(Consistency)

  - 트랜잭션이 성공적으로 수행되면 언제나 일관성 있는 데이터베이스 상태로 변환

- 고립성(Isolation)

  - 동시에 실행되는 트랜잭션들이 서로 영향을 미치지 않도록 격리

- 지속성(Durability)
  - 트랜잭션이 성공적으로 완료되었으면 결과는 영구적으로 반영되어야 함

### 트랜잭션 격리 수준

- READ UNCOMMITTED
- READ COMMITTED
- REPEATABLE READ
- SERIALIZABLE

### 트랜잭션 격리 수준별 문제점

- READ UNCOMMITTED
  - Dirty Read
  - Non-Repeatable Read
  - Phantom Read
- READ COMMITTED
  - Non-Repeatable Read
  - Phantom Read
- REPEATABLE READ
  - Phantom Read
- SERIALIZABLE

### 트랜잭션 격리 수준별 해결 방법

- READ UNCOMMITTED
  - Dirty Read
    - 트랜잭션 A가 특정 데이터를 수정하는 도중에 트랜잭션 B가 해당 데이터를 읽는 경우
    - 트랜잭션 A가 Rollback되면 트랜잭션 B가 읽은 데이터는 존재하지 않는 데이터가 됨
    - 해결 방법
      - 트랜잭션 A가 Rollback되면 트랜잭션 B가 읽은 데이터도 Rollback
      - 트랜잭션 A가 Commit되면 트랜잭션 B가 읽은 데이터도 Commit
- READ COMMITTED
  - Non-Repeatable Read
    - 트랜잭션 A가 특정 데이터를 읽은 후 트랜잭션 B가 해당 데이터를 수정 또는 삭제하는 경우
    - 트랜잭션 A가 다시 해당 데이터를 읽으면 수정 또는 삭제된 데이터가 조회됨
    - 해결 방법
      - 트랜잭션 A가 다시 해당 데이터를 읽으면 수정 또는 삭제된 데이터가 조회되지 않음
- REPEATABLE READ
  - Phantom Read
    - 트랜잭션 A가 특정 데이터를 읽은 후 트랜잭션 B가 해당 데이터를 새로 추가하는 경우
    - 트랜잭션 A가 다시 해당 데이터를 읽으면 새로 추가된 데이터가 조회됨
    - 해결 방법
      - 트랜잭션 A가 다시 해당 데이터를 읽으면 새로 추가된 데이터가 조회되지 않음
- SERIALIZABLE
  - 트랜잭션을 순차적으로 수행
  - 동시성 처리 성능이 가장 떨어짐

```sql

-- DB 생성
CREATE DATABASE `server-study`;

-- 유저 생성
CREATE USER `admin`@'%' IDENTIFIED BY '1234';

-- 생성한 유저에 권한 부여
GRANT ALL PRIVILEGES ON `server`.* TO `admin`@'%';

-- member테이블 생성
CREATE TABLE `member`(
    -- auto_increment 자동 채번 ( 앞번호가 삭제되도 빈자리가 채워지지 않음 )
    -- 컬럼명 데이터 타입 [ 기본값, 키, 인덱스 등]
    `id` INT AUTO_INCREMENT PRIMARY KEY, -- PRIMARY KEY 유일키
    `title` VARCHAR(255) NOT NULL,
    `content` LONGTEXT NOT NULL,
    `writer_id` INT NOT NULL,
    `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
    `updated_at` DATETIME NULL,
    CONSTRAINT `fk_board_writer_id` FOREIGN KEY (`writer_id`) REFERENCES `member`(`id`)
);

CREATE TABLE `board` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `title` VARCHAR(255) NOT NULL,
    `content` LONGTEXT NOT NULL,
    `writer_id` INT NOT NULL,
    `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
    `updated_at` DATETIME NULL,
    CONSTRAINT `fk_board_writer_id` FOREIGN KEY (`writer_id`) REFERENCES `member`(`id`)
);

CREATE TABLE `pick` (
    `writer_id` INT ,
    `baord_id` INT,
    PRIMARY KEY (`writer_id`,`board_id`),
    CONSTRAINT `fk_pick_writer_id` FOREIGN KEY (`writer_id`) REFERENCES `member`(`id`),
    CONSTRAINT `fk_pick_board_id` FOREIGN KEY (`board_id`) REFERENCES `board`(`id`)
);

INSERT INTO `member` (`email`, `password`, `nickname`)
VALUES ('email@domain.com','1234','my_nickname');

INSERT INTO `board` (`title`,`content`,`writer_id`)
VALUES ('글제목','글내용',1);

SELECT * FROM `board` LEFT JOIN `member` ON `board`.`writer_id` = `member`.`id`;

SELECT `board`.`id`, `title`, `member`.`nickname`, `board`.`created_at`
FROM `board` LEFT JOIN `member` ON `board`.`writer_id` = `member`.`id`;

SELECT `board`.`id`, `title`, `member`.`nickname`, `board`.`created_at`
FROM `board` LEFT JOIN `member` ON `board`.`writer_id` = `member`.`id` ORDER BY `board`.`created_at` DESC;
```
