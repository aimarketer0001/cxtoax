export default function NoticeCard() {
  return (
    <div className="notice" role="note">
      <strong>개인정보 보호 및 임시 저장 안내</strong>
      <ul>
        <li>진단 단계에서는 이름, 전화번호, 이메일, 주소 등 개인 식별 정보를 서버에 저장하지 않습니다.</li>
        <li>작성 중인 답변은 이어하기를 위해 현재 브라우저에만 임시 저장됩니다.</li>
        <li>자유 입력 답변은 저장 전 민감정보가 자동으로 마스킹됩니다.</li>
        <li>진단 결과는 교육 과정 추천과 상담 안내 목적으로만 사용됩니다.</li>
      </ul>
    </div>
  );
}
