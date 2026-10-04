export interface ChecklistItem {
  id: string;
  title: string;
  description: string;
  actionDetails: string;
  recommendedTools: { name: string; url: string; note: string }[];
  proTip: string;
  commonPitfall: string;
  estimatedDays: string;
}

export interface RoadmapPhase {
  id: string;
  phaseNumber: number;
  title: string;
  subtitle: string;
  tagline: string;
  summary: string;
  duration: string;
  items: ChecklistItem[];
}

export const ROADMAP_PHASES: RoadmapPhase[] = [
  {
    id: "phase-1",
    phaseNumber: 1,
    title: "글로벌 아이디어 발굴 & 사전 검증",
    subtitle: "Idea & Market Demand Validation",
    tagline: "코드 한 줄 짜기 전에 실제 결제 의사가 있는 10명의 글로벌 고객을 확보하라",
    summary: "대부분의 개발자가 범하는 가장 큰 실수는 '만들고 나서 홍보하는 것'입니다. 글로벌 시장에서 월 $10~$50를 지불할 준비가 된 유저가 실제로 존재하는지 랜딩페이지와 커뮤니티 대화로 먼저 검증해야 합니다.",
    duration: "1 ~ 2주",
    items: [
      {
        id: "p1-1",
        title: "뾰족한 글로벌 페인포인트(Micro-Niche) 정의",
        description: "'모두를 위한 툴'이 아닌, 특정 직군/사용자의 명확한 1가지 고통을 해결하는 마이크로 SaaS 정의",
        actionDetails: "1) 타겟 사용자(예: Shopify 셀러, AI 프롬프트 엔지니어, 뉴스레터 발행자) 1개 그룹만 선택\n2) 그들이 매일 수작업으로 30분 이상 낭비하고 있는 반복 작업을 특정\n3) '이 작업 시간을 3분으로 단축해준다'는 단 하나의 가치 제안(Value Proposition)을 영문 1문장으로 정리",
        recommendedTools: [
          { name: "Indie Hackers", url: "https://www.indiehackers.com", note: "월 1천~5만 불 버는 인디 프로젝트 사례 분석" },
          { name: "Product Hunt", url: "https://www.producthunt.com", note: "최근 카테고리별 상위 랭킹 제품 리뷰 분석" },
          { name: "G2 / Capterra", url: "https://www.g2.com", note: "기존 유명 툴의 '1~3점짜리 불만 리뷰'에서 기회 포착" }
        ],
        proTip: "영미권 사용자는 '내 시간을 아껴주거나(ROI)' '돈을 더 벌어다 주는' B2B 기능에 지갑을 아주 쉽게 엽니다.",
        commonPitfall: "개발하기 재미있는 기술 중심(예: 화려한 애니메이션) 아이디어로 시작해 유저 니즈를 외면하는 것.",
        estimatedDays: "2~3일"
      },
      {
        id: "p1-2",
        title: "Reddit & X(Twitter) 수요 스캐닝 & 경쟁사 불만 수집",
        description: "해외 커뮤니티에서 사람들이 실제로 어떤 고통을 호소하고 있는지 실시간 질의응답 조사",
        actionDetails: "1) Reddit의 관련 서브레딧(r/SaaS, r/SideProject, r/webdev 등)에서 'is there a tool that...', 'tired of...' 검색\n2) 경쟁사 제품의 가격 정책 및 해외 유저들이 남긴 '이 기능 왜 없냐'는 코멘트 20개 스크랩\n3) 해외 유저들이 사용하는 자연스러운 영어 표현(용어)을 기록해 카피라이팅에 반영",
        recommendedTools: [
          { name: "Reddit Search", url: "https://www.reddit.com", note: "진솔한 사용자 피드백이 가장 많은 곳" },
          { name: "GummySearch", url: "https://gummysearch.com", note: "Reddit 고객 문제 검색 전문 도구" },
          { name: "X Advanced Search", url: "https://x.com", note: "#buildinpublic 및 실시간 불편 호소 트윗 탐색" }
        ],
        proTip: "Reddit에서 절대 스팸 홍보를 하지 마세요. '나도 이런 문제를 겪고 있는데 어떻게 해결하고 계신가요?'라는 질문형으로 신뢰를 얻어야 합니다.",
        commonPitfall: "국내 커뮤니티 반응만 보고 글로벌 시장도 같을 것이라 단정 짓는 실수.",
        estimatedDays: "2~3일"
      },
      {
        id: "p1-3",
        title: "영문 스모크 테스트(Smoke Test) 랜딩페이지 개설",
        description: "실제 제품 코드가 완성되기 전, 핵심 기능 3가지와 사전등록(Waitlist) 폼을 담은 단일 페이지 구축",
        actionDetails: "1) 영문 도메인 구매 (.com 또는 .io, .co, .ai)\n2) 헤드라인: '문제 해결 약속' + 서브헤드: '동작 원리' + CTA: 'Join Waitlist (Early Bird 50% Off)'\n3) 유저 유입 경로 추적을 위한 간단한 애널리틱스 연동",
        recommendedTools: [
          { name: "Framer", url: "https://www.framer.com", note: "코딩 없이 3시간 만에 고품질 영문 랜딩 구축" },
          { name: "Tally Forms", url: "https://tally.so", note: "무료로 멋진 이메일 수집 폼 생성" },
          { name: "Loops.so", url: "https://loops.so", note: "SaaS 전용 세련된 이메일 자동화" }
        ],
        proTip: "얼리버드 할인 혜택(평생 50% 할인 등)을 명시하면 가입 전환율(Conversion Rate)이 3~5배 이상 상승합니다.",
        commonPitfall: "개발부터 다 해놓고 런칭일에 아무도 모르는 웹사이트를 여는 것. 사전 대기자 50명 이상을 먼저 모으세요.",
        estimatedDays: "1~2일"
      }
    ]
  },
  {
    id: "phase-2",
    phaseNumber: 2,
    title: "글로벌 확장형 기술 스택 선정 & MVP 빌드",
    subtitle: "Scalable Global Stack & Fast MVP",
    tagline: "전 세계 100ms 미만 지연시간과 1인 개발 운영 자동화를 위한 최소 실행 제품(MVP)",
    summary: "글로벌 유저는 3초 이상 로딩이 걸리면 즉시 이탈합니다. 클라우드 엣지 배포(Vercel, Cloudflare)와 BaaS(Supabase, Firebase)를 활용해 서버 관리 비용 없이 3주 안에 핵심 가치를 완성하세요.",
    duration: "2 ~ 4주",
    items: [
      {
        id: "p2-1",
        title: "1인 개발자 최적화 모던 프론트엔드 & 풀스택 프레임워크",
        description: "Next.js (App Router) 또는 Vite + React + Tailwind CSS를 통한 빠른 UI 구축",
        actionDetails: "1) SEO 최적화와 글로벌 엣지 렌더링이 필수적인 B2B/B2C는 Next.js 추천\n2) 대시보드 중심 고성능 단일 페이지 앱(SPA)은 Vite + React + Tailwind CSS 조합 추천\n3) 컴포넌트는 커스텀 구현 또는 headless 접근성 컴포넌트(Radix UI/Lucide) 활용",
        recommendedTools: [
          { name: "Next.js", url: "https://nextjs.org", note: "SSR/SSG 및 강력한 글로벌 Vercel 엣지 배포" },
          { name: "Vite + React", url: "https://vitejs.dev", note: "초고속 개발 환경과 가벼운 번들 사이즈" },
          { name: "Tailwind CSS", url: "https://tailwindcss.com", note: "클래스 기반 빠른 반응형 스타일링" }
        ],
        proTip: "처음부터 완벽한 디자인 시스템을 짜려고 하지 마세요. 핵심 기능의 '입력 -> 결과 출력' 속도가 훨씬 중요합니다.",
        commonPitfall: "백엔드 프레임워크와 마이크로서비스를 과도하게 분리해 배포와 디버깅 복잡도를 키우는 것.",
        estimatedDays: "3~5일"
      },
      {
        id: "p2-2",
        title: "서버리스 BaaS & 전 세계 Edge 데이터베이스 구축",
        description: "Supabase(PostgreSQL) 또는 Firebase를 활용하여 인프라 관리 없이 실시간 DB와 Auth 구축",
        actionDetails: "1) Supabase 프로젝트 생성 (미국 서부/동부 또는 유럽 등 타겟 유저에 가까운 리전 선택)\n2) Row Level Security (RLS) 활성화로 프론트엔드 직접 쿼리 시 보안 보장\n3) Cloudflare Edge 캐싱을 통해 전 세계 정적 에셋 및 API 응답 가속",
        recommendedTools: [
          { name: "Supabase", url: "https://supabase.com", note: "PostgreSQL 기반 오픈소스 Firebase 대안" },
          { name: "Cloudflare", url: "https://cloudflare.com", note: "무료 전 세계 CDN, DNS, DDoS 방어" },
          { name: "Vercel / Cloud Run", url: "https://vercel.com", note: "Git Push 한 번으로 전 세계 자동 배포" }
        ],
        proTip: "타겟이 미국/유럽이라면 DB 리전을 절대 서울(ap-northeast-2)로 잡지 마세요. 미국 동부(us-east-1)나 중서부가 글로벌 평균 레이턴시가 가장 우수합니다.",
        commonPitfall: "데이터베이스 RLS(행 단위 보안)를 끄고 배포하여 사용자 개인 데이터가 유출되는 보안 사고.",
        estimatedDays: "2~3일"
      },
      {
        id: "p2-3",
        title: "글로벌 소셜 로그인 (Google, GitHub, Apple OAuth)",
        description: "해외 유저는 복잡한 회원가입 양식과 비밀번호 입력을 기피합니다. 1-Click 인증 필수",
        actionDetails: "1) Google Cloud Console 및 GitHub Developer Settings에서 OAuth App 생성\n2) Supabase Auth / Clerk / NextAuth 연동으로 원클릭 로그인 완성\n3) 이메일 인증 절차를 최소화하고 가입 즉시 대시보드로 진입시키는 Frictionless Onboarding 설계",
        recommendedTools: [
          { name: "Clerk", url: "https://clerk.com", note: "SaaS 인증, 권한 관리, 조직(Org) 지원 최강 솔루션" },
          { name: "Supabase Auth", url: "https://supabase.com/auth", note: "DB와 완벽히 통합된 무료 OAuth 계층" }
        ],
        proTip: "B2B SaaS라면 Google Workspace 로그인과 GitHub 로그인이 가입자의 80% 이상을 차지합니다.",
        commonPitfall: "이메일 인증 링크를 보내고 기다리게 하는 가입 플로우. 이탈률이 40% 이상 폭증합니다.",
        estimatedDays: "1~2일"
      },
      {
        id: "p2-4",
        title: "다국어(i18n) & 타임존/통화 구조화",
        description: "기본 언어는 100% 영어(EN)로 시작하고, 날짜/시간은 UTC 기준 저장 후 유저 로컬 타임존 변환",
        actionDetails: "1) 코드 내 하드코딩된 한글 텍스트 금지 (i18n json 키 구조로 분리)\n2) 기본 영문(en-US)으로 완벽 검수 (Grammarly 등으로 어색한 문법 교정)\n3) 통화 표기는 무조건 USD($) 기준 설계",
        recommendedTools: [
          { name: "i18next / next-intl", url: "https://www.i18next.com", note: "가장 널리 쓰이는 리액트 다국어 라이브러리" },
          { name: "Grammarly", url: "https://www.grammarly.com", note: "자연스러운 영문 SaaS 카피라이팅 검수" }
        ],
        proTip: "영어가 완벽하지 않아도 괜찮습니다. 요즘 글로벌 유저는 간결하고 직관적인 단문(Micro-copy)을 선호합니다.",
        commonPitfall: "한국어로 만들고 나중에 영어로 번역하려는 계획. 처음부터 영어로 설계하는 것이 10배 빠릅니다.",
        estimatedDays: "1~2일"
      }
    ]
  },
  {
    id: "phase-3",
    phaseNumber: 3,
    title: "글로벌 결제 연동 & 수익화 비즈니스 모델",
    subtitle: "Global Payments & Monetization Engines",
    tagline: "해외 부가세(EU VAT/US Sales Tax) 세무 지옥을 피하고 달러(USD) 정산을 자동화하라",
    summary: "한국 거주 1인 개발자가 글로벌 결제를 받을 때 가장 안전하고 빠른 방법은 'Merchant of Record(MoR)'인 Lemon Squeezy 또는 Paddle을 사용하는 것입니다. 전 세계 100개국 이상의 세금 징수와 송장 발행을 법적으로 대신해 줍니다.",
    duration: "1 ~ 2주",
    items: [
      {
        id: "p3-1",
        title: "결제 게이트웨이(PG) vs 판매대행(MoR) 전략 선택",
        description: "Stripe 직접 연동과 Lemon Squeezy / Paddle (MoR) 간의 실전 차이 이해 및 선정",
        actionDetails: "1) 한국 개인사업자/개인: Lemon Squeezy(또는 Paddle) 강력 추천. 전 세계 부가세(VAT), 송장, 환불 규정 법적 책임 대행\n2) 미국 법인(LLC) 보유 시: Stripe 직접 연동 (수수료 2.9%+$0.30, 가장 높은 유연성)\n3) 웹훅(Webhook) 핸들러 구현: checkout.completed, subscription.updated, subscription.deleted",
        recommendedTools: [
          { name: "Lemon Squeezy", url: "https://www.lemonsqueezy.com", note: "한국 계좌 직접 입금 지원, 글로벌 세무 100% 대행" },
          { name: "Paddle", url: "https://www.paddle.com", note: "글로벌 B2B SaaS에 최적화된 MoR 결제사" },
          { name: "Stripe", url: "https://stripe.com", note: "세계 표준 결제 인프라 (미국 법인 또는 지원 국가 필수)" }
        ],
        proTip: "Lemon Squeezy는 수수료가 5% + 50¢로 Stripe보다 약간 높지만, 유럽 각국의 VAT 신고 비용(수백만 원)과 회계사 수임료를 감안하면 1인 개발자에게 압도적으로 이득입니다.",
        commonPitfall: "국내 PG사(이니시스, 토스페이먼츠 등)로 글로벌 결제를 받으려는 시도. 해외 유저는 친숙하지 않은 결제창에서 99% 이탈합니다.",
        estimatedDays: "2~3일"
      },
      {
        id: "p3-2",
        title: "가격 정책(Pricing) 설계 & 심리적 티어링",
        description: "Freemium vs Free Trial vs Usage-Based 크레딧 모델 중 최적의 가격 구조 도출",
        actionDetails: "1) 무료 티어(Free): 핵심 기능을 맛볼 수 있는 제한된 용량 (예: 월 3회 무료, 워터마크 포함)\n2) 유료 프로 티어(Pro): $9 ~ $29/mo (개인 프로페셔널이 카드 긁기에 저항감 없는 가격대)\n3) 팀/비즈니스 티어(Team): $79 ~ $149/mo (API 접근, 우선 지원, 협업 기능)\n4) 연간 결제(Annual Billing): 2개월 무료(약 17~20% 할인) 옵션을 기본 토글로 배치",
        recommendedTools: [
          { name: "PriceIntelligently", url: "https://www.paddle.com/price-intelligently", note: "SaaS 가격 책정 프레임워크" },
          { name: "OpenView Benchmarks", url: "https://openviewpartners.com", note: "글로벌 SaaS 가격 벤치마크 리포트" }
        ],
        proTip: "절대 $3, $5와 같은 푼돈 가격으로 책정하지 마세요. CS 비용만 늘어납니다. 최소 $9~$15 이상으로 시작하고 점진적으로 올리세요.",
        commonPitfall: "모든 기능을 무제한 무료로 풀고 '나중에 유저 많아지면 유료화해야지' 하는 착각. 무료 유저는 유료화 시 분노하며 떠납니다.",
        estimatedDays: "1~2일"
      },
      {
        id: "p3-3",
        title: "구독 포털(Customer Portal) & 결제 실패(Dunning) 방지",
        description: "유저가 직접 카드 변경, 구독 취소, 영수증 다운로드를 할 수 있는 셀프 서비스 포털 구축",
        actionDetails: "1) Lemon Squeezy / Stripe의 빌트인 Customer Portal URL을 유저 설정 페이지에 링크\n2) 카드 한도 초과 또는 유효기간 만료 시 자동 이메일 재청구(Smart Retries/Dunning) 설정\n3) 구독 취소 시 할인 제안(Cancellation Flow)으로 이탈 15% 방어",
        recommendedTools: [
          { name: "Stripe Billing / Customer Portal", url: "https://stripe.com/billing", note: "카드 변경 및 청구서 다운로드 제공" },
          { name: "ChiliPiper / Churnkey", url: "https://churnkey.co", note: "구독 취소 유저 방어 솔루션" }
        ],
        proTip: "구독 취소 버튼을 숨기지 마세요. 취소가 쉬울수록 재가입 확률이 2배 높아집니다.",
        commonPitfall: "웹훅 실패 시 DB 권한이 유료로 남아 있거나, 유료 결제했는데 권한이 갱신되지 않는 동기화 버그.",
        estimatedDays: "1~2일"
      }
    ]
  },
  {
    id: "phase-4",
    phaseNumber: 4,
    title: "글로벌 법적 컴플라이언스, 보안 & 신뢰 인프라",
    subtitle: "Global Compliance, Privacy & Trust",
    tagline: "해외 유저와 결제사가 신뢰할 수 있는 합법적이고 안전한 서비스 체계",
    summary: "유럽의 GDPR과 미국의 CCPA는 단순한 권고가 아닙니다. 이용약관, 개인정보처리방침, 환불 규정이 없는 서비스는 결제사 심사에서 거절당하거나 심각한 벌금 위험에 노출됩니다.",
    duration: "3 ~ 5일",
    items: [
      {
        id: "p4-1",
        title: "글로벌 약관 & GDPR/CCPA 개인정보처리방침 구비",
        description: "Terms of Service, Privacy Policy, Cookie Policy, Refund Policy 4종 세트 게시",
        actionDetails: "1) 사이트 푸터(Footer)에 항상 접근 가능한 영문 약관 링크 4개 배치\n2) 수집하는 데이터(이메일, 사용 로그, 결제 정보 등)와 제3자 전송(Analytics, AI API) 명시\n3) 환불 정책: '7일 이내 무조건 환불' 또는 '미사용 크레딧 환불' 등 명확한 조건 고지",
        recommendedTools: [
          { name: "Termly", url: "https://termly.io", note: "글로벌 법률 준수 정책 무료 생성기" },
          { name: "Iubenda", url: "https://www.iubenda.com", note: "쿠키 배너 및 자동 법률 업데이트 지원" },
          { name: "BaseTemplates Privacy", url: "https://www.basetemplates.com", note: "SaaS 전용 변호사 검수 약관 템플릿" }
        ],
        proTip: "Lemon Squeezy나 Stripe 심사 시 웹사이트에 Contact Us(실제 이메일), Privacy Policy, Terms, Refund Policy가 없으면 계정이 즉시 정지됩니다.",
        commonPitfall: "타사 약관을 그냥 복사해서 회사 이름만 바꾸는 행위. 자사 서비스에 맞지 않는 조항으로 법적 분쟁 시 보호받지 못합니다.",
        estimatedDays: "1~2일"
      },
      {
        id: "p4-2",
        title: "신뢰도 높은 도메인 & 프로페셔널 이메일 세팅",
        description: "무료 도메인이나 gmail.com이 아닌 자체 도메인 기반 서포트 이메일 구축",
        actionDetails: "1) 기억하기 쉬운 .com, .io, .co, .ai 도메인 연결 (Cloudflare DNS 권장)\n2) support@yourdomain.com, founders@yourdomain.com 설정\n3) SPF, DKIM, DMARC 레코드 설정으로 이메일이 스팸함으로 빠지는 현상 방지",
        recommendedTools: [
          { name: "Cloudflare Registrar", url: "https://www.cloudflare.com/products/registrar/", note: "마진 없이 원가로 도메인 등록" },
          { name: "Resend", url: "https://resend.com", note: "개발자를 위한 모던 트랜잭셔널 이메일 API" },
          { name: "Google Workspace / Zoho Mail", url: "https://www.zoho.com/mail/", note: "자체 도메인 이메일 계정 호스팅" }
        ],
        proTip: "Resend를 사용하면 React 코드로 환영 이메일, 결제 알림을 아름답게 렌더링해서 전송할 수 있습니다.",
        commonPitfall: "SPF/DKIM 설정을 누락해 가입 환영 메일이 유저의 Gmail 스팸함으로 직행하는 것.",
        estimatedDays: "1일"
      },
      {
        id: "p4-3",
        title: "실시간 고객 지원(Live Chat) & 피드백 수집창",
        description: "해외 고객의 질문에 즉시 대응하고 신뢰를 심어줄 수 있는 가벼운 위젯 설치",
        actionDetails: "1) 웹사이트 우측 하단에 Crisp 또는 Intercom 무료 플랜 설치\n2) 'Founders usually reply in a few hours' 문구로 시차에 대한 양해 안내\n3) 첫 메시지 자동 응답 FAQ 및 디스코드/슬랙 커뮤니티 초대 링크 연동",
        recommendedTools: [
          { name: "Crisp Chat", url: "https://crisp.chat", note: "무료 티어가 넉넉하고 가벼운 글로벌 라이브챗" },
          { name: "Tawk.to", url: "https://www.tawk.to", note: "완전 무료 100% 라이브챗" }
        ],
        proTip: "초기 100명의 유저에게는 파운더가 직접 5분 내에 답장해 보세요. 감동받은 유저가 트위터에 자발적으로 홍보해 줍니다.",
        commonPitfall: "연락할 창구가 없어 버그가 발생했을 때 유저가 조용히 구독을 취소하는 상황.",
        estimatedDays: "1일"
      }
    ]
  },
  {
    id: "phase-5",
    phaseNumber: 5,
    title: "글로벌 GTM(Go-To-Market) & 런칭 캠페인",
    subtitle: "Launch Day & Traffic Acquisition",
    tagline: "Product Hunt, Hacker News, Reddit을 관통하는 3단계 글로벌 트래픽 폭풍",
    summary: "세계적인 인디 해커들은 '소프트 런칭 -> 피드백 수정 -> 공식 Product Hunt 런칭 -> 디렉토리 배포'의 공식을 따릅니다. 단 하루 만에 수천 명의 글로벌 방문자와 첫 10명의 유료 결제자를 만들어내는 실행 전략입니다.",
    duration: "1 ~ 2주",
    items: [
      {
        id: "p5-1",
        title: "Product Hunt(PH) 런칭 A to Z 준비",
        description: "전 세계 스타트업과 얼리어답터 50만 명이 매일 모이는 런칭 성지 정복",
        actionDetails: "1) 런칭 시간: 샌프란시스코 기준 00:01 AM PT (한국 시간 오후 4시 또는 5시 정각) 런칭\n2) 에셋 준비: 로고(240x240 GIF/PNG), 갤러리 이미지 5장(1270x760), 30초 데모 비디오\n3) 첫 번째 댓글(Maker's Comment): '왜 이 문제를 풀게 되었는가'에 대한 진솔한 스토리와 독점 프로모션 코드 제공\n4) 글로벌 지인 및 Waitlist 대기자들에게 뉴스레터 발송",
        recommendedTools: [
          { name: "Product Hunt", url: "https://www.producthunt.com", note: "글로벌 런칭의 필수 코스" },
          { name: "PreviewHunt", url: "https://previewhunt.com", note: "PH 런칭 페이지 미리보기 및 에셋 검수" },
          { name: "Screen Studio", url: "https://www.screen.studio", note: "부드러운 카메라 줌이 들어간 30초 데모 영상 제작" }
        ],
        proTip: "절대 'Upvote 부탁합니다'라고 직접 링크를 보내지 마세요. PH 알고리즘에 어뷰징으로 감지되어 순위에서 강등당합니다. '우리가 오늘 PH에 런칭했으니 피드백을 들려주세요'라고 요청해야 합니다.",
        commonPitfall: "준비 없이 목요일/금요일에 대충 런칭하고 Top 5 안에 못 드는 것. 화요일~수요일이 경쟁은 치열하지만 트래픽이 가장 큽니다.",
        estimatedDays: "3~4일"
      },
      {
        id: "p5-2",
        title: "Reddit & Hacker News 'Show HN' 스토리텔링 런칭",
        description: "엔지니어와 얼리어답터 집단에 솔직한 기술적 배경과 제품을 소개하는 바이럴 기법",
        actionDetails: "1) Hacker News: 'Show HN: [제품명] – [단 하나의 명확한 가치 설명]' 형식으로 포스팅\n2) 상업적 광고 문구 배제하고 아키텍처, 겪었던 기술적 난관, 오픈소스 기여 등 엔지니어 관점 공유\n3) Reddit: r/SideProject, r/InternetIsBeautiful에 1인 개발 과정 스크린샷과 함께 포스팅",
        recommendedTools: [
          { name: "Hacker News", url: "https://news.ycombinator.com", note: "가장 엄격하지만 터지면 1만 명 이상의 동시접속 발생" },
          { name: "Reddit r/SideProject", url: "https://www.reddit.com/r/SideProject/", note: "인디 빌더들을 가장 따뜻하게 응원해주는 서브레딧" }
        ],
        proTip: "HN과 Reddit에서는 '비판을 환영합니다'라는 태도를 보여주면 공격적인 댓글러들이 순식간에 가장 열렬한 조언자로 바뀝니다.",
        commonPitfall: "상투적인 마케팅 문구('The revolutionary AI tool for...')를 쓰는 순간 즉시 다운보트 폭격을 맞습니다.",
        estimatedDays: "2일"
      },
      {
        id: "p5-3",
        title: "글로벌 AI 및 SaaS 디렉토리 50곳 일괄 등록",
        description: "한 번 등록해 두면 지속적인 백링크(Backlink)와 검색 트래픽을 유입시키는 SEO 엔진 구축",
        actionDetails: "1) AI 관련 서비스라면 There's An AI For That, Futurepedia, Toolify 등록\n2) 범용 SaaS라면 SaaSHub, AlternativeTo, BetaList 등록\n3) 도메인 권위도(Domain Authority)를 빠르게 올려 구글 검색 노출 기반 확보",
        recommendedTools: [
          { name: "There's An AI For That", url: "https://theresanaiforthat.com", note: "세계 최대 AI 툴 디렉토리" },
          { name: "Toolify.ai", url: "https://www.toolify.ai", note: "수백만 트래픽의 글로벌 AI 디렉토리" },
          { name: "AlternativeTo", url: "https://alternativeto.net", note: "기존 유명 툴의 '대안'으로 노출되는 채널" }
        ],
        proTip: "디렉토리에 등록할 때는 각 사이트마다 설명문을 조금씩 다르게 변형해야 구글의 중복 콘텐츠 페널티를 피할 수 있습니다.",
        commonPitfall: "유료 급행 등록비($50~$200)를 초기에 너무 많이 쓰는 것. 무료 제출 옵션부터 차근차근 진행하세요.",
        estimatedDays: "2~3일"
      },
      {
        id: "p5-4",
        title: "X(Twitter) #buildinpublic 빌더 네트워크 구축",
        description: "개발 과정, 실패한 시도, 첫 유료 결제 스크린샷을 투명하게 공유하며 팬덤 형성",
        actionDetails: "1) 매일 1개의 개발 진행 상황 또는 배운 점 트윗 작성\n2) 비슷한 단계의 글로벌 인디 해커들과 상호 댓글로 소통\n3) 첫 번째 $1 달러 결제 달성 시 Stripe/Lemon Squeezy 알림 캡처 공유 (가장 바이럴이 잘 되는 콘텐츠)",
        recommendedTools: [
          { name: "Typefully", url: "https://typefully.com", note: "X/트위터 스레드 작성 및 예약 발행 도구" },
          { name: "X Analytics", url: "https://analytics.x.com", note: "반응 좋은 트윗 분석" }
        ],
        proTip: "숫자를 공개하세요. '방문자 300명 중 첫 유료 결제자 1명 발생, 전환율 0.33%' 같은 솔직한 데이터가 가장 높은 리트윗을 받습니다.",
        commonPitfall: "자기 제품 홍보 링크만 앵무새처럼 트윗하는 계정. 아무도 팔로우하지 않습니다.",
        estimatedDays: "지속적 (매일 15분)"
      }
    ]
  },
  {
    id: "phase-6",
    phaseNumber: 6,
    title: "성장 지표 측정, 이탈 방지 & 스케일업",
    subtitle: "Unit Economics, Retention & Scaling to $10k MRR",
    tagline: "유입된 트래픽을 유료 고객으로 전환하고 월간 반복 매출(MRR) 복리를 만들어라",
    summary: "진짜 사업은 런칭 다음 날부터 시작됩니다. 유저가 서비스에 가입하고 60초 안에 '와, 대단한데?'(Aha! Moment)를 느끼지 못하면 영원히 결제하지 않습니다. 지표 분석과 지속적인 피드백 루프로 이탈률을 5% 미만으로 낮추세요.",
    duration: "지속적 (반복 주기)",
    items: [
      {
        id: "p6-1",
        title: "제품 내 세션 리플레이 & 유저 행동 분석 (PostHog)",
        description: "유저들이 어디서 클릭하다 멈추는지, 어떤 단계에서 가입을 포기하는지 눈으로 직접 확인",
        actionDetails: "1) PostHog 스크립트 1줄 설치 (GDPR 완벽 준수 및 세션 녹화 무료 제공)\n2) 가입 퍼널(Funnel) 설정: 랜딩 방문 -> 가입 클릭 -> 첫 작업 완료 -> 결제 페이지 도달\n3) 결제 페이지까지 왔다가 이탈한 유저들의 녹화 세션 10개를 시청하고 문제점 파악",
        recommendedTools: [
          { name: "PostHog", url: "https://posthog.com", note: "세션 리플레이, 기능 플래그, 퍼널 분석 올인원" },
          { name: "Plausible Analytics", url: "https://plausible.io", note: "쿠키 배너가 필요 없는 초경량 프라이버시 통계" }
        ],
        proTip: "숫자 그래프 100개 보는 것보다 실제 유저 마우스 움직임 녹화 3편 보는 것이 버그와 마찰을 10배 빨리 찾아냅니다.",
        commonPitfall: "Google Analytics 4를 어렵게 세팅해두고 대시보드를 한 번도 안 보는 것. PostHog 같은 직관적인 툴을 쓰세요.",
        estimatedDays: "1~2일"
      },
      {
        id: "p6-2",
        title: "60초 온보딩 아하 모먼트(Aha! Moment) 극대화",
        description: "가입 후 빈 화면(Empty State)을 보여주지 않고 즉시 샘플 데이터를 채워 가치를 체감시키기",
        actionDetails: "1) 튜토리얼 팝업 대신 '원클릭 샘플 프로젝트 불러오기' 버튼 제공\n2) 유저가 첫 번째 작업을 성공적으로 끝냈을 때 축하 애니메이션(Confetti)과 공유 버튼 유도\n3) 핵심 기능 실행까지 클릭 수(Clicks to Value)를 3회 이하로 단축",
        recommendedTools: [
          { name: "Canvas Confetti", url: "https://www.npmjs.com/package/canvas-confetti", note: "작업 완료 시 기쁨을 주는 이펙트" },
          { name: "CommandBar / CopilotKit", url: "https://www.commandbar.com", note: "앱 내 유저 온보딩 가이드" }
        ],
        proTip: "최고의 온보딩은 설명서가 필요 없는 인터페이스입니다. 버튼에 친절한 힌트 문구를 넣으세요.",
        commonPitfall: "가입하자마자 장문의 튜토리얼 모달 7단계를 강제로 넘기게 하는 것. 90%가 'Skip' 누르고 이탈합니다.",
        estimatedDays: "2~3일"
      },
      {
        id: "p6-3",
        title: "첫 10명 유료 고객 인터뷰 & 가격 인상 실험",
        description: "실제 돈을 낸 고객에게 왜 결제했는지 묻고, 다음 기수부터 가격을 점진적으로 인상",
        actionDetails: "1) 결제 즉시 자동 감사 이메일 발송: '이 툴을 왜 결제하셨나요? 가장 원하시는 기능은?'\n2) 초기 유저는 '기존 가격 평생 유지(Grandfathering)'를 약속하고, 신규 가입자 대상 가격을 30~50% 인상 실험\n3) 피드백 보드(Featurebase/Canny)를 열어 유저들이 원하는 기능 투표 유도",
        recommendedTools: [
          { name: "Featurebase", url: "https://www.featurebase.app", note: "유저 기능 요청 및 로드맵 투표 보드" },
          { name: "Cal.com", url: "https://cal.com", note: "15분 고객 화상 인터뷰 일정 조율" }
        ],
        proTip: "초기 서비스는 거의 100% 본래 가치보다 너무 싸게 책정되어 있습니다. 가격을 2배 올려도 전환율이 유지되는 마법을 경험해보세요.",
        commonPitfall: "고객 피드백을 수렴하지 않고 혼자만의 상상으로 복잡한 기능을 계속 추가하는 Feature Creep 함정.",
        estimatedDays: "지속적"
      }
    ]
  }
];

export interface TechStackPreset {
  id: string;
  name: string;
  targetType: string;
  description: string;
  frontend: string;
  backend: string;
  database: string;
  hosting: string;
  auth: string;
  payment: string;
  analytics: string;
  monthlyCost: string;
  bestFor: string;
}

export const TECH_STACK_PRESETS: TechStackPreset[] = [
  {
    id: "ai-saas",
    name: "글로벌 AI SaaS 스택 (가장 추천)",
    targetType: "AI 툴 / 이미지 / 텍스트 생성 / 업무 자동화",
    description: "Gemini / OpenAI API를 호출하여 프롬프트 결과나 자동화 기능을 제공하고 구독료나 토큰 크레딧으로 수익화하는 최신 아키텍처",
    frontend: "Next.js (App Router) + Tailwind CSS + Lucide Icons",
    backend: "Next.js API Routes (Serverless) + Supabase Edge Functions",
    database: "Supabase (PostgreSQL + pgvector 벡터 검색)",
    hosting: "Vercel (전 세계 Edge Network)",
    auth: "Clerk 또는 Supabase Auth (Google 1-Click)",
    payment: "Lemon Squeezy (MoR 세무 대행 + 크레딧/구독)",
    analytics: "PostHog (세션 리플레이 + 퍼널)",
    monthlyCost: "$0 ~ $15 (초기 무료 티어로 시작 가능)",
    bestFor: "AI 래퍼 서비스, 프롬프트 엔지니어링 툴, 소셜 미디어 생성기"
  },
  {
    id: "micro-utility",
    name: "초경량 마이크로 유틸리티 툴",
    targetType: "개발자 도구 / PDF 변환 / 미디어 압축 / 계산기",
    description: "서버 유지비 $0으로 운영 가능한 브라우저 기반 고속 단일 페이지 웹앱. 단순하지만 지속적인 트래픽과 평생 이용권(LTD) 결제에 최적",
    frontend: "Vite + React + Tailwind CSS (초경량 번들)",
    backend: "Cloudflare Workers (서버리스 엣지 함수)",
    database: "Cloudflare D1 (SQLite) 또는 Supabase Free",
    hosting: "Cloudflare Pages (100% 무료 무제한 대역폭)",
    auth: "Supabase Auth (필요시)",
    payment: "Lemon Squeezy (단건 결제 $9~$29)",
    analytics: "Plausible 또는 PostHog",
    monthlyCost: "$0 (트래픽이 폭증해도 무료)",
    bestFor: "SEO 기반 검색 유입 툴, 크롬 확장 프로그램 연동 웹앱"
  },
  {
    id: "b2b-saas",
    name: "B2B 엔터프라이즈 워크스페이스",
    targetType: "팀 협업 / 데이터 대시보드 / CRM / 프로젝트 관리",
    description: "팀 단위 권한(RBAC), 조직(Organization) 관리, 감사 로그, 안정적인 관계형 DB가 필요한 본격적인 B2B 소프트웨어",
    frontend: "Next.js + TanStack Table + Tailwind CSS",
    backend: "Next.js API + Node.js (또는 Go/Python 마이크로서비스)",
    database: "PostgreSQL (Supabase 또는 AWS RDS / Cloud SQL)",
    hosting: "Vercel Pro ($20/mo) 또는 AWS / Cloud Run",
    auth: "Clerk (Multi-tenant 조직 초대, SAML SSO)",
    payment: "Paddle 또는 Stripe (B2B 인보이스 및 좌석당 과금)",
    analytics: "PostHog Enterprise + Mixpanel",
    monthlyCost: "$25 ~ $50 / 월",
    bestFor: "회사 단위 월 $49~$199 청구 B2B 생산성 툴"
  },
  {
    id: "community-directory",
    name: "글로벌 디렉토리 & 큐레이션 플랫폼",
    targetType: "AI 디렉토리 / 구인구직 / 리소스 큐레이션 / 뉴스레터",
    description: "검색엔진 최적화(SEO)로 트래픽을 모으고, 스폰서 광고 및 유료 등록(Featured Listing)으로 수익을 창출하는 모델",
    frontend: "Next.js (SSG 정적 페이지 생성으로 초고속 SEO)",
    backend: "Supabase / Headless CMS",
    database: "PostgreSQL + Algolia / Meilisearch",
    hosting: "Vercel",
    auth: "Supabase Auth",
    payment: "Stripe 또는 Lemon Squeezy (스폰서 배너 결제)",
    analytics: "Google Analytics 4 + PostHog",
    monthlyCost: "$0 ~ $20 / 월",
    bestFor: "프로그래매틱 SEO 사이트, 특정 틈새시장 디렉토리"
  }
];

export interface LaunchDayPlan {
  day: string;
  phase: string;
  focus: string;
  tasks: string[];
  keyAsset: string;
}

export const LAUNCH_14_DAYS_PLAN: LaunchDayPlan[] = [
  {
    day: "D - 14",
    phase: "기반 다지기",
    focus: "랜딩페이지 오픈 & 소셜 핸들 점유",
    tasks: [
      "영문 도메인 연결 및 SSL 보안 확인",
      "X(Twitter), LinkedIn, Product Hunt Maker 프로필 생성",
      "스모크 테스트 랜딩페이지에 얼리버드 대기자(Waitlist) 수집 폼 게시"
    ],
    keyAsset: "랜딩페이지 URL & 로고 에셋"
  },
  {
    day: "D - 10",
    phase: "비공개 베타",
    focus: "소프트 런칭 & 지인/커뮤니티 1차 테스트",
    tasks: [
      "친한 개발자 또는 이전 직장 동료 10명에게 비공개 초대 링크 발송",
      "가입부터 핵심 기능 실행까지 마찰(Friction) 기록 및 치명적 버그 수정",
      "결제 테스트 모드(Stripe Test Clock / Lemon Squeezy Sandbox) 검증"
    ],
    keyAsset: "피드백 설문 링크 (Tally/Typeform)"
  },
  {
    day: "D - 7",
    phase: "에셋 패키징",
    focus: "Product Hunt 런칭 에셋 완성",
    tasks: [
      "1270x760 갤러리 이미지 5장 제작 (기능별 핵심 가치 캡처)",
      "240x240 정방형 로고 애니메이션 GIF 제작",
      "30초 분량의 텍스트 오버레이 데모 비디오 녹화 (Screen Studio 활용)",
      "Maker's First Comment 초안 작성 (문제 정의, 비하인드 스토리)"
    ],
    keyAsset: "Product Hunt 에셋 폴더 & 데모 영상"
  },
  {
    day: "D - 3",
    phase: "대기자 알림",
    focus: "Waitlist 사전 예고 & 런칭 특가 프로모션 코드 생성",
    tasks: [
      "이메일 대기자들에게 '3일 뒤 공식 런칭 & 50% 평생 할인 코드' 티저 메일 발송",
      "결제사 프로모션 코드(예: LAUNCH50) 활성화 확인",
      "사이트 이용약관, 개인정보처리방침, 환불 규정 최종 점검"
    ],
    keyAsset: "런칭 티저 이메일 (Loops/Resend)"
  },
  {
    day: "D - 1",
    phase: "최종 리허설",
    focus: "서버 모니터링 & 시간대 동기화",
    tasks: [
      "Product Hunt 예약(Scheduled Launch) 설정 (샌프란시스코 00:01 PT = 한국 오후 4~5시)",
      "Cloudflare 캐시 및 Vercel 배포 안정성 확인",
      "알림 봇 (디스코드/슬랙 웹훅으로 실시간 가입/결제 수신) 연동"
    ],
    keyAsset: "실시간 알림 웹훅"
  },
  {
    day: "D - DAY",
    phase: "공식 런칭",
    focus: "Product Hunt 실시간 대응 & 커뮤니티 전파",
    tasks: [
      "00:01 PT: Product Hunt 오픈 즉시 첫 댓글(Maker Comment) 등록",
      "01:00 PT: Waitlist 전체 대기자에게 'We are Live on Product Hunt' 이메일 발송",
      "02:00 PT: X(Twitter)에 런칭 스레드 작성 (#buildinpublic, #indiehackers 태그)",
      "하루 종일: 모든 PH 댓글에 10분 이내로 정성스러운 감사 및 답변 작성"
    ],
    keyAsset: "실시간 PH 댓글 모니터링"
  },
  {
    day: "D + 1",
    phase: "바이럴 확대",
    focus: "Hacker News & Reddit 스토리 공유",
    tasks: [
      "Hacker News에 'Show HN: [서비스명] – [핵심 가치]' 포스팅",
      "Reddit r/SideProject에 개발 일기와 함께 스크린샷 공유",
      "PH 랭킹 결과(Top 5 선정 등) 캡처하여 소셜 미디어 공유"
    ],
    keyAsset: "Show HN 포스트 링크"
  },
  {
    day: "D + 3",
    phase: "디렉토리 등록",
    focus: "지속 트래픽을 위한 50개 디렉토리 일괄 제출",
    tasks: [
      "There's An AI For That, Futurepedia, Toolify 등에 서비스 제출",
      "AlternativeTo에 기존 경쟁 제품의 대안으로 등록 요청",
      "첫 결제 유저 5명에게 개별 감사 이메일 발송"
    ],
    keyAsset: "디렉토리 제출 완료 리스트"
  },
  {
    day: "D + 7",
    phase: "분석 & 1차 개선",
    focus: "전환율 분석 & 리텐션 개선",
    tasks: [
      "PostHog 퍼널 분석: 방문자 대비 가입률, 가입자 대비 결제율 측정",
      "가장 많이 이탈한 구간의 UI/UX 수정 배포",
      "첫 1주일간의 MRR 및 트래픽 회고 트윗 작성 (신뢰 구축)"
    ],
    keyAsset: "1주차 회고 대시보드"
  }
];

export interface LegalAndCopyTemplate {
  id: string;
  category: string;
  title: string;
  purpose: string;
  templateContent: string;
}

export const LEGAL_AND_COPY_TEMPLATES: LegalAndCopyTemplate[] = [
  {
    id: "ph-maker-comment",
    category: "런칭 카피",
    title: "Product Hunt 런칭 첫 번째 댓글 (Maker's Comment)",
    purpose: "런칭 직후 작성하는 진솔한 파운더 스토리로 업보트와 첫 유료 고객 전환 유도",
    templateContent: `👋 Hey Product Hunt community!

I'm [Your Name], the creator of [Your Product Name].

Like many of you, I was constantly frustrated by [Specific Pain Point]. Every week, I spent [X hours] doing [Tiresome Manual Task], and existing tools were either overly complex, bloated with enterprise pricing, or simply outdated.

So I decided to build **[Your Product Name]**: a [one-line value proposition].

🚀 **Here is what makes it different:**
- **[Feature 1]**: [Outcome / Benefit in 1 sentence]
- **[Feature 2]**: [Outcome / Benefit in 1 sentence]
- **[Feature 3]**: [Outcome / Benefit in 1 sentence]

🎁 **Special Product Hunt Launch Deal:**
As a huge thank you to this amazing community, use code **PH50** at checkout for **50% OFF LIFETIME** on all Pro plans (valid for the next 48 hours only).

I would absolutely love to hear your raw, unfiltered feedback:
1. What feature would make this an instant daily tool for you?
2. How does this compare to your current workflow?

I'll be here all day replying to every single question and comment. Thank you for your support! ❤️`
  },
  {
    id: "show-hn-post",
    category: "런칭 카피",
    title: "Hacker News 'Show HN' 텍스트 템플릿",
    purpose: "엔지니어 커뮤니티의 기술적 호기심을 자극하고 트래픽 폭풍을 만드는 담백한 소개글",
    templateContent: `Title: Show HN: [Your Tool] – A [fast/minimalist] way to [solve specific problem]

URL: https://yourdomain.com

Hi HN,

I built [Your Tool] because I needed a simpler way to [specific problem] without [common annoyance of existing solutions].

**Tech Stack:**
- Frontend: Next.js (App Router), Tailwind CSS
- Backend/DB: Supabase (PostgreSQL), Edge Functions on Cloudflare
- Auth: Supabase Auth
- Payments: Lemon Squeezy

**How it works:**
[2-3 sentences explaining the architecture and user experience. Be technical and transparent. Mention latency, caching, or algorithms if relevant.]

**Why not use [Big Competitor]?**
[Big Competitor] is great for enterprises with 50+ person teams, but for solo developers and small teams, it requires 40 configuration steps and costs $200/mo. [Your Tool] takes 30 seconds to set up and runs directly in your browser.

The code for the core client-side parser is open-source at [GitHub link if applicable].

I'd appreciate any feedback on the latency, UX, or edge cases I might have missed!`
  },
  {
    id: "reddit-sideproject",
    category: "커뮤니티 카피",
    title: "Reddit r/SideProject 진솔한 빌더 포스트",
    purpose: "광고 느낌 없이 개발자들의 자발적 피드백과 입소문을 얻는 스토리텔링",
    templateContent: `Title: I spent 3 weeks building a micro-tool to solve [annoying problem]. Here is what I learned.

Hey everyone!

As a solo dev, I was sick and tired of [painful manual workflow]. Most existing tools charged $49/month or forced me through sales calls.

So over the last 3 weeks, I built [Your Tool Name] (https://yourdomain.com).

**What it does:**
- [Bullet 1: Concrete benefit]
- [Bullet 2: Speed / simplicity advantage]
- [Bullet 3: No account required to test it out]

**Lessons learned as a solo indie builder:**
1. Keeping the scope ultra-small was the only reason I actually finished and shipped it.
2. Handling global VAT/taxes is a nightmare unless you use a Merchant of Record like Lemon Squeezy or Paddle.
3. Don't hide the core value behind a signup wall—let people test it first.

You can try it completely free without logging in.

I'd love to know what you think—brutal honesty is welcome! What can I improve?`
  },
  {
    id: "cold-outreach-waitlist",
    category: "콜드 이메일",
    title: "초기 타겟 고객 1:1 문제 인터뷰 요청 이메일",
    purpose: "제품을 팔기 전 잠재 고객의 진짜 고통을 파악하고 관계를 구축하는 1:1 아웃리치",
    templateContent: `Subject: Quick question regarding your [Workflow/Challenge] at [Company Name]

Hi [First Name],

I came across your profile while researching how [Target Audience/Role] handles [Specific Problem].

I'm currently building a focused tool to help teams eliminate [specific headache, e.g. manual CSV exports / slow client onboarding].

I'm not trying to sell you anything—the product is in early alpha. I'm purely looking to learn from your real-world experience.

Would you be open to a 10-minute chat (or even replying to 2 quick questions over email) about how you currently tackle this?

In return, I'd be happy to give you free lifetime access to the tool once it goes live.

Either way, appreciate your time and great work with [mention something recent from their company/Twitter]!

Best,
[Your Name]
Founder, [Your Tool Name]`
  },
  {
    id: "terms-and-refund-clause",
    category: "법적 문서",
    title: "글로벌 SaaS 필수 환불 및 이용약관 핵심 조항",
    purpose: "결제사(Stripe/Lemon Squeezy) 심사 통과 및 차지백(Chargeback) 방지용 필수 약관",
    templateContent: `### 1. Subscription & Billing Terms
By subscribing to [Your Tool Name] ("Service"), you agree to pay the monthly or annual subscription fees indicated for that service. Payments are processed in USD via our payment processor [Lemon Squeezy / Stripe]. Subscriptions automatically renew unless canceled prior to the renewal date. You may cancel at any time via your account settings.

### 2. 7-Day Money-Back Guarantee (Refund Policy)
We want you to be completely satisfied with [Your Tool Name]. If the Service does not meet your expectations, you may request a 100% full refund within 7 calendar days of your initial purchase by contacting support@[yourdomain].com with your invoice number. 

### 3. Fair Use & Prohibited Conduct
You agree not to abuse, reverse-engineer, resell, or distribute the Service in violation of any applicable laws. We reserve the right to suspend accounts that engage in automated scraping or malicious API requests.

### 4. Merchant of Record Disclosure (If using Lemon Squeezy / Paddle)
Our order process is conducted by our online reseller and Merchant of Record, [Lemon Squeezy / Paddle.com], who also handles all order-related customer service inquiries and returns.`
  }
];
