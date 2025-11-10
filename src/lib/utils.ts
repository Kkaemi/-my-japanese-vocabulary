import type { Tango } from "@/types/tango.type";
import { clsx, type ClassValue } from "clsx";
import Papa from "papaparse";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// csv 파일 로드
export async function loadTango(path: string): Promise<Tango[]> {
  const text = await fetch(path).then((res) => res.text());
  const { data: dataList } = Papa.parse<
    Omit<Tango, keyof Pick<Tango, "isLearned">>
  >(text, {
    header: true,
  });

  return dataList.map((data) => ({ ...data, isLearned: false }));
}

// shuffle
export function shuffle(array: any[]) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}
