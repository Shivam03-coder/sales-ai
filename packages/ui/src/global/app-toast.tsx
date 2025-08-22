"use client";

import { toast } from "sonner";

const commonClasses = `
  px-6 py-4 
  text-base 
  whitespace-nowrap 
  rounded-xl 
  shadow-xl 
  backdrop-blur-md 
  max-w-fit 
  font-medium
  flex items-center gap-x-2
`;

export const successToast = (message: string) => {
  toast.success(message, {
    unstyled: true,
    className: `bg-green-950 border border-green-800 text-green-300 ${commonClasses}`,
    duration: 5000,
  });
};

export const errorToast = (message: string) => {
  toast.error(message, {
    unstyled: true,
    className: `bg-red-950 border border-red-800 text-red-300 font-lexend ${commonClasses}`,
    duration: 5000,
  });
};

export const warningToast = (message: string) => {
  toast.warning(message, {
    unstyled: true,
    className: `bg-yellow-950 border border-yellow-800 text-yellow-300 ${commonClasses}`,
    duration: 5000,
  });
};
