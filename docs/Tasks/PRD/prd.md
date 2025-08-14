# 요리 레시피 웹사이트 PRD (Product Requirements Document)

## 1. 프로젝트 개요

### 1.1 프로젝트 명
**Recipe Hub** - 커뮤니티 기반 요리 레시피 공유 플랫폼

### 1.2 목표
다양한 요리 레시피를 검색하고, 공유하며, 평가할 수 있는 사용자 친화적인 웹 플랫폼 구축

### 1.3 타겟 사용자
- 요리에 관심이 있는 일반인
- 새로운 레시피를 찾는 초보 요리사
- 자신의 레시피를 공유하고 싶은 요리 애호가
- 특정 재료나 식단에 맞는 레시피를 찾는 사용자

## 2. 핵심 기능 요구사항

### 2.1 레시피 관리
- **레시피 등록**: 제목, 재료, 조리 과정, 이미지, 조리 시간, 난이도 입력
- **레시피 조회**: 상세 페이지에서 단계별 조리 과정 확인
- **레시피 수정/삭제**: 작성자만 가능

### 2.2 검색 기능
- **키워드 검색**: 레시피 제목, 재료, 태그 기반 검색
- **필터링**: 조리 시간, 난이도, 카테고리별 필터
- **정렬**: 인기순, 최신순, 평점순 정렬
- **자동완성**: 검색어 입력 시 추천 검색어 제공

### 2.3 즐겨찾기 기능
- **북마크 추가/제거**: 로그인 사용자의 레시피 저장
- **즐겨찾기 목록**: 개인 즐겨찾기 레시피 관리 페이지
- **즐겨찾기 분류**: 카테고리별 즐겨찾기 정리

### 2.4 리뷰 시스템
- **평점 시스템**: 5점 만점 별점 평가
- **댓글 작성**: 레시피에 대한 후기 및 팁 공유
- **댓글 관리**: 수정/삭제, 대댓글 기능
- **리뷰 통계**: 평균 평점 및 리뷰 개수 표시

### 2.5 태그 시스템
- **태그 추가**: 레시피 등록 시 관련 태그 설정
- **인기 태그**: 자주 사용되는 태그 표시
- **태그 검색**: 태그 클릭으로 관련 레시피 조회
- **태그 관리**: 중복 태그 방지 및 추천 태그 시스템

### 2.6 사용자 인증
- **회원가입/로그인**: 이메일 기반 인증
- **소셜 로그인**: Google, GitHub 연동
- **프로필 관리**: 사용자 정보 수정
- **내가 작성한 레시피**: 개인 레시피 관리 페이지

## 3. 사용자 스토리

### 3.1 기본 사용자
- "새로운 파스타 레시피를 찾고 싶다"
- "내가 좋아하는 레시피를 저장해두고 싶다"
- "이 레시피를 만들어본 후기를 남기고 싶다"

### 3.2 레시피 작성자
- "내가 만든 레시피를 다른 사람들과 공유하고 싶다"
- "사람들이 내 레시피에 어떤 반응을 보이는지 알고 싶다"

### 3.3 고급 사용자
- "비건 요리만 찾아보고 싶다"
- "30분 이내로 만들 수 있는 요리를 찾고 싶다"

## 4. 기술 스택 및 아키텍처

### 4.1 프론트엔드
- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **State Management**: React Hook (useState, useReducer)
- **Form Validation**: React Hook Form + Zod

### 4.2 백엔드
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth
- **File Storage**: Supabase Storage (레시피 이미지)
- **Real-time**: Supabase Realtime (댓글 실시간 업데이트)

### 4.3 배포 및 호스팅
- **Hosting**: Vercel
- **Domain**: Vercel 도메인 또는 커스텀 도메인
- **CDN**: Vercel Edge Network

## 5. 데이터베이스 설계

### 5.1 주요 테이블 구조

```sql
-- 사용자 테이블
users (
  id uuid PRIMARY KEY,
  email varchar,
  name varchar,
  avatar_url varchar,
  created_at timestamp
)

-- 레시피 테이블
recipes (
  id uuid PRIMARY KEY,
  title varchar,
  description text,
  ingredients text[],
  instructions text[],
  prep_time integer,
  cook_time integer,
  difficulty varchar,
  servings integer,
  image_url varchar,
  author_id uuid REFERENCES users(id),
  created_at timestamp,
  updated_at timestamp
)

-- 태그 테이블
tags (
  id uuid PRIMARY KEY,
  name varchar UNIQUE,
  created_at timestamp
)

-- 레시피-태그 연결 테이블
recipe_tags (
  recipe_id uuid REFERENCES recipes(id),
  tag_id uuid REFERENCES tags(id),
  PRIMARY KEY (recipe_id, tag_id)
)

-- 즐겨찾기 테이블
favorites (
  id uuid PRIMARY KEY,
  user_id uuid REFERENCES users(id),
  recipe_id uuid REFERENCES recipes(id),
  created_at timestamp,
  UNIQUE(user_id, recipe_id)
)

-- 리뷰 테이블
reviews (
  id uuid PRIMARY KEY,
  recipe_id uuid REFERENCES recipes(id),
  user_id uuid REFERENCES users(id),
  rating integer CHECK (rating >= 1 AND rating <= 5),
  comment text,
  created_at timestamp,
  updated_at timestamp
)
```

## 6. API 설계

### 6.1 레시피 API
- `GET /api/recipes` - 레시피 목록 조회 (검색, 필터, 페이지네이션)
- `GET /api/recipes/[id]` - 레시피 상세 조회
- `POST /api/recipes` - 레시피 생성
- `PUT /api/recipes/[id]` - 레시피 수정
- `DELETE /api/recipes/[id]` - 레시피 삭제

### 6.2 검색 API
- `GET /api/search?q={keyword}&filter={filter}&sort={sort}` - 통합 검색
- `GET /api/search/suggestions?q={keyword}` - 검색어 자동완성

### 6.3 즐겨찾기 API
- `GET /api/favorites` - 사용자 즐겨찾기 목록
- `POST /api/favorites` - 즐겨찾기 추가
- `DELETE /api/favorites/[id]` - 즐겨찾기 제거

### 6.4 리뷰 API
- `GET /api/recipes/[id]/reviews` - 레시피 리뷰 목록
- `POST /api/recipes/[id]/reviews` - 리뷰 작성
- `PUT /api/reviews/[id]` - 리뷰 수정
- `DELETE /api/reviews/[id]` - 리뷰 삭제

### 6.5 태그 API
- `GET /api/tags` - 태그 목록
- `GET /api/tags/popular` - 인기 태그
- `POST /api/tags` - 태그 생성

## 7. UI/UX 가이드라인

### 7.1 디자인 시스템
- **컬러 팔레트**: 따뜻하고 식욕을 돋우는 색상 (오렌지, 베이지, 초록)
- **타이포그래피**: 가독성 좋은 폰트 (Pretendard 또는 Inter)
- **간격**: Tailwind의 spacing 시스템 활용

### 7.2 주요 페이지
- **홈페이지**: 인기 레시피, 최신 레시피, 검색바
- **레시피 상세페이지**: 이미지, 재료, 조리과정, 리뷰
- **검색 결과페이지**: 필터, 정렬, 카드 형태 레시피 목록
- **마이페이지**: 내 레시피, 즐겨찾기, 프로필 정보

### 7.3 반응형 디자인
- **Mobile First**: 모바일 우선 설계
- **Breakpoints**: Tailwind 기본 브레이크포인트 활용
- **터치 친화적**: 버튼 크기, 스크롤 영역 고려

## 8. 성능 및 최적화

### 8.1 이미지 최적화
- **Next.js Image**: 자동 최적화 및 지연 로딩
- **WebP 포맷**: 현대 브라우저 지원
- **반응형 이미지**: 다양한 화면 크기 대응

### 8.2 데이터 로딩
- **무한 스크롤**: 레시피 목록 페이지네이션
- **캐싱**: SWR 또는 React Query 활용
- **Skeleton UI**: 로딩 상태 개선

## 9. 보안 고려사항

### 9.1 인증 및 권한
- **JWT 토큰**: Supabase Auth 활용
- **RLS (Row Level Security)**: 데이터베이스 레벨 보안
- **CSRF 보호**: Next.js 기본 보안 기능

### 9.2 데이터 검증
- **입력 검증**: 클라이언트/서버 양쪽 검증
- **SQL Injection 방지**: Supabase ORM 활용
- **이미지 업로드 제한**: 파일 크기, 형식 제한

## 10. 개발 일정 (8주 계획)

### Week 1-2: 프로젝트 셋업 및 기본 구조
- Next.js 프로젝트 초기화
- Supabase 설정 및 데이터베이스 스키마 생성
- 기본 레이아웃 및 라우팅 구조

### Week 3-4: 핵심 기능 개발
- 사용자 인증 시스템
- 레시피 CRUD 기능
- 기본 검색 기능

### Week 5-6: 고급 기능 개발
- 즐겨찾기 시스템
- 리뷰 및 평점 시스템
- 태그 시스템

### Week 7-8: 마무리 및 배포
- UI/UX 개선
- 성능 최적화
- 테스트 및 버그 수정
- Vercel 배포 및 도메인 설정

## 11. 성공 지표

### 11.1 사용자 참여도
- **Daily Active Users (DAU)**: 일일 활성 사용자 수
- **레시피 등록 수**: 월별 새로운 레시피 등록 건수
- **평균 세션 시간**: 사용자당 평균 사이트 이용 시간

### 11.2 콘텐츠 품질
- **평균 레시피 평점**: 전체 레시피의 평균 별점
- **리뷰 참여율**: 레시피당 평균 리뷰 수
- **즐겨찾기율**: 레시피당 평균 즐겨찾기 수

### 11.3 기술적 지표
- **페이지 로딩 속도**: Core Web Vitals 점수
- **검색 성능**: 검색 결과 반환 속도
- **업타임**: 99.9% 이상 서비스 가용성

## 12. 향후 확장 계획

### Phase 2 기능
- **레시피 영상**: 조리 과정 동영상 업로드
- **쇼핑 리스트**: 재료 기반 장보기 목록 생성
- **영양 정보**: 칼로리 및 영양성분 표시
- **소셜 기능**: 팔로우, 피드, 알림 시스템

### Phase 3 기능
- **AI 추천**: 개인화된 레시피 추천 시스템
- **음성 검색**: 음성으로 레시피 검색
- **다국어 지원**: 영어, 중국어 등 다국어 서비스
- **모바일 앱**: React Native 기반 네이티브 앱

---

**문서 작성일**: 2025년 8월 14일  
**작성자**: Recipe Hub 개발팀  
**버전**: 1.0