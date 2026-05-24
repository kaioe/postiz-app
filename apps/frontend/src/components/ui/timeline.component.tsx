'use client';

import React, { FC } from 'react';
import clsx from 'clsx';

export interface TimelineStep {
  key: string;
  label: string;
}

interface TimelineProps {
  steps: TimelineStep[];
  activeKey: string;
  onStepClick?: (key: string) => void;
}

export const Timeline: FC<TimelineProps> = ({ steps, activeKey, onStepClick }) => {
  const activeIndex = steps.findIndex((s) => s.key === activeKey);

  return (
    <div className="flex items-center justify-center gap-[16px]">
      {steps.map((step, index) => {
        const isActive = index === activeIndex;
        const isPast = index < activeIndex;
        const isFuture = index > activeIndex;
        const isClickable = (isPast || isActive) && !!onStepClick;

        return (
          <React.Fragment key={step.key}>
            {index > 0 && (
              <div
                className={clsx(
                  'w-[40px] h-[2px] transition-colors',
                  isPast || isActive ? 'bg-boxFocused' : 'bg-newTableHeader'
                )}
              />
            )}
            <div className="flex items-center gap-[8px]">
              <button
                type="button"
                disabled={!isClickable}
                onClick={() => isClickable && onStepClick?.(step.key)}
                className={clsx(
                  'w-[32px] h-[32px] rounded-full flex items-center justify-center text-[14px] font-semibold transition-all',
                  isActive && 'bg-boxFocused text-textItemFocused',
                  isPast && 'bg-boxFocused/80 text-textItemFocused cursor-pointer hover:scale-110',
                  isFuture && 'bg-newTableHeader cursor-default'
                )}
              >
                {isPast ? (
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 14 14"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M11.6667 3.5L5.25 9.91667L2.33333 7"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                ) : (
                  index + 1
                )}
              </button>
              <button
                type="button"
                disabled={!isClickable}
                onClick={() => isClickable && onStepClick?.(step.key)}
                className={clsx(
                  'text-[14px] transition-colors',
                  isClickable && 'cursor-pointer hover:opacity-80',
                  !isClickable && 'cursor-default',
                  isActive ? 'font-medium' : 'text-textColor'
                )}
              >
                {step.label}
              </button>
            </div>
          </React.Fragment>
        );
      })}
    </div>
  );
};
