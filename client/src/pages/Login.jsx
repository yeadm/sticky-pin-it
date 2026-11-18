// 로그인 (원본: Pages/index.html)
import { useNavigate } from "react-router-dom";
import { PATHS } from "@/constants";
import "../../styles/01_login(desk).css";
import logoImg from "../../img/로고_최종.png";
import loginBtnImg from "../../img/로그인 버튼.png";

export default function Login() {
  const navigate = useNavigate();

  // 원본: <form action="./02_main(desk).html"> → 로그인 버튼을 누르면 메인으로 이동
  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(PATHS.main);
  };

  return (
    <div className="login-page">
      {/* 화면 중앙 전체 껍데기 (그리드 적용 대상) */}
      <div className="login-wrapper">
        {/* 1. 왼쪽: 로고 영역 */}
        <div className="logo-area">
          <img src={logoImg} alt="Pin it 로고" className="logo-img" />
        </div>

        {/* 2. 오른쪽: 로그인 폼 영역 */}
        <form className="form-area" onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="user-id">ID</label>
            <input type="text" id="user-id" name="id" required />
          </div>

          <div className="input-group">
            <label htmlFor="user-pw">Password</label>
            <input type="password" id="user-pw" name="password" required />
          </div>

          {/* 글자 Log-in은 완전히 제거하고 img만 남기기 */}
          <button type="submit" className="img-btn-login">
            <img src={loginBtnImg} alt="Log-in" />
          </button>
        </form>
      </div>

      {/* 제작자 로고 */}
      <div className="c">@dam.dam</div>
    </div>
  );
}
