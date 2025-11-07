import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router";

export function NotFound() {
  const nav = useNavigate();
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-background">
      <h1 className="text-3xl font-bold mb-12">존재하지 않는 페이지 입니다.</h1>
      <Button
        variant="outline"
        size="lg"
        className="h-16 text-lg font-medium bg-transparent"
        onClick={() => nav("/")}
      >
        돌아가기
      </Button>
    </div>
  );
}
