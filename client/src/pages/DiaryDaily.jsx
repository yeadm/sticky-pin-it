// 일간 다이어리 (원본: Pages/diay_daily(desk).html)
import { Link } from "react-router-dom";
import { PATHS } from "@/constants";
import "../../styles/02_main(desk).css";
import "../../styles/diay_daily(desk).css";
import navLogoImg from "../../img/로고_이미지_글씨만.png";
import saveImg from "../../img/save-8.png";

// 체크리스트 4줄 (원본 HTML 의 todo-item 4개)
const TODOS = [1, 2, 3, 4];

export default function DiaryDaily() {
  return (
    <>
      {/* 구글 폰트 Tiny5 (React 19 가 <head> 로 옮겨 줘요) */}
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Tiny5&display=swap"
        precedence="default"
      />

      {/* 1. 상단 네비게이션 바 */}
      <header className="navbar">
        <div className="nav-left">
          <Link to={PATHS.main}>
            <img src={navLogoImg} alt="Pin it" className="nav-logo" />
          </Link>
          <nav className="nav-menu">
            <Link to={PATHS.map} className="active">Map</Link>
            <Link to={PATHS.scan}>Scan</Link>
            <Link to={PATHS.stickerBook}>Sticker Book</Link>
            <Link to={PATHS.diaryDaily}>Diary</Link>
          </nav>
        </div>
        <div className="nav-right">
          <a href="#" className="my-page-link"> My Page</a>
        </div>
      </header>

      {/* 2. 다이어리 메인 컨테이너 */}
      <main className="diary-container">
        {/* 서브 헤더 (타이틀 & daily 표시) */}
        <div className="diary-header">
          <h1 className="diary-title">Diary-☆ </h1>
          <button type="button" className="save-img-btn">
            <img src={saveImg} alt="Save" />
          </button>
        </div>

        {/* 다이어리 내지 속지 프레임 */}
        <div className="diary-paper">
          {/* 날짜 입력 섹션 */}
          <div className="date-row">
            <span className="date-label">date</span>
            <div className="date-inputs">
              <input type="text" maxLength={4} placeholder="YYYY" className="date-input year" />
              <span className="slash">/</span>
              <input type="text" maxLength={2} placeholder="MM" className="date-input month" />
              <span className="slash">/</span>
              <input type="text" maxLength={2} placeholder="DD" className="date-input day" />
            </div>
          </div>

          {/* 구분선 1 */}
          <div className="line"></div>

          {/* 제목 입력 섹션 */}
          <div className="title-row">
            <span className="title-label">Title</span>
            <input type="text" placeholder="title" className="title-input" />
          </div>

          {/* 구분선 2 */}
          <div className="line bold-line"></div>

          {/* 체크리스트 섹션 (4개) */}
          <div className="todo-list">
            {TODOS.map((n) => (
              <div className="todo-item" key={n}>
                <input type="checkbox" id={`todo${n}`} className="custom-radio" />
                <label htmlFor={`todo${n}`}></label>
                <input type="text" placeholder={`List ${n}`} className="todo-input" />
              </div>
            ))}
          </div>

          {/* 구분선 3 */}
          <div className="line"></div>

          {/* 본문 자유 메모 입력 영역 */}
          <div className="content-area">
            <textarea placeholder="오늘의 기록을 자유롭게 작성해보세요." className="diary-textarea"></textarea>
          </div>

          {/* 구분선 4 (하단) */}
          <div className="line bottom-line"></div>
        </div>

        {/* 하단 핸들 네임 */}
        <div className="footer-handle">@dam.dam</div>
      </main>
    </>
  );
}
