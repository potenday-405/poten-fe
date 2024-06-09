import React, { useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import Input from "../components/ui/Input";
import logo_login from "../assets/image/logo_login.png";
import { useAuthContext } from "../context/AuthContext";
import { useMessage } from "../context/MessageContext";
import { Snackbar } from "../components/SnackBar";
import axiosInstance from "../api/axiosInstance";
import DangerIcon from "../components/ui/icons/DangerIcon";

interface SignInFormType {
  email: string;
  password: string;
}

const SignIn: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInFormType>({ mode: "onBlur" });
  const { login } = useAuthContext();
  const navigate = useNavigate();
  const { state, clearMessage, setMessage } = useMessage();

  useEffect(() => {
    if (state.message) {
      const timer = setTimeout(() => {
        clearMessage();
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [state]);

  useEffect(() => {
    const tokenExpired = localStorage.getItem("token_expired");
    if (tokenExpired === "true") {
      setMessage("토큰이 만료되었습니다.", <DangerIcon />);
      const timer = setTimeout(() => {
        localStorage.removeItem("token_expired");
        clearMessage();
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, []);

  const onSubmit: SubmitHandler<SignInFormType> = async (data) => {
    // console.log(data);
    try {
      const response = await axiosInstance.post(
        `/user/login`,
        {
          email: data.email,
          user_password: data.password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("로그인 성공", response);
      login(response.data.access_token, response.data.refresh_token);
      navigate("/");
    } catch (error) {
      console.error("로그인 오류:", error);
    }
  };

  return (
    <div className="formPage">
      <div className="w-[140px] h-[74px] mt-[80px] mb-[95px]">
        <img src={logo_login} alt="기록의 정원 로고" />
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="formPageForm">
        <div className="inputContainerDiv">
          <div className="inputContainer">
            <Input
              id="email"
              type="email"
              placeholder="이메일"
              hasLabel={false}
              hasError={!!errors.email}
              register={register("email", {
                required: "이메일을 입력해주세요.",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "유효한 이메일 주소를 입력해주세요.",
                },
              })}
            />
            {errors.email && (
              <p className="errorText left-[16px]">{errors.email.message}</p>
            )}
          </div>
          <div className="inputContainer">
            <Input
              id="password"
              type="password"
              placeholder="비밀번호"
              hasLabel={false}
              hasError={!!errors.password}
              register={register("password", {
                required: "비밀번호를 입력해주세요.",
              })}
            />
            {errors.password && (
              <p className="errorText left-[16px]">{errors.password.message}</p>
            )}
          </div>
        </div>
        <div className="authenticationButtonDiv mt-[112px]">
          <button
            type="submit"
            className="w-full font-semibold text-[16px] min-w-70 h-[48px] flex items-center justify-center bg-main text-white rounded-xl"
          >
            로그인
          </button>
          <Link
            className="w-full relative font-semibold text-[16px] min-w-70 h-[48px] flex items-center justify-center bg-kakao text-textGray1 rounded-xl"
            to="/signup"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="18"
              fill="none"
              className="absolute left-[16px]"
            >
              <path
                fill="#000"
                fillRule="evenodd"
                d="M9.6.976C4.298.976 0 4.106 0 7.965c0 2.4 1.662 4.517 4.194 5.775L3.13 17.407c-.094.324.298.582.6.394l4.669-2.904c.395.036.795.057 1.202.057 5.301 0 9.6-3.13 9.6-6.99 0-3.858-4.299-6.988-9.6-6.988Z"
                clipRule="evenodd"
                opacity=".902"
              />
            </svg>
            카카오 로그인
          </Link>
        </div>
        <div className="w-full text-center">
          <div className="mt-6 text-[14px] font-normal text-gray3 underline underline-offset-1">
            <Link to="/tutorial">로그인 없이 둘러보기</Link>
          </div>
        </div>
      </form>
      <div className="mt-[90px]">
        <Link to="/find-email" className="font-normal text-[14px] text-gray3">
          이메일 찾기
        </Link>
        <span className="font-normal text-[12px] text-gray1 mx-[10px]">|</span>
        <Link
          to="/find-password"
          className="font-normal text-[14px] text-gray3"
        >
          비밀번호 찾기
        </Link>
        <span className="font-normal text-[12px] text-gray1 mx-[10px]">|</span>
        <Link to="/signup" className="font-normal text-[14px] text-gray3">
          회원가입
        </Link>
      </div>
      {state.message && <Snackbar />}
    </div>
  );
};

export default SignIn;
