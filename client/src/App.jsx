// 화면 주소(PATHS)와 페이지를 연결해요
import { Routes, Route } from "react-router-dom";
import { PATHS } from "@/constants";
import Login from "@/pages/Login";
import Main from "@/pages/Main";
import DiaryDaily from "@/pages/DiaryDaily";
import MonthlyDiary from "@/pages/MonthlyDiary";
import MapPage from "@/pages/MapPage";
import Scan from "@/pages/Scan";
import StickerBook from "@/pages/StickerBook";
import NotFound from "@/pages/NotFound";

export default function App() {
  return (
    <Routes>
      <Route path={PATHS.login} element={<Login />} />
      <Route path={PATHS.main} element={<Main />} />
      <Route path={PATHS.diaryDaily} element={<DiaryDaily />} />
      <Route path={PATHS.monthlyDiary} element={<MonthlyDiary />} />
      <Route path={PATHS.map} element={<MapPage />} />
      <Route path={PATHS.scan} element={<Scan />} />
      <Route path={PATHS.stickerBook} element={<StickerBook />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
