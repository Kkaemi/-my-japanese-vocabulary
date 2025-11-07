import { Complete } from "@/components/Complete";
import Home from "@/components/Home";
import { NotFound } from "@/components/NotFound";
import Section from "@/components/Section";
import "@/index.css";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sections/:id" element={<Section />} />
        <Route path="/complete" element={<Complete />} />
        <Route path="/*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
