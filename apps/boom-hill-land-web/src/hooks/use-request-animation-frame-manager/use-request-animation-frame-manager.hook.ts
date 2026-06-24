"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { IUseRequestAnimationFrameManager } from "./use-request-animation-frame-manager.interface";

export function useRequestAnimationFrameManager(props: IUseRequestAnimationFrameManager.Props) {
  const { isAutoStart, callback } = props;

  const requestRef = useRef<number | undefined>(undefined);
  const callbackRef = useRef<(startedTimestamp: number, currentTimestamp: number, timestamp: number) => void>(callback);
  callbackRef.current = callback;

  const [isReady, setIsReady] = useState<boolean>(false);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const isProcessingRef = useRef<boolean>(false);
  const [isSleeping, setIsSleeping] = useState<boolean>(false);
  const isSleepingRef = useRef<boolean>(false);

  const start = useCallback(() => {
    if (isProcessingRef.current) return;
    isProcessingRef.current = true;
    setIsProcessing(true);

    const nowTimestamp = window.performance.timeOrigin + window.performance.now();

    const call = (step: number) => {
      callbackRef.current(nowTimestamp, window.performance.timeOrigin + window.performance.now(), step);
      requestRef.current = requestAnimationFrame(call);
    };

    requestRef.current = requestAnimationFrame(call);
  }, []);

  const stop = useCallback(() => {
    isProcessingRef.current = false;
    setIsProcessing(false);
    isSleepingRef.current = true;
    setIsSleeping(true);
    if (requestRef.current !== undefined) {
      cancelAnimationFrame(requestRef.current);
    }
  }, []);

  useEffect(() => {
    setIsReady(true);
  }, []);

  // biome-ignore lint/correctness/useExhaustiveDependencies: _
  useEffect(() => {
    if (!isReady) return;
    if (isAutoStart === true) {
      start();
    }
  }, [isReady]);

  // biome-ignore lint/correctness/useExhaustiveDependencies: _
  useEffect(() => {
    return () => {
      stop();
    };
  }, []);

  return {
    isReady,
    isProcessing,
    isSleeping,
    start,
    stop,
  };
}
