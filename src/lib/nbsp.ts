// Неразрывные пробелы по правилам бренда:
// - после предлогов/частиц
// - перед же/бы/ли
// - перед тире
// - между числом и следующим словом

const SERVICE_WORDS = [
  "во", "со", "на", "по", "за", "из", "от", "до", "не", "ни", "как", "что", "при",
  "в", "с", "к", "о", "у", "и", "а",
];

const serviceRe = new RegExp(
  `(?<=^|\\s)(${SERVICE_WORDS.join("|")})(?=\\s+[а-яёА-ЯЁ0-9])`,
  "gi"
);
const particlesRe = /(?<=[а-яёА-ЯЁ])\s+(?=же|бы|ли)(?=\s|$|[.,;:!?])/gi;
const dashRe = /(?<=\S)\s+(?=[—])/g;
const numberWordRe = /(\d)\s+(?=[а-яёА-ЯЁ])/g;

export const nbsp = (text: string): string =>
  text
    .replace(serviceRe, "$1\u00A0")
    .replace(particlesRe, "\u00A0")
    .replace(dashRe, "\u00A0")
    .replace(numberWordRe, "$1\u00A0");
