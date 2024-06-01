import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import App from "../App";

const index = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
};

export default index;
