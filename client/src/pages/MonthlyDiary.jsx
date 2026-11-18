// 월간 다이어리 (원본: Pages/monthly_diary(desk).html)
import { useEffect, useRef } from "react";

// 1. FullCalendar 라이브러리 (원본과 같은 CDN 주소)
const FULLCALENDAR_SRC = "https://cdn.jsdelivr.net/npm/fullcalendar@6.1.10/index.global.min.js";

/** FullCalendar 스크립트를 한 번만 불러와요 */
const loadFullCalendar = () =>
  new Promise((resolve, reject) => {
    if (window.FullCalendar) return resolve(window.FullCalendar);
    let script = document.querySelector(`script[src="${FULLCALENDAR_SRC}"]`);
    if (!script) {
      script = document.createElement("script");
      script.src = FULLCALENDAR_SRC;
      document.head.appendChild(script);
    }
    script.addEventListener("load", () => resolve(window.FullCalendar));
    script.addEventListener("error", reject);
  });

export default function MonthlyDiary() {
  const calendarRef = useRef(null); // 달력이 들어갈 칸

  // 3. 달력 초기화 (원본의 DOMContentLoaded 스크립트)
  useEffect(() => {
    let calendar;
    let cancelled = false;

    loadFullCalendar().then((FullCalendar) => {
      if (cancelled || !calendarRef.current) return;
      calendar = new FullCalendar.Calendar(calendarRef.current, {
        initialView: "dayGridMonth", // 월간 달력
        locale: "en",
        headerToolbar: {
          left: "prev,next today",
          center: "title",
          right: "dayGridMonth,timeGridWeek",
        },
        events: [
          // 스케줄 데이터 예시 (다이어리 작성한 날짜 등을 표출 가능)
          {
            title: "성수동 카페 어니언",
            start: "2026-09-01",
            color: "#ffb3ba", // 핑크색 포인트
          },
          {
            title: "프릳츠 원서점",
            start: "2026-08-16",
            color: "#ffffba",
          },
        ],
        dateClick: (info) => {
          alert("선택한 날짜: " + info.dateStr);
          // 날짜 클릭 시 해당 날짜 일기/다이어리 작성 팝업 띄우기 연동
        },
      });
      calendar.render();
    });

    // 화면을 떠나면 달력 정리
    return () => {
      cancelled = true;
      calendar?.destroy();
    };
  }, []);

  return (
    // 2. 달력이 들어갈 컨테이너
    <div
      id="calendar-container"
      style={{
        maxWidth: "800px",
        margin: "20px auto",
        background: "#fff",
        padding: "20px",
        borderRadius: "12px",
      }}
    >
      <div id="calendar" ref={calendarRef}></div>
    </div>
  );
}
