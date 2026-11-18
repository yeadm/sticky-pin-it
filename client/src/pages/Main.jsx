// 메인 (원본: Pages/02_main(desk).html)
import { Link } from "react-router-dom";
import { PATHS } from "@/constants";
import "../../styles/02_main(desk).css";
import navLogoImg from "../../img/로고_이미지_글씨만.png";
import myPinImg from "../../img/마이핀-2.png";
import profileImg from "../../img/프로필.png";
import badgeImg from "../../img/도장 최종+.png";
import boardImg from "../../img/메뉴 즐겨찾기 최종.svg";
import scanIconImg from "../../img/scan icon.svg";

// RECENT PINS 목록 (원본 HTML 의 <li> 5개)
const RECENT_PINS = [
  { name: "카페 어니언 성수", date: "2026.09.01" },
  { name: "테디스오픈 성수", date: "2026.08.28" },
  { name: "프릳츠 원서점", date: "2026.08.16" },
  { name: "북촌한옥마을", date: "2026.08.16" },
  { name: "잠원 한강공원", date: "2026.08.09" },
];

export default function Main() {
  return (
    <>
      {/* 1. 상단 노란색 네비게이션 바 */}
      <header className="navbar">
        <div className="nav-left">
          <Link to={PATHS.main}>
            <img src={navLogoImg} alt="Pin it" className="nav-logo" />
          </Link>
          <nav className="nav-menu">
            <Link to={PATHS.map}>Map</Link>
            <Link to={PATHS.scan}>Scan</Link>
            <Link to={PATHS.stickerBook}>Sticker Book</Link>
            <Link to={PATHS.diaryDaily}>Diary</Link>
          </nav>
        </div>
        <div className="nav-right">
          <a href="#" className="my-page-link">My Page</a>
        </div>
      </header>

      {/* 2. 메인 컨텐츠 영역 */}
      <main className="main-container">
        {/* 프로필 & RECENT PINS 섹션 */}
        <section className="profile-section">
          {/* 프로필 카드 */}
          <div className="profile-card">
            <div className="profile-frame-wrapper">
              <img src={myPinImg} alt="My pin_logo" className="star-badge" />
              <div className="yellow-profile-box">
                <img src={profileImg} alt="Profile" className="profile-img" />
              </div>
            </div>
            <h2 className="user-handle">@yedam.Byun</h2>
          </div>

          {/* RECENT PINS 카드 */}
          <div className="recent-pins-card">
            <div className="pins-info">
              <h3 className="pins-title">RECENT PINS</h3>
              <ul className="pins-list">
                {RECENT_PINS.map((pin) => (
                  <li key={pin.name}>
                    <span>{pin.name}</span>
                    <span className="dots"></span>
                    <span className="date">{pin.date}</span>
                  </li>
                ))}
              </ul>
              <p className="pins-count">
                <strong>12/50</strong> pins collected
              </p>
            </div>

            <div className="badge-area">
              <img src={badgeImg} alt="Verified Ribbon Badge" className="badge-img" />
            </div>
          </div>
        </section>

        {/* 3. 메인 보드판 섹션 */}
        <section className="main-board-wrapper">
          <img src={boardImg} alt="Main Board" className="board-bg-img" />

          <div className="tab-click-layer">
            <a href="#" className="tab-link diary-link">Diary</a>
            <a href="#" className="tab-link sticker-link">Sticker Book</a>
            <a href="#" className="tab-link map-link">Map</a>
          </div>
        </section>
      </main>
      {/* .main-container 끝 */}

      {/* 5. 하단 고정 하얀색 바 */}
      <div className="bottom-bar"></div>

      {/* Scan 버튼 (원본 주소 "scan.html" 은 없는 파일이라 Scan 화면으로 연결) */}
      <div className="bottom-bar">
        <Link to={PATHS.scan} className="map-icon-btn scan-btn">
          <img src={scanIconImg} alt="Scan" />
        </Link>
      </div>
    </>
  );
}
