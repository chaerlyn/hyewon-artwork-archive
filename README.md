# Hyewon Artwork Archive
심혜원작가의 졸업전시에 전시용 개인 작품 아카이브로 제작한 웹사이트입니다.  

**Live Site**: https://chaerlyn.github.io/hyewon-artwork-archive/

## 프로젝트 소개
이 프로젝트는 작가 **심혜원**의 작업들을 아카이빙하기 위한 개인 웹사이트입니다.  
졸업 전시 및 2024–2025 작업들을 한곳에 모아, 큐레이션된 레이아웃과 모달 뷰를 통해 작품 이미지, 설명, 영상을 포함한 멀티미디어 아카이브를 제공합니다.

- 메인 섹션에서 아카이브의 타이틀과 연도를 소개
- About 섹션에서 작가 노트(국문/영문)와 테마, 키워드 명시
- Artwork 섹션에서 사진·영상 작업의 썸네일과 상세 보기 제공
- Artist 섹션에서 작가 기본 정보 및 학력 소개

---

## 주요 기능

### 1. 단일 페이지 네비게이션

- 상단 고정 헤더와 내비게이션 바
- `IntersectionObserver`를 사용해 현재 보고 있는 섹션에 따라 네비 링크에 `active` 클래스 자동 적용
- `Home / About / Artwork / Artist` 섹션으로 바로 이동 가능

### 2. Artwork 레이아웃

- Flex 기반 2열 레이아웃(`.artworks-wrap`, `.artworks-col`, `.artwork-row`)
- 각 작품 버튼에 `data-title`, `data-img` 속성을 부여해 JS에서 동적으로 처리
- JS에서 이미지 원본 비율을 읽어 `aspectRatio`를 설정하고, 배경 이미지는 항상 `cover`로 표시
- 데스크톱에서는 2컬럼 + 중간 가로 분할(p5/p4 같이 나란히 배치),  
  모바일에서는 컬럼이 세로로 자연스럽게 쌓이는 반응형 구조

### 3. 작품 상세 모달

- HTML `<dialog>` 엘리먼트를 활용한 모달 UI
- 작품 클릭 시:
  - 메인 이미지(`modal-image`) 로드
  - 추가 이미지가 있는 경우(`artworkAdditionalImages`) 두 번째 이미지(`modal-image-2`) 동적 로드
  - `artworkDescriptions` 객체에서 텍스트·메타 정보 매핑 후 표시
  - `artworkVideos`에 매핑된 유튜브 ID가 있으면 해당 작업의 영상 iframe 삽입
- 뒤로가기(`history.pushState`)와 ESC 키로 모달을 닫을 수 있도록 처리

### 4. 아카이브 텍스트/메타데이터 관리

- `artworkDescriptions` 객체에서 각 작품의 설명 텍스트와 메타 정보(제목, 연도, 재료, 크기 등)를 JS에서 관리
- `escapeHTML` 유틸 함수로 텍스트를 안전하게 HTML에 삽입
- 구조적으로 텍스트와 이미지를 분리해, 향후 텍스트 수정/추가가 용이함

### 5. 반응형 디자인

- CSS 커스텀 프로퍼티(`--bg`, `--fg`, `--muted`, `--maxw` 등)를 활용한 일관된 디자인
- 720px 이하에서:
  - 헤더 레이아웃 재배치
  - Artwork 섹션 1열 세로 레이아웃으로 전환
  - 모달 레이아웃도 세로 방향으로 단순화
- 1100px 이하에서 컬럼 간격 및 카드 간격 축소

---

## 기술 스택

- **Frontend**
  - HTML5
  - CSS3 (Flexbox, CSS Custom Properties, Media Queries)
  - Vanilla JavaScript
    - `IntersectionObserver`
    - `<dialog>` 모달
    - History API (`history.pushState`, `popstate`)
- **배포**
  - Netlify (정적 호스팅)

---

## 폴더 구조

```
hyewon-artwork-archive/
├── index.html              # 메인 HTML 파일
└── assets/
    ├── css/
    │   └── styles.css      # 스타일시트
    ├── js/
    │   └── main.js         # 메인 JavaScript 파일
    └── images/             # 작품 이미지 파일들
        ├── p1.jpg
        ├── p2.jpg
        ├── thumbnail1.png
        └── ...
```

## 제작자

Artist: Sim Hyewon (심혜원)

Developer: Chaerin Song (송채린)
