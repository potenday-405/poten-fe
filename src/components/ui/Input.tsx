import { UseFormRegisterReturn } from "react-hook-form";

type Props = {
  id: string;
  type: string;
  placeholder?: string;
  register: UseFormRegisterReturn;
  hide?: boolean;
  hasLabel?: boolean;
  hasError?: boolean;
  errorText?: boolean;
  maxLength?: number;
  height?: number;
  onInput?: React.FormEventHandler<HTMLInputElement>;
};

export default function Input({
  id,
  type,
  placeholder,
  register,
  hide = false,
  hasLabel = true,
  hasError,
  errorText,
  onInput,
  maxLength,
  height = 64,
}: Props) {
  return (
    <input
      className={`w-full font-medium min-w-80 p-4 placeholder:text-[14px] placeholder:text-gray1 text-gray4 h-[${height}px] bg-white outline-none border-b-[1px] focus:outline-none focus:border-main ${hide ? "hidden" : ""} ${hasLabel ? "pl-[90px]" : ""} ${errorText ? "pb-10" : ""} ${hasError ? "border-darkRed focus:border-darkRed" : "border-gray0"}`}
      id={id}
      type={type}
      maxLength={maxLength}
      placeholder={placeholder}
      {...register}
      onInput={onInput}
    />
  );
}
