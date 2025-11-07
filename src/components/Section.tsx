import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { LOCAL_STORAGE_SECTION_INFO_KEY, MANIFEST_PATH } from "@/constants";
import { loadTango, shuffle } from "@/lib/utils";
import type { Manifest } from "@/types/manifest.type";
import type { SectionInfo } from "@/types/section-info.type";
import type { Tango } from "@/types/tango.type";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";

export default function Section() {
  const { id } = useParams();

  // 네비게이션 훅
  const nav = useNavigate();

  // 상태 관리
  const [tangoList, setTangoList] = useState<Tango[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showKorean, setShowKorean] = useState(false);
  const [showHiragana, setShowHiragana] = useState(false);

  useEffect(() => {
    const init = async () => {
      if (localStorage.getItem(LOCAL_STORAGE_SECTION_INFO_KEY + id)) {
        const sectionInfo = JSON.parse(
          localStorage.getItem(LOCAL_STORAGE_SECTION_INFO_KEY + id) ?? "[]"
        ) as SectionInfo;

        const { tangoList, currentIndex } = sectionInfo;
        setTangoList(tangoList);
        setCurrentIndex(currentIndex);

        return;
      }

      // 로컬 스토리지에 저장이 안되어있으면 새롭게 불러와서 로컬스토리지 저장
      const manifest = await fetch(MANIFEST_PATH).then(
        (res) => res.json() as unknown as Manifest
      );
      const tangoList = await loadTango(manifest[Number(id) - 1].path);
      const sectionInfo: SectionInfo = {
        tangoList,
        currentIndex: 0,
      };
      localStorage.setItem(
        LOCAL_STORAGE_SECTION_INFO_KEY + id,
        JSON.stringify(sectionInfo)
      );
      setTangoList(tangoList);
    };
    init();
  }, []);

  if (tangoList.length === 0) {
    return;
  }

  const handleNext = () => {
    // 현재 인덱스와 단어 리스트를 로컬 스토리지에 저장
    const sectionInfo: SectionInfo = {
      tangoList,
      currentIndex: currentIndex + 1,
    };
    localStorage.setItem(
      LOCAL_STORAGE_SECTION_INFO_KEY + id,
      JSON.stringify(sectionInfo)
    );

    const remainders = tangoList.filter((tango) => !tango.isLearned);
    const hasNext = !(currentIndex === tangoList.length - 1);
    const showNext = (prev: number) => prev + 1;

    // 모든 단어를 학습했으면 로컬 스토리지 초기화 후 Complete 컴포넌트로 이동
    if (remainders.length === 0) {
      localStorage.clear();
      nav("/complete");
      return;
    }

    // 후리가나와 한국어 초기화
    setShowKorean(false);
    setShowHiragana(false);

    // 끝까지 왔을 경우 외우지 못한 단어들로 리스트 갱신
    shuffle(remainders);
    setTangoList(hasNext ? tangoList : remainders);
    setCurrentIndex(hasNext ? showNext : 0);
  };

  const handleWillStudy = () => {
    handleNext();
  };

  const handleAlreadyKnow = () => {
    tangoList[currentIndex].isLearned = true;
    handleNext();
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-background">
      <div className="w-full max-w-md">
        <Card className="p-8 shadow-lg">
          <div className="mb-8">
            <Button variant="ghost" onClick={() => nav("/")} className="mb-4">
              ← 뒤로
            </Button>
          </div>
          {/* Kanji Display */}
          <div className="text-center mb-12">
            <div className="min-h-20 flex flex-col-reverse gap-2">
              <p className="text-2xl text-muted-foreground animate-fade-in">
                {showHiragana && tangoList[currentIndex].hiragana}
              </p>
            </div>

            <h1 className="text-6xl font-semibold mb-8 text-foreground">
              {tangoList[currentIndex].kanji}
            </h1>

            {/* Korean and Hiragana Display */}
            <div className="min-h-20 flex flex-col gap-2">
              {showKorean && (
                <p className="text-2xl text-muted-foreground animate-fade-in">
                  {tangoList[currentIndex].korean}
                </p>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-4">
            <Button
              variant="outline"
              size="lg"
              className="h-16 text-lg font-medium bg-transparent"
              onClick={() => setShowKorean(!showKorean)}
              disabled={showKorean}
            >
              韓国語
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="h-16 text-lg font-medium bg-transparent"
              onClick={() => setShowHiragana(!showHiragana)}
              disabled={showHiragana}
            >
              ひらがな
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="h-16 text-lg font-medium text-yellow-500 hover:text-yellow-600 bg-transparent"
              onClick={handleWillStudy}
            >
              공부하겠음
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="h-16 text-lg font-medium bg-transparent"
              onClick={handleAlreadyKnow}
            >
              알고있음
            </Button>
          </div>

          {/* Progress Indicator */}
          <div className="mt-8 text-center">
            <p className="text-sm text-muted-foreground">
              {currentIndex + 1} / {tangoList.length}
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
}
