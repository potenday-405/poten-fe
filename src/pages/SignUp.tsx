import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import Input from "../components/ui/Input";

interface SignUpFormType {
  name: string;
  email: string;
  contact: string;
  password: string;
  confirmPassword: string;
}

const inputFields = [
  {
    id: "name",
    type: "text",
    name: "이름",
    placeholder: "실명을 입력해주세요.",
    validation: { required: "이름을 입력해주세요." },
  },
  {
    id: "contact",
    type: "number",
    name: "연락처",
    placeholder: "ex) 01012345678",
    validation: {
      required: "연락처를 입력해주세요.",
      pattern: {
        value: /^010\d{8}$/,
        message: "숫자만 입력해주세요.",
      },
      minLength: {
        value: 11,
        message: "11자리를 입력해주세요.",
      },
      maxLength: {
        value: 11,
        message: "11자리를 입력해주세요.",
      },
    },
  },
  {
    id: "email",
    type: "email",
    name: "이메일",
    placeholder: "ex) record@garden.com",
    validation: {
      required: "이메일을 입력해주세요.",
      pattern: {
        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        message: "유효한 이메일 주소를 입력해주세요.",
      },
    },
  },
  {
    id: "password",
    type: "password",
    name: "비밀번호",
    placeholder: "영어+숫자 조합 10자 이내",
    validation: {
      required: "비밀번호를 입력해주세요.",
      minLength: {
        value: 6,
        message: "비밀번호는 최소 6자 이상이어야 합니다.",
      },
      maxLength: {
        value: 10,
        message: "비밀번호는 최대 10자 이내여야 합니다.",
      },
      pattern: {
        value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,10}$/,
        message: "비밀번호는 영어, 숫자를 포함한 10자 이내여야 합니다.",
      },
    },
  },
  {
    id: "confirmPassword",
    type: "password",
    name: "비밀번호 확인",
    placeholder: "비밀번호를 한번 더 입력해주세요.",
    validation: {
      required: "비밀번호를 입력해주세요.",
      validate: (value: string, allValues: SignUpFormType) => {
        if (value !== allValues.password) {
          return "비밀번호가 일치하지 않습니다.";
        }
      },
    },
  },
];

const SignUp: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpFormType>({ mode: "onBlur" });

  const onSubmit: SubmitHandler<SignUpFormType> = (data) => {
    console.log(data);
    // 회원가입 처리 로직 추가
  };

  return (
    <div className="authenticationPage pt-5">
      <h2 className="authenticationPageTitle place-self-start ml-5 mb-10">
        기록의 정원에<br></br> 당신을 기록해주세요
      </h2>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="authenticationPageForm"
      >
        <div className="inputContainerDiv">
          {inputFields.map(({ id, type, name, placeholder, validation }) => (
            <div key={id} className="inputContainer">
              <label
                htmlFor={id}
                className="place-self-start ml-3 text-gray2 text-p"
              >
                {name}
              </label>
              <Input
                id={id}
                type={type}
                placeholder={placeholder}
                hasError={!!errors[id as keyof SignUpFormType]}
                register={register(id as keyof SignUpFormType, validation)}
              />
              {errors[id as keyof SignUpFormType] && (
                <p className="errorText">
                  {errors[id as keyof SignUpFormType]?.message}
                </p>
              )}
            </div>
          ))}
        </div>
        <div className="authenticationButtonDiv mt-10">
          <button type="submit" className="authenticationButton">
            회원가입
          </button>
        </div>
      </form>
    </div>
  );
};

export default SignUp;