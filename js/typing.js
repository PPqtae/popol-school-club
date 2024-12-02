const $text = document.querySelector("#typed-text");

// 글자 모음
const letters = [
  "작아지는 태인입니다.",
  "키 크는 태인입니다.",
  "섹시해진 태인입니다.",
  "성장하는 태인입니다."
];

// 글자 입력 속도 및 대기 시간
const speed = 100; // 글자 입력 속도
const delay = 800; // 입력 후 대기 시간
const longDelay = 2000; // 문장 출력 완료 후 대기 시간
let i = 0;

// 타이핑 효과
const typing = async () => {
  const letter = letters[i].split("");
  $text.innerHTML = ""; // 이전 글자 초기화

  while (letter.length) {
    await wait(speed);
    $text.innerHTML += letter.shift();
  }

  // 출력 완료 후 잠시 대기 (긴 텀)
  await wait(longDelay);

  // 글자 지우기 효과 실행
  await remove();
}

// 글자 지우는 효과
const remove = async () => {
  const letter = letters[i].split("");

  while (letter.length) {
    await wait(speed);
    letter.pop();
    $text.innerHTML = letter.join("");
  }

  // 다음 글자로 이동 (순환 처리)
  i = (i + 1) % letters.length;

  // 다음 타이핑 실행
  await wait(delay); // 텀을 추가해도 좋음
  typing();
}

// 딜레이 기능
function wait(ms) {
  return new Promise((res) => setTimeout(res, ms));
}

// 초기 실행
setTimeout(typing, 1500);
