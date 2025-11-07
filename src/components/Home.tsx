import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { MANIFEST_PATH, SECTIONS_PER_PAGE } from "@/constants";
import type { Manifest } from "@/types/manifest.type";
import { ChevronDown, ChevronUp, Info, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

export default function Home() {
  // 네비게이션 훅
  const nav = useNavigate();

  // 상태 관리
  const [sectionPage, setSectionPage] = useState(0);
  const [sectionList, setSectionList] = useState<Manifest>([]);
  const [sectionListIndex, setSectionListIndex] = useState<number | null>(null);

  useEffect(() => {
    const init = async () => {
      const sectionList = await fetch(MANIFEST_PATH).then(
        (res) => res.json() as unknown as Manifest
      );
      setSectionList(sectionList);
    };
    init();
  }, []);

  const visibleSections = sectionList.slice(
    sectionPage * SECTIONS_PER_PAGE,
    (sectionPage + 1) * SECTIONS_PER_PAGE
  );
  const canGoUp = sectionPage > 0;
  const canGoDown = (sectionPage + 1) * SECTIONS_PER_PAGE < sectionList.length;

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-background">
      <div className="w-full max-w-md">
        <Card className="p-8 shadow-lg">
          <h1 className="text-3xl font-bold text-center mb-8 text-foreground">
            🔥 JLPT N1 単語帳 🔥
          </h1>

          {/* Up Arrow */}
          <div className="flex justify-center mb-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSectionPage((prev) => prev - 1)}
              disabled={!canGoUp}
              className="h-12 w-12"
            >
              <ChevronUp
                className={`h-8 w-8 ${
                  canGoUp ? "text-foreground" : "text-muted-foreground/30"
                }`}
              />
            </Button>
          </div>

          {/* Sections Grid */}
          <div className="grid gap-4 mb-4 min-h-72">
            {visibleSections.map((section, idx) => (
              <div key={idx} className="flex items-center gap-3">
                <Button
                  key={idx}
                  variant="outline"
                  size="lg"
                  className="h-20 text-xl font-medium bg-transparent flex-1"
                  onClick={() =>
                    nav(
                      `/sections/${idx + 1 + sectionPage * SECTIONS_PER_PAGE}`
                    )
                  }
                >
                  {`第${idx + 1 + sectionPage * SECTIONS_PER_PAGE}章`}
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-12 w-12"
                  onClick={() => setSectionListIndex(section.id)}
                >
                  <Info className="h-6 w-6 text-muted-foreground" />
                </Button>
              </div>
            ))}
          </div>

          {/* Down Arrow */}
          <div className="flex justify-center">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSectionPage((prev) => prev + 1)}
              disabled={!canGoDown}
              className="h-12 w-12"
            >
              <ChevronDown
                className={`h-8 w-8 ${
                  canGoDown ? "text-foreground" : "text-muted-foreground/30"
                }`}
              />
            </Button>
          </div>

          {/* Page Indicator */}
          <div className="mt-6 text-center">
            <p className="text-sm text-muted-foreground">
              {sectionPage * SECTIONS_PER_PAGE + 1}-
              {Math.min(
                (sectionPage + 1) * SECTIONS_PER_PAGE,
                sectionList.length
              )}{" "}
              / {sectionList.length}
            </p>
          </div>
        </Card>

        {sectionListIndex !== null && (
          <div
            className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
            onClick={() => setSectionListIndex(null)}
          >
            <Card
              className="p-6 max-w-md w-full relative"
              onClick={(e) => e.stopPropagation()}
            >
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-2 top-2 h-8 w-8"
                onClick={() => setSectionListIndex(null)}
              >
                <X className="h-4 w-4" />
              </Button>
              <h2 className="text-2xl font-bold mb-4 text-foreground">
                {`第${sectionListIndex + 1}章`}
              </h2>
              <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
                {sectionList[sectionListIndex].description
                  .split(",")
                  .map((str) => `- ${str.trim()}`)
                  .join("\n")}
              </p>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
