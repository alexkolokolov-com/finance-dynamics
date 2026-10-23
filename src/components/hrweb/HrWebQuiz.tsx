import { useState } from "react";
import { ArrowLeft, ArrowRight, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { hrQuizQuestions, hrQuizResults, hrQuizMaxScore, resultIndexFor, scoreQuiz } from "@/data/hrWebQuiz";
import { nbsp } from "@/lib/nbsp";
import img1 from "@/assets/hr-quiz-1.jpg";
import img2 from "@/assets/hr-quiz-2.jpg";
import img3 from "@/assets/hr-quiz-3.jpg";
import img4 from "@/assets/hr-quiz-4.jpg";
import cover from "@/assets/hr-quiz-cover.jpg";
import avatar from "@/assets/hero-photo.png";

const resultImages = [
  { src: img1, alt: "Сотрудник передаёт HR-специалисту срочную просьбу" },
  { src: img2, alt: "HR вручает сотруднику соцпакет и конверт с премией" },
  { src: img3, alt: "Тренер проводит для сотрудников занятие по бюджету" },
  { src: img4, alt: "HR-директор и руководитель смотрят на растущий график" },
];

const ctaClass = "h-auto min-h-14 whitespace-normal rounded-none px-8 py-4 text-base";

export const HrWebQuiz = () => {
  const [step, setStep] = useState(-1);
  const [answers, setAnswers] = useState<number[]>([]);
  const total = hrQuizQuestions.length;

  const choose = (opt: number) => {
    const next = [...answers];
    next[step] = opt;
    setAnswers(next);
    setStep(step + 1);
  };
  const restart = () => { setAnswers([]); setStep(0); };

  if (step < 0) {
    return (
      <div className="grid items-center gap-8 md:grid-cols-2 md:gap-12">
        <img src={cover} alt="HR-специалист спокойно заполняет чек-лист, команда общается за чаем" width={1200} height={896} className="w-full rounded-2xl border border-border bg-card object-cover md:order-last" />
        <div className="min-w-0">
          <h1 className="text-[clamp(2rem,6vw,3.5rem)] font-semibold leading-[1.02]">{nbsp("Индекс финансового спокойствия команды")}</h1>
          <Button onClick={() => setStep(0)} className={`${ctaClass} mt-8 w-full bg-primary text-primary-foreground hover:bg-accent hover:text-accent-foreground sm:w-auto`}>Пройти диагностику<ArrowRight /></Button>
        </div>
      </div>
    );
  }

  if (step >= total) {
    const score = scoreQuiz(answers);
    const idx = resultIndexFor(score);
    const r = hrQuizResults[idx];
    return (
      <div>
        <div className="grid items-center gap-8 md:grid-cols-2 md:gap-12">
          <img src={resultImages[idx].src} alt={resultImages[idx].alt} loading="lazy" width={1200} height={896} className="w-full rounded-2xl border border-border bg-card object-cover" />
          <div className="min-w-0">
            <p className="text-lg">{nbsp(`Ваш результат: ${score} из ${hrQuizMaxScore} баллов`)}</p>
            <h2 className="mt-3 text-3xl font-semibold leading-tight md:text-4xl">{nbsp(r.title)}</h2>
            {r.text.map((t) => <p key={t} className="mt-5 text-lg leading-relaxed">{nbsp(t)}</p>)}
            <button type="button" onClick={restart} className="mt-6 inline-flex items-center gap-2 transition-colors hover:text-accent"><RotateCcw size={18} />Пройти заново</button>
          </div>
        </div>
        <div className="mt-12 flex flex-col gap-6 rounded-2xl bg-primary p-6 text-primary-foreground sm:flex-row sm:items-center md:mt-16 md:p-10">
          <img src={avatar} alt="Василий Мещеряков" loading="lazy" className="h-20 w-20 shrink-0 rounded-full object-cover object-top md:h-24 md:w-24" />
          <div className="min-w-0 flex-1">
            <p className="text-xl font-semibold md:text-2xl">{nbsp("Василий Мещеряков")}</p>
            <p className="mt-2 text-lg leading-snug text-primary-foreground/80">{nbsp("Обсудим программу для вашей команды и детали")}</p>
          </div>
          <Button asChild className={`${ctaClass} bg-accent text-accent-foreground hover:bg-primary-foreground hover:text-primary`}>
            <a href="https://t.me/Vasily_Mescheryakov" target="_blank" rel="noopener noreferrer">Получить консультацию<ArrowRight /></a>
          </Button>
        </div>
      </div>
    );
  }

  const q = hrQuizQuestions[step];
  return (
    <div className="max-w-3xl">
      <div className="flex items-center justify-between gap-4 text-base">
        <span>{nbsp(`Вопрос ${step + 1} из ${total}`)}</span>
        {step > 0 && (
          <button type="button" onClick={() => setStep(step - 1)} className="inline-flex items-center gap-1 transition-colors hover:text-accent"><ArrowLeft size={18} />Назад</button>
        )}
      </div>
      <div className="mt-3 h-1 w-full bg-border" aria-hidden="true">
        <div className="h-full bg-accent transition-all" style={{ width: `${(step / total) * 100}%` }} />
      </div>
      <h2 className="mt-8 text-2xl font-semibold leading-snug md:text-3xl">{nbsp(q.question)}</h2>
      <div className="mt-8 grid gap-3" role="radiogroup" aria-label={q.question}>
        {q.options.map((o, i) => (
          <button
            key={o.letter}
            type="button"
            role="radio"
            aria-checked={answers[step] === i}
            onClick={() => choose(i)}
            className={`flex w-full items-start gap-4 rounded-xl border bg-card p-5 text-left text-lg leading-snug transition-colors hover:border-accent ${answers[step] === i ? "border-accent" : "border-border"}`}
          >
            <span className="font-semibold text-accent">{o.letter}</span>
            <span>{nbsp(o.text)}</span>
          </button>
        ))}
      </div>
    </div>
  );
};
