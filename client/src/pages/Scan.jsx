// 스캔 (원본: Pages/scan(desk).html)
import { Link } from "react-router-dom";
import { PATHS } from "@/constants";
import "../../styles/02_main(desk).css";
import "../../styles/scan(desk).css";
import navLogoImg from "../../img/로고_이미지_글씨만.png";
import scanHeaderImg from "../../img/로고이미지(스캔).png";
import uploadBoxImg from "../../img/uplaod_box.svg";
import uploadTextImg from "../../img/upload files.svg";

export default function Scan() {
  return (
    <>
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

      {/* 2. 스캔 & 업로드 메인 컨테이너 */}
      <main className="scan-container">
        {/* 업로드 영역 카드 */}
        <div className="scan-card">
          {/* 상단 별 장식 & Pin it 타이틀 통이미지 */}
          <img src={scanHeaderImg} alt="Pin it Header" className="scan-header-img" />

          {/* 숨겨진 실제 파일 선택 태그 */}
          <input type="file" id="file-upload" accept="image/*" className="file-input" />

          {/* SVG 기반 업로드 박스 및 텍스트 (클릭 시 파일 선택 창 오픈) */}
          <label htmlFor="file-upload" className="upload-box-label">
            {/* 1) 노란색 박스 + 은색 + 버튼 SVG */}
            <img src={uploadBoxImg} alt="Upload Box" className="upload-box-img" />

            {/* 2) upload files 텍스트 SVG */}
            <img src={uploadTextImg} alt="Upload Files" className="upload-text-img" />
          </label>
        </div>
      </main>
    </>
  );
}
