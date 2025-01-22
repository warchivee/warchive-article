import { loadFromLocalStorage } from "../localStorageManager";

export const settings = {
  fontWeights: ["Light", "Regular", "Bold"],
  bgColors: ["#FDFCF9", "#F8FFFE", "#FDF9FD", "#FFFFFF"],
  keyboardSounds: ["NONE", "CLICK", "TOKLE", "TYPING1", "TYPING2"],
};

export function updateStyles() {
  let fontSize = loadFromLocalStorage<number>("fontSize", 16); // 폰트 사이즈
  let fontWeight = loadFromLocalStorage<number>("fontWeight", 1); // 폰트 굵기
  let fontStyle = loadFromLocalStorage<string>("fontStyle", "Sanserif"); // 폰트 모양
  let lineHeight = loadFromLocalStorage<number>("lineHeight", 160); // 행간 너비
  let bgColor = loadFromLocalStorage<string>("bgColor", settings.bgColors[2]); // 배경 컬러
  let keyboardSound = loadFromLocalStorage<number>("keyboardSound", 0);
  let contentType = loadFromLocalStorage<string>("contentType", "kor");

  const body = document.querySelector("body");
  const typingText = document.querySelector(".highlighted-text");

  const sideMenuHeader = document.querySelector(".header");
  const sideMenuBody = document.querySelector(".content-body");

  if (body) {
    (typingText as HTMLElement).style.fontSize = `${fontSize}px`;

    (typingText as HTMLElement).style.fontWeight =
      fontWeight === 0 ? "lighter" : fontWeight === 1 ? "normal" : "bold";

    (typingText as HTMLElement).style.fontFamily =
      fontStyle === "Sanserif"
        ? "Noto Sans KR, sans-serif"
        : "Noto Serif KR, serif";

    (typingText as HTMLElement).style.lineHeight = `${lineHeight}%`;

    (sideMenuHeader as HTMLElement).style.backgroundColor = bgColor;
    (sideMenuBody as HTMLElement).style.backgroundColor = bgColor;
    body.style.backgroundColor = bgColor;
  }
}
