// 지도 (원본: Pages/map(desk).html + 루트의 map(desk).js)
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { PATHS } from "@/constants";
import "../../styles/02_main(desk).css";
import "../../styles/map(desk).css";
import navLogoImg from "../../img/로고_이미지_글씨만.png";
import discoverImg from "../../img/발견_1 최종.svg";
import scanIconImg from "../../img/scan icon.svg";
import bookmarkImg from "../../img/북마크3 찐최종.svg";
import pinImg from "../../img/PIN.svg";

// 4. 카카오 지도 API 라이브러리 (원본과 같은 주소·키)
const KAKAO_SDK_SRC =
  "https://dapi.kakao.com/v2/maps/sdk.js?appkey=272fc4350ddd243d2d9224bfce7da6b7&libraries=services&autoload=false";

/** 카카오 지도 스크립트를 한 번만 불러와요 */
const loadKakao = () =>
  new Promise((resolve, reject) => {
    if (window.kakao?.maps) return resolve(window.kakao);
    let script = document.querySelector(`script[src="${KAKAO_SDK_SRC}"]`);
    if (!script) {
      script = document.createElement("script");
      script.src = KAKAO_SDK_SRC;
      document.head.appendChild(script);
    }
    script.addEventListener("load", () =>
      window.kakao?.maps?.load ? resolve(window.kakao) : reject(new Error("kakao sdk")),
    );
    script.addEventListener("error", reject);
  });

export default function MapPage() {
  const mapElRef = useRef(null); // 실제 지도가 표시되는 칸
  const mapRef = useRef(null); // kakao.maps.Map
  const psRef = useRef(null); // 장소 검색 객체
  const infowindowRef = useRef(null); // 말풍선
  const markersRef = useRef([]); // 지도에 찍힌 마커들

  const [keyword, setKeyword] = useState(""); // 검색창 글자
  const [places, setPlaces] = useState([]); // 검색 결과 목록
  const [loadError, setLoadError] = useState(false); // 지도 불러오기 실패

  // 지도 처음 그리기 (원본 initKakaoMap)
  useEffect(() => {
    let cancelled = false;
    loadKakao()
      .then((kakao) => {
        kakao.maps.load(() => {
          if (cancelled || !mapElRef.current) return;
          const map = new kakao.maps.Map(mapElRef.current, {
            center: new kakao.maps.LatLng(37.5665, 126.978),
            level: 3,
          });
          map.relayout();
          mapRef.current = map;
          psRef.current = new kakao.maps.services.Places();
          infowindowRef.current = new kakao.maps.InfoWindow({ zIndex: 1 });
        });
      })
      .catch(() => !cancelled && setLoadError(true));
    return () => {
      cancelled = true;
    };
  }, []);

  // 8. 기존 마커 및 리스트 삭제
  const clearMapAndList = () => {
    markersRef.current.forEach((m) => m.setMap(null));
    markersRef.current = [];
    setPlaces([]);
    infowindowRef.current?.close();
  };

  // 9. 인포윈도우(말풍선) 표출
  const displayInfowindow = (marker, title) => {
    const content =
      '<div style="padding:5px;z-index:1;font-size:12px;color:#333;">' + title + "</div>";
    infowindowRef.current.setContent(content);
    infowindowRef.current.open(mapRef.current, marker);
  };

  // 마커 클릭·목록 클릭 시: 해당 위치로 부드럽게 이동 및 확대
  const focusPlace = (marker, title, position) => {
    mapRef.current.setLevel(3);
    mapRef.current.panTo(position);
    displayInfowindow(marker, title);
  };

  // 7. 지도에 커스텀 마커 추가
  const addMarker = (position) => {
    const { kakao } = window;
    const imageSize = new kakao.maps.Size(40, 40); // 가로 40px, 세로 40px 크기
    const imageOption = { offset: new kakao.maps.Point(20, 40) }; // 이미지 바닥 중앙이 지도 좌표에 딱 맞도록
    const markerImage = new kakao.maps.MarkerImage(pinImg, imageSize, imageOption);
    const marker = new kakao.maps.Marker({ position, image: markerImage, map: mapRef.current });
    markersRef.current.push(marker);
    return marker;
  };

  // 5. 검색 결과 목록과 마커 표출
  const displayPlaces = (data) => {
    const { kakao } = window;
    const bounds = new kakao.maps.LatLngBounds();

    clearMapAndList(); // 기존에 있던 마커와 목록 제거

    const list = data.map((place) => {
      const position = new kakao.maps.LatLng(place.y, place.x);
      const marker = addMarker(position);
      bounds.extend(position); // 모든 결과가 보이도록 지도 범위에 추가
      kakao.maps.event.addListener(marker, "click", () =>
        focusPlace(marker, place.place_name, position),
      );
      return { place, marker, position };
    });

    setPlaces(list);
    mapRef.current.setBounds(bounds);
    mapRef.current.relayout();
  };

  // 3. 키워드 검색 실행
  const searchPlaces = () => {
    const word = keyword.trim();
    if (!word) {
      alert("키워드를 입력해주세요!");
      return;
    }
    if (!psRef.current) return; // 지도가 아직 준비 안 됨

    // 4. 장소검색 완료 시 호출되는 콜백
    psRef.current.keywordSearch(word, (data, status) => {
      const { Status } = window.kakao.maps.services;
      if (status === Status.OK) {
        displayPlaces(data);
      } else if (status === Status.ZERO_RESULT) {
        alert("검색 결과가 존재하지 않습니다.");
        clearMapAndList();
      } else if (status === Status.ERROR) {
        alert("검색 결과 중 오류가 발생했습니다.");
      }
    });
  };

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
          <Link to={PATHS.main} className="my-page-link">My Page</Link>
        </div>
      </header>

      {/* 2. 지도 메인 영역 */}
      <main className="map-viewport">
        {/* 왼쪽 검색 사이드바 (검색창 + 세로 검색 결과) */}
        <aside className="search-sidebar">
          <div className="sidebar-header">
            <div className="search-input-wrapper">
              <input
                type="text"
                id="keyword"
                placeholder="장소를 검색하세요..."
                className="map-search-input"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && searchPlaces()} // 10. 엔터키로 검색
              />
              <button type="button" id="search-btn" className="search-btn" onClick={searchPlaces}>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#666" strokeWidth="2.5">
                  <circle cx="11" cy="11" r="8"></circle>
                  <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                </svg>
              </button>
            </div>
          </div>

          {/* 주루룩 출력될 검색 결과 목록 (6. 검색결과 항목) */}
          <ul id="placesList" className="places-list">
            {places.map(({ place, marker, position }, index) => (
              <li
                key={place.id ?? index}
                className="item"
                onClick={() => focusPlace(marker, place.place_name, position)}
              >
                <div className="info">
                  <h5>
                    {index + 1}. {place.place_name}
                  </h5>
                  {place.road_address_name ? (
                    <>
                      <span>{place.road_address_name}</span>
                      <span className="jibun gray">{place.address_name}</span>
                    </>
                  ) : (
                    <span>{place.address_name}</span>
                  )}
                  <span className="tel">{place.phone}</span>
                </div>
              </li>
            ))}
          </ul>
        </aside>

        {/* 실제 지도가 표시되는 컨테이너 */}
        <div id="map" className="map-container" ref={mapElRef}>
          {loadError && (
            <div className="map-load-error">
              <strong>지도를 불러오지 못했습니다.</strong>
              <span>
                카카오맵 JavaScript 키의 SDK 도메인에 지금 접속 중인 주소를 등록해 주세요.
                <br />
                개발 서버 주소는 http://localhost:3000 입니다.
              </span>
            </div>
          )}
        </div>
      </main>

      {/* 3. 지도 UI 2: 하단 3종 컨트롤 바 (발견 / Scan / 북마크) */}
      <footer className="map-bottom-bar">
        {/* 1) 왼쪽: 발견 핀 버튼 */}
        <button type="button" className="map-icon-btn discover-btn">
          <img src={discoverImg} alt="Discover Pin" />
        </button>

        {/* 2) 중앙: Scan 버튼 */}
        <Link to={PATHS.scan} className="map-icon-btn scan-btn">
          <img src={scanIconImg} alt="Scan" />
        </Link>

        {/* 3) 오른쪽: 북마크 리본 버튼 */}
        <button type="button" className="map-icon-btn bookmark-btn">
          <img src={bookmarkImg} alt="Bookmark Ribbon" />
        </button>
      </footer>
    </>
  );
}
