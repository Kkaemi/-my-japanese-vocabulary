import type { Tango } from "@/types/tango.type";
import { clsx, type ClassValue } from "clsx";
// import manifest from "public/manifest.json";
import { twMerge } from "tailwind-merge";

// csv 정적 파일들의 상세 정보가 담긴 json 파일을 타입으로 만든다.
// type Manifest = typeof manifest;

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// csv 파일 로드
export async function loadTango(path: string) {
  const text = await fetch(path).then((res) => res.text());
  const csv = text.split(/\r\n|\n|\r/);
  csv.shift(); // Remove header row
  const rows = csv.filter((row) => row);
  const tangoList: Tango[] = [];

  for (const row of rows) {
    const [kanji, furigana, korean] = row.split(",") as [
      string,
      string,
      string
    ];
    tangoList.push({ kanji, hiragana: furigana, korean, isLearned: false });
  }

  return tangoList;
}

// shuffle
export function shuffle(array: any[]) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}
