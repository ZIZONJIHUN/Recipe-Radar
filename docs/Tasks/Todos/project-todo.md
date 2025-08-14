# 프로젝트 구현 전체 Todo List

## 현재 프로젝트 상태 분석

### ✅ 이미 구현된 내용
- **기본 프로젝트 설정**: Next.js 14, TypeScript, Tailwind CSS
- **UI 컴포넌트 라이브러리**: shadcn/ui 기반 커스텀 컴포넌트들
- **기본 레이아웃**: Header, Footer, ThemeProvider
- **Supabase 기본 설정**: client, server, middleware, types
- **인증 관련 훅**: use-auth.ts
- **테마 시스템**: 다크/라이트 모드 지원
- **홈페이지**: 기본 랜딩 페이지 구현
- **컴포넌트 데모 페이지**: UI 컴포넌트 시연 페이지

---

## 🚀 Phase 1: 기본 인프라 및 인증 시스템 (Week 1-2)

### 1.1 Supabase 데이터베이스 설정
- [ ] **Supabase 프로젝트 생성 및 환경변수 설정**
  - Supabase 프로젝트 생성
  - `.env.local` 파일에 환경변수 추가
  - 데이터베이스 연결 테스트

- [ ] **데이터베이스 스키마 생성**
  - `users` 테이블 생성 및 RLS 정책 설정
  - `recipes` 테이블 생성 및 인덱스 적용
  - `tags` 테이블 생성
  - `recipe_tags` 연결 테이블 생성
  - `favorites` 테이블 생성 및 RLS 정책 설정
  - `reviews` 테이블 생성 및 RLS 정책 설정
  - `recipe_stats` 뷰 생성
  - 태그 사용 횟수 업데이트 트리거 생성

- [ ] **Supabase Storage 설정**
  - 레시피 이미지용 버킷 생성
  - 아바타 이미지용 버킷 생성
  - 파일 업로드 정책 설정

### 1.2 인증 시스템 구현
- [ ] **인증 페이지 구현**
  - `app/(auth)/login/page.tsx` - 로그인 페이지
  - `app/(auth)/signup/page.tsx` - 회원가입 페이지
  - `app/(auth)/layout.tsx` - 인증 레이아웃

- [ ] **인증 API 구현**
  - `app/api/auth/signup/route.ts` - 회원가입 API
  - `app/api/auth/login/route.ts` - 로그인 API
  - `app/api/auth/logout/route.ts` - 로그아웃 API
  - `app/api/auth/refresh/route.ts` - 토큰 갱신 API

- [ ] **소셜 로그인 구현**
  - Google OAuth 설정
  - GitHub OAuth 설정
  - 소셜 로그인 콜백 처리

- [ ] **인증 미들웨어 구현**
  - `middleware.ts` 보호된 라우트 설정
  - 인증 상태 확인 로직
  - 리다이렉션 처리

### 1.3 사용자 프로필 시스템
- [ ] **프로필 페이지 구현**
  - `app/profile/page.tsx` - 내 프로필 페이지
  - `app/profile/edit/page.tsx` - 프로필 수정 페이지
  - `app/users/[id]/page.tsx` - 다른 사용자 프로필 페이지

- [ ] **프로필 API 구현**
  - `app/api/users/me/route.ts` - 내 프로필 조회/수정
  - `app/api/users/[id]/route.ts` - 사용자 프로필 조회

- [ ] **프로필 관련 컴포넌트**
  - `lib/components/profile/ProfileCard.tsx`
  - `lib/components/profile/ProfileForm.tsx`
  - `lib/components/profile/ProfileStats.tsx`

---

## 🍳 Phase 2: 레시피 관리 시스템 (Week 3-4)

### 2.1 레시피 CRUD 기능
- [ ] **레시피 목록 페이지**
  - `app/recipes/page.tsx` - 전체 레시피 목록
  - 무한 스크롤 또는 페이지네이션 구현
  - 필터링 및 정렬 기능

- [ ] **레시피 상세 페이지**
  - `app/recipes/[id]/page.tsx` - 레시피 상세 정보
  - 재료 목록 표시
  - 단계별 조리 과정 표시
  - 영양 정보 표시 (선택사항)

- [ ] **레시피 작성/수정 페이지**
  - `app/recipes/create/page.tsx` - 새 레시피 작성
  - `app/recipes/[id]/edit/page.tsx` - 레시피 수정
  - 이미지 업로드 기능
  - 재료 및 조리과정 동적 입력

### 2.2 레시피 API 구현
- [ ] **기본 CRUD API**
  - `app/api/recipes/route.ts` - 레시피 목록 조회, 생성
  - `app/api/recipes/[id]/route.ts` - 상세 조회, 수정, 삭제
  - `app/api/recipes/[id]/view/route.ts` - 조회수 증가

- [ ] **파일 업로드 API**
  - `app/api/upload/image/route.ts` - 이미지 업로드
  - 파일 크기 및 형식 검증
  - 이미지 리사이징 (선택사항)

### 2.3 레시피 관련 컴포넌트
- [ ] **레시피 기본 컴포넌트**
  - `lib/components/recipe/RecipeCard.tsx` - 레시피 카드
  - `lib/components/recipe/RecipeForm.tsx` - 레시피 작성 폼
  - `lib/components/recipe/RecipeDetail.tsx` - 레시피 상세 정보
  - `lib/components/recipe/IngredientList.tsx` - 재료 목록
  - `lib/components/recipe/InstructionList.tsx` - 조리 과정
  - `lib/components/recipe/RecipeImage.tsx` - 레시피 이미지

- [ ] **폼 관련 컴포넌트**
  - `lib/components/recipe/IngredientInput.tsx` - 재료 입력
  - `lib/components/recipe/InstructionInput.tsx` - 조리과정 입력
  - `lib/components/common/ImageUpload.tsx` - 이미지 업로드

### 2.4 레시피 관련 훅
- [ ] **데이터 관리 훅**
  - `lib/hooks/use-recipes.ts` - 레시피 데이터 관리
  - `lib/hooks/use-recipe-form.ts` - 레시피 폼 관리
  - `lib/hooks/use-image-upload.ts` - 이미지 업로드 관리

---

## 🔍 Phase 3: 검색 및 필터링 시스템 (Week 3-4)

### 3.1 검색 기능 구현
- [ ] **검색 페이지**
  - `app/search/page.tsx` - 통합 검색 결과
  - 검색어 하이라이팅
  - 검색 결과 필터링 및 정렬

- [ ] **검색 API**
  - `app/api/search/route.ts` - 통합 검색
  - `app/api/search/suggestions/route.ts` - 자동완성
  - `app/api/search/by-ingredients/route.ts` - 재료 기반 검색

### 3.2 검색 관련 컴포넌트
- [ ] **검색 UI 컴포넌트**
  - `lib/components/search/SearchBar.tsx` - 검색바
  - `lib/components/search/FilterPanel.tsx` - 필터 패널
  - `lib/components/search/SortOptions.tsx` - 정렬 옵션
  - `lib/components/search/SearchResults.tsx` - 검색 결과
  - `lib/components/search/AutoComplete.tsx` - 자동완성

### 3.3 검색 관련 훅
- [ ] **검색 상태 관리**
  - `lib/hooks/use-search.ts` - 검색 상태 관리
  - `lib/hooks/use-filters.ts` - 필터 상태 관리
  - `lib/hooks/use-autocomplete.ts` - 자동완성 관리

---

## ⭐ Phase 4: 즐겨찾기 및 리뷰 시스템 (Week 5-6)

### 4.1 즐겨찾기 시스템
- [ ] **즐겨찾기 페이지**
  - `app/profile/favorites/page.tsx` - 내 즐겨찾기 목록
  - 카테고리별 분류 기능

- [ ] **즐겨찾기 API**
  - `app/api/favorites/route.ts` - 즐겨찾기 목록, 추가
  - `app/api/favorites/[recipe_id]/route.ts` - 즐겨찾기 제거
  - `app/api/favorites/check/[recipe_id]/route.ts` - 즐겨찾기 상태 확인

- [ ] **즐겨찾기 컴포넌트**
  - `lib/components/favorites/FavoriteButton.tsx` - 즐겨찾기 버튼
  - `lib/components/favorites/FavoritesList.tsx` - 즐겨찾기 목록

### 4.2 리뷰 및 평점 시스템
- [ ] **리뷰 API**
  - `app/api/recipes/[id]/reviews/route.ts` - 리뷰 목록, 작성
  - `app/api/reviews/[id]/route.ts` - 리뷰 수정, 삭제
  - `app/api/reviews/my/route.ts` - 내가 작성한 리뷰

- [ ] **리뷰 컴포넌트**
  - `lib/components/review/ReviewForm.tsx` - 리뷰 작성 폼
  - `lib/components/review/ReviewList.tsx` - 리뷰 목록
  - `lib/components/review/ReviewItem.tsx` - 개별 리뷰
  - `lib/components/review/StarRating.tsx` - 별점 평가
  - `lib/components/review/ReviewStats.tsx` - 리뷰 통계

### 4.3 관련 훅
- [ ] **상태 관리 훅**
  - `lib/hooks/use-favorites.ts` - 즐겨찾기 관리
  - `lib/hooks/use-reviews.ts` - 리뷰 관리
  - `lib/hooks/use-rating.ts` - 평점 관리

---

## 🏷️ Phase 5: 태그 시스템 (Week 5-6)

### 5.1 태그 관리
- [ ] **태그 API**
  - `app/api/tags/route.ts` - 태그 목록, 생성
  - `app/api/tags/popular/route.ts` - 인기 태그
  - `app/api/tags/[id]/recipes/route.ts` - 태그별 레시피

### 5.2 태그 컴포넌트
- [ ] **태그 UI 컴포넌트**
  - `lib/components/tag/TagInput.tsx` - 태그 입력
  - `lib/components/tag/TagList.tsx` - 태그 목록
  - `lib/components/tag/TagCloud.tsx` - 태그 클라우드
  - `lib/components/tag/PopularTags.tsx` - 인기 태그

### 5.3 태그 관련 훅
- [ ] **태그 관리 훅**
  - `lib/hooks/use-tags.ts` - 태그 데이터 관리

---

## 📱 Phase 6: 사용자 경험 개선 (Week 7-8)

### 6.1 마이페이지 확장
- [ ] **내 레시피 관리**
  - `app/profile/my-recipes/page.tsx` - 내가 작성한 레시피
  - `app/profile/my-reviews/page.tsx` - 내가 작성한 리뷰
  - 작성한 콘텐츠 통계 대시보드

### 6.2 통계 및 대시보드
- [ ] **통계 API**
  - `app/api/stats/dashboard/route.ts` - 개인 대시보드 통계
  - `app/api/stats/popular/route.ts` - 인기 콘텐츠

- [ ] **대시보드 컴포넌트**
  - `lib/components/dashboard/UserStats.tsx` - 사용자 통계
  - `lib/components/dashboard/PopularContent.tsx` - 인기 콘텐츠

### 6.3 알림 시스템 (선택사항)
- [ ] **실시간 알림**
  - Supabase Realtime을 활용한 실시간 알림
  - 새로운 리뷰, 즐겨찾기 알림
  - `lib/components/notification/NotificationCenter.tsx`

---

## 🎨 Phase 7: UI/UX 개선 및 반응형 최적화 (Week 7-8)

### 7.1 반응형 디자인 최적화
- [ ] **모바일 최적화**
  - 모든 페이지 모바일 반응형 테스트
  - 터치 친화적 UI 개선
  - 모바일 네비게이션 최적화

- [ ] **접근성 개선**
  - ARIA 라벨 추가
  - 키보드 네비게이션 지원
  - 스크린 리더 호환성 개선

### 7.2 성능 최적화
- [ ] **이미지 최적화**
  - Next.js Image 컴포넌트 적용
  - 지연 로딩 구현
  - WebP 포맷 지원

- [ ] **로딩 상태 개선**
  - Skeleton UI 구현
  - Loading Spinner 적용
  - Error Boundary 구현

### 7.3 공통 컴포넌트 완성
- [ ] **유틸리티 컴포넌트**
  - `lib/components/common/LoadingSpinner.tsx`
  - `lib/components/common/ErrorMessage.tsx`
  - `lib/components/common/Pagination.tsx`
  - `lib/components/common/ConfirmDialog.tsx`

---

## 🔧 Phase 8: 테스트 및 배포 준비 (Week 7-8)

### 8.1 데이터 검증 및 보안
- [ ] **입력 검증 스키마**
  - `lib/utils/validations.ts` - Zod 스키마 정의
  - 모든 API에 입력 검증 적용
  - XSS 및 CSRF 보호 강화

### 8.2 에러 처리 및 로깅
- [ ] **에러 처리 시스템**
  - 전역 에러 처리기 구현
  - 사용자 친화적 에러 메시지
  - 에러 로깅 시스템

### 8.3 환경 설정 및 배포
- [ ] **환경 변수 관리**
  - 개발/프로덕션 환경 분리
  - Vercel 환경 변수 설정

- [ ] **배포 최적화**
  - Next.js 빌드 최적화
  - SEO 메타데이터 설정
  - sitemap.xml 생성

---

## 📊 Phase 9: 추가 기능 및 확장 (향후 계획)

### 9.1 고급 검색 기능
- [ ] **AI 기반 추천**
  - 사용자 선호도 기반 레시피 추천
  - 유사 레시피 추천 알고리즘

### 9.2 소셜 기능
- [ ] **팔로우 시스템**
  - 사용자 팔로우/언팔로우
  - 팔로잉 사용자 레시피 피드

### 9.3 고급 콘텐츠 기능
- [ ] **레시피 컬렉션**
  - 테마별 레시피 모음
  - 사용자 정의 컬렉션 생성

- [ ] **영양 정보**
  - 칼로리 및 영양성분 계산
  - 건강한 레시피 필터링

---

## 🎯 우선순위 및 마일스톤

### High Priority (MVP 필수)
1. ✅ **기본 프로젝트 설정** (완료)
2. **Phase 1**: 인증 시스템 (Week 1-2)
3. **Phase 2**: 레시피 CRUD (Week 3-4)
4. **Phase 3**: 기본 검색 (Week 3-4)

### Medium Priority (중요 기능)
5. **Phase 4**: 즐겨찾기 및 리뷰 (Week 5-6)
6. **Phase 5**: 태그 시스템 (Week 5-6)
7. **Phase 6**: 사용자 경험 개선 (Week 7-8)

### Low Priority (부가 기능)
8. **Phase 7**: UI/UX 세부 개선 (Week 7-8)
9. **Phase 8**: 테스트 및 최적화 (Week 7-8)
10. **Phase 9**: 확장 기능 (향후)

---

## 🚀 다음 단계

현재 상태에서 바로 시작할 수 있는 작업:

1. **Supabase 프로젝트 설정** - 데이터베이스 스키마 생성
2. **인증 페이지 구현** - 로그인/회원가입 페이지
3. **레시피 목록 페이지** - 기본 레시피 CRUD 기능

이 Todo List는 프로젝트 진행에 따라 지속적으로 업데이트되며, 각 단계별로 완료 상태를 체크하여 프로젝트 진행 상황을 추적할 수 있습니다.