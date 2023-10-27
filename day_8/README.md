# Node.js 에서 TDD

## 1. TDD 란?

- TDD(Test Driven Development)는 테스트 주도 개발이라고 불리며, 테스트가 개발을 이끌어 나가는 개발 방법론이다.

- TDD는 테스트를 먼저 작성하고, 테스트를 통과하기 위한 코드를 작성하는 방식으로 진행된다.

## 2. Using Modules

- `express` : 웹 서버를 만들어주는 `nodejs` 프레임워크 [[공식문서](https://expressjs.com/ko)]
- `mocha` : 테스트 코드를 실행해주는 테스트 러너 [[공식문서](https://mochajs.org/)]
- `chai` : 테스트 코드를 작성할 때 사용하는 라이브러리 [[공식문서](https://www.chaijs.com/)]
- ~~`should` : 테스트 코드를 읽기 쉽게 만들어주는 라이브러리 [[공식문서](https://shouldjs.github.io/)]~~
  > `chai` 로 대체 함. `chai` 내부의 `should` 를 사용
- `supertest` : 익스프레스 테스트용 라이브러리 ( 통합 테스트 ) [[공식문서](https://github.com/ladjs/supertest#readme)]
- `bcrypt` : 단방향 암호화 라이브러리

## 3. 프로젝트 설치

- `> npm i`
  - 프로젝트에 필요한 모듈을 설치한다.

## 3. 프로젝트 테스트

- `npm test`
  - 테스트 코드를 실행한다.
