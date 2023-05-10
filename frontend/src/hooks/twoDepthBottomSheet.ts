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
}

export default function useTwoDepthBottomSheet() {
  const [bottomSheetY, setBottomSheetY] = useState(0);

  const sheet = useRef<HTMLDivElement>(null);

  const content = useRef<HTMLDivElement>(null);

  const handle = useRef<HTMLDivElement>(null);

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
  });

  const [sheetDepth, setSheetDepth] = useState<number>(0);
  const openBottomSheet = () => {
    if (sheetDepth < 2) {
      setSheetDepth((prevDepth) => prevDepth + 1);
    }
  };

  const closeBottomSheet = () => {
    if (sheetDepth > 0) {
      setSheetDepth((prevDepth) => prevDepth - 1);
    }
  };

  useEffect(() => {
    const canUserMoveBottomSheet = () => {
      const { touchMove, isContentAreaTouched } = metrics.current;

      if (!isContentAreaTouched) {
        return true;
      }

      if (handle.current!.getBoundingClientRect().y !== TWO_MIN_Y) {
        return true;
      }

      if (touchMove.movingDirection === "down") {
        return content.current!.scrollTop <= 0;
      }
      return false;
    };

    const handleTouchStart = (e: TouchEvent) => {
      const { touchStart } = metrics.current;
      touchStart.sheetY = handle.current!.getBoundingClientRect().y;
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

        const VIEWPORT_HEIGHT = window.innerHeight;
        // translate가 윗방향이니까 음수임을 기억해
        sheet.current!.style.setProperty(
          "transform",
          `translateY(${
            currentTouch.clientY - VIEWPORT_HEIGHT < TWO_MIN_Y - TWO_MAX_Y
              ? TWO_MIN_Y - TWO_MAX_Y
              : currentTouch.clientY - VIEWPORT_HEIGHT
          }px)`
        );
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
      };
    };

    handle.current!.addEventListener("touchstart", handleTouchStart);
    handle.current!.addEventListener("touchmove", handleTouchMove);
    handle.current!.addEventListener("touchend", handleTouchEnd);
    return () => {
      handle.current?.removeEventListener("touchstart", handleTouchStart);
      handle.current?.removeEventListener("touchmove", handleTouchMove);
      handle.current?.removeEventListener("touchend", handleTouchEnd);
    };
  }, [openBottomSheet]);

  useEffect(() => {
    const handleTouchStart = () => {
      metrics.current!.isContentAreaTouched = true;
    };
    content.current!.addEventListener("touchstart", handleTouchStart);
  }, []);

  useEffect(() => {
    if (sheetDepth === 0) {
      sheet.current!.style.setProperty("transform", "translateY(0)");
    }
    if (sheetDepth === 1) {
      sheet.current!.style.setProperty("transform", `translateY(${ONE_MIN_Y - TWO_MAX_Y}px)`);
    }
    if (sheetDepth === 2) {
      sheet.current!.style.setProperty("transform", `translateY(${TWO_MIN_Y - TWO_MAX_Y}px)`);
    }
  }, [sheetDepth]);

  return { sheet, content, openBottomSheet, sheetDepth, setSheetDepth, handle };
}
