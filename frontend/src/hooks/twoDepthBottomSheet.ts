import { useRef, useEffect, useState } from "react";
import { TWO_MIN_Y, ONE_MIN_Y, TWO_MAX_Y } from "../constant/constant";

interface BottomSheetMetrics {
  touchStart: {
    sheetY: number;
    touchY: number;
  };
  touchMove: {
    prevTouchY?: number;
    movingDirection: "none" | "down" | "up";
  };
  isContentAreaTouched: boolean;
  depth: number;
}

export default function useTwoDepthBottomSheet() {
  const sheet = useRef<HTMLDivElement>(null);

  const content = useRef<HTMLDivElement>(null);

  const metrics = useRef<BottomSheetMetrics>({
    touchStart: {
      sheetY: 0,
      touchY: 0,
    },
    touchMove: {
      prevTouchY: 0,
      movingDirection: "none",
    },
    isContentAreaTouched: false,
    depth: 0,
  });

  const [sheetDepth, setSheetDepth] = useState<number>(0);
  const openBottomSheet = () => {
    setSheetDepth(sheetDepth + 1);
  };

  const closeBottomSheet = () => {
    setSheetDepth(sheetDepth - 1);
  };

  useEffect(() => {
    const canUserMoveBottomSheet = () => {
      const { touchMove, isContentAreaTouched } = metrics.current;

      if (!isContentAreaTouched) {
        return true;
      }

      if (sheet.current!.getBoundingClientRect().y !== TWO_MIN_Y) {
        return true;
      }

      if (touchMove.movingDirection === "down") {
        return content.current!.scrollTop <= 0;
      }
      return false;
    };

    const handleTouchStart = (e: TouchEvent) => {
      const { touchStart } = metrics.current;
      touchStart.sheetY = sheet.current!.getBoundingClientRect().y;
      touchStart.touchY = e.touches[0].clientY;
    };

    const handleTouchMove = (e: TouchEvent) => {
      const { touchStart, touchMove } = metrics.current;
      const currentTouch = e.touches[0];

      if (touchMove.prevTouchY === undefined) {
        touchMove.prevTouchY = touchStart.touchY;
      }

      if (touchMove.prevTouchY === 0) {
        // 맨 처음 앱 시작하고 시작시
        touchMove.prevTouchY = touchStart.touchY;
      }

      if (touchMove.prevTouchY < currentTouch.clientY) {
        touchMove.movingDirection = "down";
      }

      if (touchMove.prevTouchY > currentTouch.clientY) {
        touchMove.movingDirection = "up";
      }

      if (canUserMoveBottomSheet()) {
        e.preventDefault();

        const touchOffset = currentTouch.clientY - touchStart.touchY;
        let nextSheetY = touchStart.sheetY + touchOffset;

        if (nextSheetY <= TWO_MIN_Y) {
          nextSheetY = TWO_MIN_Y;
        }

        if (nextSheetY >= TWO_MAX_Y) {
          nextSheetY = TWO_MAX_Y;
        }

        sheet.current!.style.setProperty("transform", `translateY(${nextSheetY - TWO_MAX_Y}px)`);
      } else {
        document.body.style.overflowY = "hidden";
      }
    };

    const handleTouchEnd = (e: TouchEvent) => {
      document.body.style.overflowY = "auto";
      const { touchMove } = metrics.current;

      // Snap Animation
      const currentSheetY = sheet.current!.getBoundingClientRect().y;

      if (currentSheetY !== TWO_MIN_Y) {
        if (touchMove.movingDirection === "down") {
          closeBottomSheet();
        }

        if (touchMove.movingDirection === "up") {
          openBottomSheet();
        }
      }

      // metrics 초기화.
      metrics.current = {
        touchStart: {
          sheetY: 0,
          touchY: 0,
        },
        touchMove: {
          prevTouchY: 0,
          movingDirection: "none",
        },
        isContentAreaTouched: false,
        depth: 0,
      };
    };

    sheet.current!.addEventListener("touchstart", handleTouchStart);
    sheet.current!.addEventListener("touchmove", handleTouchMove);
    sheet.current!.addEventListener("touchend", handleTouchEnd);
  }, []);

  useEffect(() => {
    const handleTouchStart = () => {
      metrics.current!.isContentAreaTouched = true;
    };
    content.current!.addEventListener("touchstart", handleTouchStart);
  }, []);

  useEffect(() => {
    if (sheetDepth === 0) {
      console.log("뎁스 0");
      sheet.current!.style.setProperty("transform", "translateY(0)");
    }
    if (sheetDepth === 1) {
      console.log("뎁스 1");
      sheet.current!.style.setProperty("transform", `translateY(${ONE_MIN_Y - TWO_MAX_Y}px)`);
    }
    if (sheetDepth === 2) {
      console.log("뎁스 2");
      sheet.current!.style.setProperty("transform", `translateY(${TWO_MIN_Y - TWO_MAX_Y}px)`);
    }
    console.log(sheetDepth);
  }, [sheetDepth]);

  return { sheet, content, openBottomSheet, sheetDepth, setSheetDepth };
}
