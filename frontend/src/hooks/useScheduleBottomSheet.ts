import { useRef, useEffect, useState } from "react";
import { SCHEDULE_MIN_Y, SCHEDULE_MAX_Y } from "../constant/constant";

import { useRecoilState } from "recoil";
import { tabState } from "recoil/tabState";
import { MAX_Y } from "./../constant/constant";

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
  isOpen: boolean;
}

export default function useRecBottomSheet() {
  // 탭 별로 바텀시트 높이를 조절하기 위해 생성한 state
  const [tab, setTab] = useRecoilState<number>(tabState);

  const [minY, setMinY] = useState(SCHEDULE_MIN_Y);
  const [maxY, setMaxY] = useState(SCHEDULE_MAX_Y);
  const [isChanged, setIsChanged] = useState<boolean>(false);

  useEffect(() => {
    if (tab === 2) {
      setMaxY(SCHEDULE_MAX_Y * 1.4);
    } else {
      setMaxY(SCHEDULE_MAX_Y);
    }
    setIsChanged(!isChanged);
  }, [tab]);

  useEffect(() => {
    openBottomSheet();
  }, [isChanged]);

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
    isOpen: false,
  });

  const [isOpenSheet, setIsOpenSheet] = useState<boolean>(false);
  const openBottomSheet = () => {
    metrics.current.isOpen = true;
    setIsOpenSheet(true);
    sheet.current!.style.setProperty("transform", `translateY(${minY - maxY}px)`);
  };

  const closeBottomSheet = () => {
    metrics.current.isOpen = false;
    setIsOpenSheet(false);
  };

  useEffect(() => {
    const canUserMoveBottomSheet = () => {
      const { touchMove, isContentAreaTouched } = metrics.current;

      if (!isContentAreaTouched) {
        return true;
      }

      if (handle.current!.getBoundingClientRect().y !== minY) {
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

        if (nextSheetY <= minY) {
          nextSheetY = minY;
        }

        if (nextSheetY >= maxY) {
          nextSheetY = maxY;
        }
        const VIEWPORT_HEIGHT = window.innerHeight;
        sheet.current!.style.setProperty(
          "transform",
          `translateY(${
            currentTouch.clientY - VIEWPORT_HEIGHT < minY - maxY
              ? minY - maxY
              : currentTouch.clientY - VIEWPORT_HEIGHT
          }px)`
        ); //바닥 만큼은 빼야쥬...
      } else {
        document.body.style.overflowY = "hidden";
      }
    };

    const handleTouchEnd = (e: TouchEvent) => {
      document.body.style.overflowY = "auto";
      const { touchMove } = metrics.current;

      // Snap Animation
      const currentSheetY = sheet.current!.getBoundingClientRect().y;

      if (currentSheetY !== minY) {
        if (touchMove.movingDirection === "down") {
          closeBottomSheet();
          sheet.current!.style.setProperty("transform", "translateY(0)");
        }

        if (touchMove.movingDirection === "up") {
          sheet.current!.style.setProperty("transform", `translateY(${minY - maxY}px)`);
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
        isOpen: false,
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

  return { sheet, content, openBottomSheet, isOpenSheet, handle };
}
