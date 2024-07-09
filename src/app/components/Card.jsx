"use client";

import React, { useEffect, useState, useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { cn } from "@/lib/utils";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import Modal from "../ui/Modal";
import { Button } from "@/components/ui/button";
import { FaCheck } from "react-icons/fa6";
import { IoClose } from "react-icons/io5";

const words = [
  {
    id: 1,
    question: `מה פירוש המילה מאי`,
    correct: { num: 2, answer: "מה" },
    answers: [
      { num: 1, answer: "חודש מאי" },
      { num: 2, answer: "מה" },
      { num: 3, answer: "ראשי תיבות של מאיפה יודעים" },
      { num: 4, answer: "קיצור של מאיר" },
    ],
  },
  {
    id: 2,
    question: `מה פירוש המילים נפקא מינא`,
    correct: { num: 1, answer: "יוצא מזה" },
    answers: [
      { num: 1, answer: "יוצא מזה" },
      { num: 2, answer: "שם של פרח" },
      { num: 3, answer: "כינוי למן שירד לעם ישראל במדבר" },
      { num: 4, answer: "שמרים שיוצאים מהיין" },
    ],
  },
  {
    id: 3,
    question: `מה פירוש המילה פוריא`,
    correct: { num: 1, answer: "מיטה" },
    answers: [
      { num: 1, answer: "מיטה" },
      { num: 2, answer: "פרי" },
      { num: 3, answer: "פרווה" },
      { num: 4, answer: "רפואה" },
    ],
  },
  {
    id: 4,
    question: `מה פירוש המילה אורחא`,
    correct: { num: 4, answer: "דרך" },
    answers: [
      { num: 1, answer: "ארוחה" },
      { num: 2, answer: "בית הארחה" },
      { num: 3, answer: "הליכה" },
      { num: 4, answer: "דרך" },
    ],
  },
  {
    id: 5,
    question: `מה פירוש המילה חמרא`,
    correct: { num: 2, answer: "יין" },
    answers: [
      { num: 1, answer: "חמור" },
      { num: 2, answer: "יין" },
      { num: 3, answer: "חימר" },
      { num: 4, answer: "דבר חמור" },
    ],
  },
  {
    id: 6,
    question: `מה פירוש המילה אנפין`,
    correct: { num: 3, answer: "פנים" },
    answers: [
      { num: 1, answer: "איפור" },
      { num: 2, answer: "ענפים" },
      { num: 3, answer: "פנים" },
      { num: 4, answer: "סוג של תרופה" },
    ],
  },
  {
    id: 7,
    question: `מה פירוש המילה אנא`,
    correct: { num: 1, answer: "אני" },
    answers: [
      { num: 1, answer: "אני" },
      { num: 2, answer: "אנחנו" },
      { num: 3, answer: "ענן" },
      { num: 4, answer: "עינוי" },
    ],
  },
  {
    id: 8,
    question: `מה פירוש המילה שונרא`,
    correct: { num: 3, answer: "חתול" },
    answers: [
      { num: 1, answer: "שן של שועל" },
      { num: 2, answer: "עכבר" },
      { num: 3, answer: "חתול" },
      { num: 4, answer: "שינוי" },
    ],
  },
  {
    id: 9,
    question: `מה פירוש המילים היכי דמי`,
    correct: { num: 2, answer: "איך מדובר" },
    answers: [
      { num: 1, answer: "כמה זה עולה" },
      { num: 2, answer: "איך מדובר" },
      { num: 3, answer: "איזה סוג דם זה" },
      { num: 4, answer: "אך זה כואב" },
    ],
  },
  {
    id: 10,
    question: `מה פירוש המילה ברייתא`,
    correct: { num: 4, answer: "משנה שלא נכתבה ע׳׳י ר׳ יהודה הנשיא" },
    answers: [
      { num: 1, answer: "ת׳׳ח שיודע את המשנה על בוריה" },
      { num: 2, answer: "התורה שנבראה לפני בריאת העולם" },
      { num: 3, answer: "משנה שלא נכתבה בבית המדרש" },
      { num: 4, answer: "משנה שלא נכתבה ע׳׳י ר׳ יהודה הנשיא" },
    ],
  },
];

const Card = () => {
  const [results, setResults] = useState([]);
  const [openModalStart, setOpenModalStart] = useState(true);
  const [openModalComplete, setOpenModalComplete] = useState(false);
  const [startCountdown, setStartCountdown] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [emblaRef, embla] = useEmblaCarousel({
    loop: false,
    direction: "rtl",
    watchDrag: false,
  });

  useEffect(() => {
    if (!embla) return;
    const onSelect = () => {
      setSelectedIndex(embla.selectedScrollSnap());
    };
    embla.on("select", onSelect);
    return () => embla.off("select", onSelect);
  }, [embla]);

  const onChoose = (result) => {
    setResults((prev) => [...prev, result]);
    if (selectedIndex < words.length - 1) {
      embla.scrollNext();
      setStartCountdown(false);
      setTimeout(() => setStartCountdown(true), 0);
    } else {
      setStartCountdown(false);
      onCompleteQuiz(); // קריאה לפונקציה כאשר הסלייד האחרון נגמר
    }
  };

  const onCompleteQuiz = () => {
    console.log("results: ", results);
    setOpenModalComplete(true);
  };

  const resetQuiz = () => {
    setResults([]);
    setStartCountdown(false);
    setSelectedIndex(0);
    setOpenModalComplete(false);
    setOpenModalStart(true);
    if (embla) {
      embla.scrollTo(0); // Reset Embla to the first slide
    }
  };

  const handleComplete = useCallback(() => {
    if (selectedIndex < words.length - 1) {
      embla.scrollNext();
      setStartCountdown(false);
      setTimeout(() => setStartCountdown(true), 0);
      const result = {
        question: words[selectedIndex]?.question,
        isCorrect: false,
        chosenAnswer: "",
        correctAnswer: words[selectedIndex]?.correct?.answer,
      };
      onChoose(result);
    } else {
      setStartCountdown(false);
      onCompleteQuiz(); // קריאה לפונקציה כאשר הסלייד האחרון נגמר
    }
  }, [embla, selectedIndex, words.length]);

  const Answers = ({ item }) => {
    return (
      <>
        {item.answers.map(({ num, answer }, idx2) => {
          return (
            <button
              key={idx2}
              onClick={() =>
                onChoose({
                  question: item.question,
                  isCorrect: num === item.correct.num,
                  chosenAnswer: answer,
                  correctAnswer: item.correct.answer,
                })
              }
              className={cn(
                "w-full p-3 rounded-md",
                "text-s-500 bg-s-50",
                "hover:bg-s-100 transition-all",
                "active:bg-p-600 active:text-p-50"
              )}
            >
              {answer}
            </button>
          );
        })}
      </>
    );
  };

  return (
    <div
      className={cn(
        "relative overflow-hidden",
        "h-fit w-[28rem] p-6 transition-all",
        "flex flex-col items-center",
        "rounded-md bg-white",
        "max-md:w-full",
        openModalComplete && "h-full"
      )}
    >
      <Modal trigger={openModalStart} parentClassName="bg-white">
        <Button
          onClick={() => {
            setStartCountdown(true);
            setOpenModalStart(false);
          }}
        >
          התחל
        </Button>
      </Modal>

      <Modal trigger={openModalComplete} parentClassName="bg-white">
        <div className="size-full flex flex-col items-center justify-center gap-4">
          <h3 className="text-2xl font-bold">תוצאות</h3>
          <p className="-mt-4">{`יש לך  תשובות נכונות`}</p>

          <div className="w-full overflow-auto flex-grow flex flex-col items-center gap-2">
            {results?.map((result, idx) => {
              return (
                <div
                  key={idx}
                  className={cn(
                    "w-full h-fit p-2 px-4 rounded-md",
                    "flex items-center justify-between",
                    result?.isCorrect
                      ? "bg-lime-50 text-lime-600"
                      : "bg-red-50 text-red-600"
                  )}
                >
                  <div className="flex items-center gap-4">
                    <p className="w-4">{idx + 1}</p>

                    <div className="flex flex-col justify-center">
                      <p className="">{result?.question}</p>
                      <p className="font-semibold">{result?.correctAnswer}</p>
                    </div>
                  </div>

                  {result?.isCorrect ? (
                    <FaCheck className="text-xl bg-lime-600 rounded-full text-lime-50 p-1" />
                  ) : (
                    <IoClose className="text-xl bg-red-600 rounded-full text-red-50 p-0.5" />
                  )}
                </div>
              );
            })}
          </div>

          <Button className="my-1" onClick={resetQuiz}>
            התחל מחדש
          </Button>
        </div>
      </Modal>

      <header className="w-full flex justify-between gap-4">
        <p className="text-s-600">{`${selectedIndex + 1}/${words.length}`}</p>
        <CountdownCircleTimer
          key={selectedIndex} // Reset the timer on each question change
          isPlaying={startCountdown}
          duration={7}
          colors={["#004777", "#F7B801", "#A30000", "#A30000"]}
          colorsTime={[7, 5, 2, 0]}
          size={35}
          strokeWidth={3}
          trailColor="#E0E0E0"
          onComplete={handleComplete}
        >
          {({ remainingTime }) => remainingTime}
        </CountdownCircleTimer>
      </header>

      <div ref={emblaRef} className="w-full overflow-hidden">
        <div className="flex">
          {words.map((item, idx) => {
            return (
              <div
                key={idx}
                className="relative min-w-full flex flex-col items-center"
              >
                <p className="text-xl font-semibold my-6">{item.question}</p>
                <div className="w-full flex flex-col items-center gap-2">
                  <Answers item={item} />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Card;
