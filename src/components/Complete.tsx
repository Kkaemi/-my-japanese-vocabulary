import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router";

export function Complete() {
  // 네비게이션 훅
  const nav = useNavigate();

  // const isValidEntry = !localStorage.getItem(LOCAL_STORAGE_TANGO_LIST_KEY);

  // 다시 시작하기 함수
  // const restart = async () => {
  //   if (!isValidEntry) {
  //     nav("/");
  //     return;
  //   }
  //   localStorage.setItem(
  //     LOCAL_STORAGE_TANGO_LIST_KEY,
  //     JSON.stringify(await loadTango())
  //   );
  //   nav("/");
  // };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-background">
      <h1 className="text-3xl font-bold mb-4">
        {/* {isValidEntry ? "모든 단어를 학습하셨습니다!" : "잘못된 접근입니다."} */}
        모든 단어를 학습하셨습니다!
      </h1>
      <p className="text-lg mb-8">
        {/* {isValidEntry
          ? "축하합니다! 모든 단어를 성공적으로 학습하셨습니다."
          : "처음으로 돌아가 단어 학습을 시작해주세요."} */}
        축하합니다! 모든 단어를 성공적으로 학습하셨습니다.
      </p>
      <Button
        variant="outline"
        size="lg"
        className="h-16 text-lg font-medium bg-transparent"
        onClick={() => nav("/")}
      >
        {/* {isValidEntry ? "다시 시작하기" : "돌아가기"} */}
        다시 시작하기
      </Button>
    </div>
  );
}
