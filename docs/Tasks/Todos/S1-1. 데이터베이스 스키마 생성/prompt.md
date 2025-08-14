# 데이터베이스 스키마 생성 구현 프롬프트

## 구현 목표
Recipe-Rader 프로젝트의 Supabase 데이터베이스 스키마를 체계적으로 설계하고 구현합니다.

## SuperClaude 실행 명령어

```bash
/sc:analyze --focus database --think-hard --seq --c7
```

## 상세 구현 사항

### 1. 데이터베이스 테이블 스키마 설계

#### 1.1 users 테이블
- **목적**: 사용자 기본 정보 및 프로필 관리
- **주요 필드**: 
  - id (UUID, PRIMARY KEY)
  - email (UNIQUE)
  - full_name
  - avatar_url
  - bio
  - created_at, updated_at
- **보안**: RLS (Row Level Security) 정책 적용
- **인덱스**: email 필드 인덱스

#### 1.2 recipes 테이블
- **목적**: 레시피 메인 정보 저장
- **주요 필드**:
  - id (UUID, PRIMARY KEY)
  - title (VARCHAR, NOT NULL)
  - description (TEXT)
  - ingredients (JSONB)
  - instructions (JSONB)
  - prep_time (INTEGER)
  - cook_time (INTEGER)
  - serving_size (INTEGER)
  - difficulty (ENUM: easy, medium, hard)
  - image_url (VARCHAR)
  - author_id (UUID, FOREIGN KEY → users.id)
  - view_count (INTEGER, DEFAULT 0)
  - created_at, updated_at
- **인덱스**: title, author_id, difficulty, created_at 필드
- **RLS**: 작성자만 수정/삭제 가능

#### 1.3 tags 테이블
- **목적**: 레시피 분류용 태그 관리
- **주요 필드**:
  - id (UUID, PRIMARY KEY)
  - name (VARCHAR, UNIQUE)
  - usage_count (INTEGER, DEFAULT 0)
  - created_at

#### 1.4 recipe_tags 연결 테이블
- **목적**: 레시피와 태그 다대다 관계
- **주요 필드**:
  - recipe_id (UUID, FOREIGN KEY → recipes.id)
  - tag_id (UUID, FOREIGN KEY → tags.id)
  - created_at
- **제약조건**: PRIMARY KEY (recipe_id, tag_id)

#### 1.5 favorites 테이블
- **목적**: 사용자 즐겨찾기 관리
- **주요 필드**:
  - id (UUID, PRIMARY KEY)
  - user_id (UUID, FOREIGN KEY → users.id)
  - recipe_id (UUID, FOREIGN KEY → recipes.id)
  - created_at
- **제약조건**: UNIQUE (user_id, recipe_id)
- **RLS**: 사용자 본인 데이터만 접근 가능

#### 1.6 reviews 테이블
- **목적**: 레시피 리뷰 및 평점 관리
- **주요 필드**:
  - id (UUID, PRIMARY KEY)
  - recipe_id (UUID, FOREIGN KEY → recipes.id)
  - user_id (UUID, FOREIGN KEY → users.id)
  - rating (INTEGER, CHECK rating >= 1 AND rating <= 5)
  - comment (TEXT)
  - created_at, updated_at
- **제약조건**: UNIQUE (recipe_id, user_id)
- **RLS**: 작성자만 수정/삭제 가능

### 2. 뷰(Views) 생성

#### 2.1 recipe_stats 뷰
- **목적**: 레시피 통계 정보 집계
- **포함 데이터**:
  - 레시피 ID
  - 평균 평점
  - 리뷰 개수
  - 즐겨찾기 개수
  - 조회수

### 3. 트리거 및 함수

#### 3.1 태그 사용 횟수 업데이트 트리거
- **목적**: recipe_tags 테이블 변경 시 tags.usage_count 자동 업데이트
- **트리거 이벤트**: INSERT, DELETE on recipe_tags

#### 3.2 updated_at 자동 업데이트 함수
- **목적**: 레코드 수정 시 updated_at 필드 자동 갱신

### 4. RLS (Row Level Security) 정책

#### 4.1 users 테이블 정책
- **SELECT**: 모든 사용자가 공개 프로필 정보 조회 가능
- **UPDATE**: 본인 프로필만 수정 가능
- **DELETE**: 본인 계정만 삭제 가능

#### 4.2 recipes 테이블 정책
- **SELECT**: 모든 사용자가 공개된 레시피 조회 가능
- **INSERT**: 인증된 사용자만 레시피 작성 가능
- **UPDATE/DELETE**: 작성자만 수정/삭제 가능

#### 4.3 favorites 테이블 정책
- **ALL**: 본인의 즐겨찾기만 조회/관리 가능

#### 4.4 reviews 테이블 정책
- **SELECT**: 모든 사용자가 리뷰 조회 가능
- **INSERT**: 인증된 사용자만 리뷰 작성 가능
- **UPDATE/DELETE**: 작성자만 수정/삭제 가능

### 5. 인덱스 최적화

#### 5.1 성능 개선용 인덱스
- **recipes**: (title), (author_id), (created_at DESC), (difficulty)
- **reviews**: (recipe_id), (user_id), (rating)
- **favorites**: (user_id), (recipe_id)
- **recipe_tags**: (recipe_id), (tag_id)

#### 5.2 복합 인덱스
- **recipes**: (difficulty, created_at DESC)
- **reviews**: (recipe_id, rating DESC)

### 6. 데이터 무결성 제약조건

#### 6.1 CHECK 제약조건
- **reviews.rating**: 1-5 범위 검증
- **recipes.prep_time, cook_time**: 양수 검증
- **recipes.serving_size**: 1 이상 검증

#### 6.2 FOREIGN KEY 제약조건
- 모든 관계 테이블에 적절한 외래키 설정
- CASCADE 옵션 적용 (필요한 경우)

### 7. 초기 데이터 설정

#### 7.1 기본 태그 데이터
- 한식, 양식, 중식, 일식
- 간단한 요리, 메인 요리, 디저트, 음료
- 다이어트, 비건, 글루텐프리

#### 7.2 샘플 레시피 데이터
- 개발 및 테스트용 샘플 레시피 몇 개 추가

## 기술적 고려사항

### 1. 성능 최적화
- **JSONB 활용**: ingredients, instructions를 JSONB로 저장하여 유연성과 쿼리 성능 확보
- **적절한 인덱싱**: 자주 조회되는 필드들에 인덱스 적용
- **뷰 활용**: 복잡한 집계 쿼리를 뷰로 미리 정의

### 2. 확장성 고려
- **UUID 사용**: 분산 환경에서의 확장성 고려
- **JSONB 활용**: 스키마 변경 없이 필드 추가 가능
- **태그 시스템**: 유연한 분류 체계

### 3. 보안 강화
- **RLS 정책**: 세밀한 데이터 접근 제어
- **입력 검증**: CHECK 제약조건으로 데이터 무결성 보장
- **적절한 권한 관리**: 테이블별 적절한 권한 설정

## MCP 서버 활용 가이드

### Context7 활용
- Supabase 스키마 설계 패턴 참조
- PostgreSQL 성능 최적화 문서 참조
- RLS 정책 설정 베스트 프랙티스 참조

### Sequential 활용
- 스키마 설계의 논리적 순서 분석
- 테이블 간 의존성 관계 분석
- 성능 최적화 전략 수립

## 구현 순서

1. **기본 테이블 생성** (users, recipes, tags)
2. **관계 테이블 생성** (recipe_tags, favorites, reviews)
3. **인덱스 적용**
4. **RLS 정책 설정**
5. **뷰 및 트리거 생성**
6. **초기 데이터 입력**
7. **성능 테스트 및 최적화**

## 검증 방법

1. **스키마 구조 검증**: 모든 테이블과 관계가 올바르게 생성되었는지 확인
2. **RLS 정책 테스트**: 각 정책이 의도대로 동작하는지 테스트
3. **성능 테스트**: 주요 쿼리들의 성능 측정
4. **데이터 무결성 테스트**: 제약조건들이 올바르게 작동하는지 확인

## 완료 기준

- [ ] 모든 테이블이 올바른 스키마로 생성됨
- [ ] RLS 정책이 모든 테이블에 적용됨
- [ ] 인덱스가 성능 최적화를 위해 적절히 설정됨
- [ ] 뷰와 트리거가 올바르게 동작함
- [ ] 초기 데이터가 삽입됨
- [ ] 스키마 구조가 문서화됨

이 프롬프트를 바탕으로 체계적이고 확장 가능한 데이터베이스 스키마를 구현해주세요.