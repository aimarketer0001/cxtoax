# React/Vite 라우팅 적용 메모

1. `react-router-dom` 등을 사용해 다음 경로를 실제 Route로 등록합니다.
   - `/courses/crm-ai-automation`
   - `/courses/customer-service-generative-ai`
   - `/courses/sales-ai-automation`
   - `/instructor/jeon-seonhee`
2. 각 Route에서 `SeoHead`를 호출하고 고유 제목·설명·canonical·JSON-LD를 출력합니다.
3. 홈페이지의 상세 커리큘럼 버튼은 상태 변경 버튼이 아니라 실제 `<Link>`로 바꿉니다.
4. SPA rewrite는 직접 URL 접근을 살리는 기능일 뿐 페이지별 서버 렌더링을 제공하지 않습니다.
5. 검색 노출을 안정화하려면 Vite SSG, React Snap, Prerender.io 또는 Next.js 이전을 검토합니다.
