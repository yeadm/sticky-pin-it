// 스티커북 (원본: Pages/sticker Book(desk).html)
import { Link } from "react-router-dom";
import { PATHS } from "@/constants";
import "../../styles/sticker Book(desk).css";
import navLogoImg from "../../img/로고_이미지_글씨만.png";
import onionImg from "../../img/어니언 팡도르 스티커.png";
import fritzImg from "../../img/프릳츠 스티커.png";
import nyunyuImg from "../../img/뉴뉴- 청사과 단추.png";

// 3x3 스티커 칸 9개 (스티커가 없는 칸은 빈 카드)
const STICKERS = [
  { img: onionImg, alt: "Onion", tag: "@Onion" },
  { img: fritzImg, alt: "FRITZ", tag: "@FRITZ" },
  { img: nyunyuImg, alt: "NYUNYU", tag: "@NYUNYU" },
  null,
  null,
  null,
  null,
  null,
  null,
];

export default function StickerBook() {
  return (
    <>
      {/* 구글 폰트 Tiny5 (React 19 가 <head> 로 옮겨 줘요) */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
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
          <a href="#" className="my-page-link">My Page</a>
        </div>
      </header>

      {/* 2. 스티커북 메인 컨테이너 */}
      <main className="sticker-container">
        {/* 페이지 타이틀 */}
        <h1 className="sticker-title">Sticker Book-☆ </h1>

        {/* 3x3 스티커 그리드 */}
        <section className="sticker-grid">
          {STICKERS.map((sticker, i) => (
            <div className="sticker-card" key={i}>
              <div className="sticker-box">
                {sticker && <img src={sticker.img} alt={sticker.alt} className="sticker-img" />}
              </div>
              <span className="sticker-tag">{sticker?.tag}</span>
            </div>
          ))}
        </section>

        {/* 하단 핸들 네임 */}
        <div className="footer-handle">@dam.dam</div>
      </main>
    </>
  );
}
