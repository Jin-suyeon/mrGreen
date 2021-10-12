import React, { useRef, useEffect, useState } from "react";
import "../../Styles/Signup.css";
import axios from "axios";
import { isValidEmail, isValidPassword } from "../../Utils/validCheckForLogin";
require("dotenv").config();

function Signup({ signupModal, setSignupModal, setLoginModal }) {
  const [signupValue, setSignupValue] = useState({ 
    email: "",
    nickname: "",
    password: "",
    gender: "",
  });

  const [examineSignup, setExamineSignup] = useState({  
    gender: false,
    email: "0",
    password: "0",
    nickname: "0",
  });

  //! 유효성 검사 useEffect
  useEffect(() => {
    nicknameValidation();
  }, [signupValue.nickname]);

  useEffect(() => {
    emailValidation();
  }, [signupValue.email]);

  useEffect(() => {
    passwordValidation();
  }, [signupValue.password]);

  useEffect(() => {
    genderValidation();
  }, [signupValue.gender]);

  //! 모달 창 useEffect
  useEffect(() => {
    window.addEventListener("click", handleCloseModal);
    return () => {
      window.removeEventListener("click", handleCloseModal);
    };
  });

  const modalEl = useRef(); 

  const handleCloseModal = (e) => { 
    if (
      signupModal &&
      (!modalEl.current || !modalEl.current.contains(e.target))
    ) {
      setSignupModal(false);
      document.body.style.overflow = "unset";
    }
  };

  const handleLoginBtn = () => { 
    setSignupModal(false); 
    setLoginModal(true);
  };

  console.log(examineSignup.nickname);

  //! 회원가입 구현
  const signupHandler = () => {
    const { email, password, gender, nickname } = examineSignup;

    console.log(email, password, gender, nickname);
    console.log(
      signupValue.email,
      signupValue.password,
      signupValue.gender,
      signupValue.nickname
    );

    if (!email || !password || !gender || !nickname) {
      setExamineSignup({ ...examineSignup, ["nickname"]: false });
    } else {
      axios({
        method: "POST'",
        url: `http://localhost:80/user/signup`,
        headers: {
          "Content-Type": "application/json",
          // "Access-Control-Allow-Origin": "http://localhost:80", // 오리진 지정
          // "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS", // 메소드 지정
          // "Access-Control-Allow-Headers": "Content-Type, Accept", // 헤더지정
          // "Access-Control-Max-Age": 10, // 얼마나 자주 프리플라이트 리퀘스트를 보낼껀지
        },
        withCredentials: true,
        data: {
          email: signupValue.email,
          nickname: signupValue.nickname,
          password: signupValue.password,
          gender: signupValue.gender,
        },
      })
        .then((res) => {
          if (res.status === 201) {
            console.log("-----res-----", res);
            setSignupModal(false);
            setLoginModal(true);
            document.body.style.overflow = "hidden";
            alert("회원가입 완료");
          }
        })
        .catch((err) => alert(err));
    }
  };

  //! 유효성 검사
  const nicknameValidation = () => {
    if (signupValue.nickname.length > 0) {
      setExamineSignup({ ...examineSignup, ["nickname"]: true });
    } else {
      setExamineSignup({ ...examineSignup, ["nickname"]: false });
    }
  };

    if (
      signupValue.gender.length > 0 ||
      signupValue.nickname.length > 0 ||
      reg_pw3.test(signupValue.password) ||
      reg_email.test(signupValue.email)
    ) {
      console.log("스테이트 true");
      setExamineSignup({ ...examineSignup, [e.target.name]: true }); 
    } else if (
      signupValue.gender.length === 0 ||
      signupValue.nickname.length === 0 ||
      reg_pw3.test(signupValue.password) ||
      reg_email.test(signupValue.email)
    ) {
      console.log("스테이트 false");
      setExamineSignup({ ...examineSignup, [e.target.name]: false });  
    }
  };

  //! input value 함수
  const signupInputValueHandler = (e) => {
    const { name, value } = e.target;

    setSignupValue({ ...signupValue, [name]: value });
  };

  return (
    <div className="signup">
      <div className="modal_background">
        <div className="signup_modal" ref={modalEl}>
          <div className="signup_modal_leftside">
            <div className="signup_title">Sign Up</div>
            <div className="signup_mid">
              <div className="signup_input_gender_set">
                <div className="signup_input_gender_title">Gender</div>
                <div>
                  <input
                    onKeyPress={(e) =>
                      e.key === "Enter" ? signupHandler() : null
                    }
                    onChange={(e) => signupInputValueHandler(e)}
                    name="gender"
                    type="radio"
                    name="gender"
                    value="male"
                  ></input>
                  Male
                </div>
                <div>
                  <input
                    onKeyPress={(e) =>
                      e.key === "Enter" ? signupHandler() : null
                    }
                    onChange={(e) => signupInputValueHandler(e)}
                    name="gender"
                    type="radio"
                    name="gender"
                    value="female"
                  ></input>
                  Female
                </div>
              </div>
              <div className="signup_input_gender_label"></div>
            </div>
            <div className="signup_input_area">
              <div className="signup_input_email_set">
                <input
                  onKeyPress={(e) =>
                    e.key === "Enter" ? signupHandler() : null
                  }
                  onChange={(e) => signupInputValueHandler(e)}
                  name="email"
                  type="email"
                  className="signup_input_email"
                  placeholder="Email"
                ></input>
                {examineSignup.email || examineSignup.email === "0" ? (
                  <label for="signup_input_email">&nbsp;</label>
                ) : (
                  <label for="signup_input_email">
                    올바르지 않은 이메일 형식입니다
                  </label>
                )}
              </div>
              <div className="signup_input_password_set">
                <input
                  onKeyPress={(e) =>
                    e.key === "Enter" ? signupHandler() : null
                  }
                  onChange={(e) => signupInputValueHandler(e)}
                  name="password"
                  type="password"
                  className="signup_input_password"
                  placeholder="Password"
                ></input>
                {examineSignup.password || examineSignup.password === "0" ? (
                  <label for="signup_input_password">&nbsp;</label>
                ) : (
                  <label for="signup_input_password">
                    비밀번호는 8글자 이상, 영문, 특수문자를 포함해야 합니다
                  </label>
                )}
              </div>
              <div className="signup_input_nickname_set">
                <input
                  onKeyPress={(e) =>
                    e.key === "Enter" ? signupHandler() : null
                  }
                  onChange={(e) => signupInputValueHandler(e)}
                  name="nickname"
                  type="text"
                  className="signup_input_nickname"
                  placeholder="Nickname"
                ></input>
                {examineSignup.nickname || examineSignup.gender ? (
                  <label for="signup_input_password">&nbsp;</label>
                ) : (
                  <label for="signup_input_password">
                    모든 항목을 확인해주세요
                  </label>
                )}
              </div>
            </div>
            <div className="signup_forLogin">
              <div className="signup_text">이미 가입한 아이디가 있나요?</div>
              <button className="btn signup_forLogin" onClick={handleLoginBtn}>
                로그인
              </button>
            </div>
            <button onClick={() => signupHandler()} className="btn signupBtn">
              Sign Up
            </button>
          </div>
          <div className="signup_img"></div>
        </div>
      </div>
    </div>
  );

export default Signup;
