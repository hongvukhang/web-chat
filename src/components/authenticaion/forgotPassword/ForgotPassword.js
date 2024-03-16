import axios from "axios";
import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { FaEyeSlash } from "react-icons/fa";
import { IoEyeSharp } from "react-icons/io5";

import { IoIosArrowBack } from "react-icons/io";

import classes from "./ForgotPasswordBackup.module.css";

import Alerts from "../../portal/alert/Alert";

// export default function ForgotPassword() {
//   const navigate = useNavigate();
//   const [emailUser, setEmailUser] = useState("");
//   const [newPassPage, setNewPassPage] = useState(false);

//   //change password render
//   const ChangePassword = () => {
//     const [isShowPassword, setIsShowPassword] = useState(false);
//     const [isShowPasswordConfirm, setIsShowPasswordComfirm] = useState(false);
//     const [success, setSuccess] = useState(false);
//     const passwordRef = useRef();
//     const passwordComfirmRef = useRef();

//     const sendNewPassword = (e) => {
//       e.preventDefault();
//       const password = passwordRef.current.value;
//       const passwordComfirm = passwordComfirmRef.current.value;

//       const validate = () => {
//         if (password.length < 8) return false;
//         if (password !== passwordComfirm) return false;
//         return true;
//       };
//       if (validate()) {
//         axios
//           .post("/new-password", {
//             password: password,
//             passwordComfirm: passwordComfirm,
//             email: emailUser,
//           })
//           .then((res) => {
//             setSuccess(true);
//           })
//           .catch((err) => {});
//       } else {
//         console.log("false");
//       }
//     };
//     return (
//       <FormData submitHandler={sendNewPassword}>
//         <div className={classes["input-password"]}>
//           <input
//             type={!isShowPassword ? "password" : "text"}
//             ref={passwordRef}
//             placeholder="Password..."
//             required
//           />
//           {!isShowPassword && (
//             <FaEyeSlash onClick={() => setIsShowPassword((is) => !is)} />
//           )}
//           {isShowPassword && (
//             <IoEyeSharp onClick={() => setIsShowPassword((is) => !is)} />
//           )}
//         </div>
//         <div className={classes["input-password"]}>
//           <input
//             type={!isShowPasswordConfirm ? "password" : "text"}
//             ref={passwordComfirmRef}
//             placeholder="Comfirm Password..."
//             required
//           />
//           {!isShowPasswordConfirm && (
//             <FaEyeSlash onClick={() => setIsShowPasswordComfirm((is) => !is)} />
//           )}
//           {isShowPasswordConfirm && (
//             <IoEyeSharp onClick={() => setIsShowPasswordComfirm((is) => !is)} />
//           )}
//         </div>
//         <button className={classes["btn-submit"]}>Submit</button>
//         {success && (
//           <div className={classes["success"]}>
//             <p>Password has been changed</p>
//             <span onClick={() => navigate("/login")}>Login!</span>
//           </div>
//         )}
//       </FormData>
//     );
//   };
//   const GetOTP = () => {
//     const [isOTP, setIsOTP] = useState(false);
//     const [userName, setUserName] = useState("");
//     const [OTP, setOTP] = useState("");
//     const [err, setErr] = useState({
//       userName: false,
//       otp: false,
//     });
//     const [email, setEmail] = useState({ email: "", emailFormat: "" });
//     const [isLoading, setIsLoading] = useState({ userName: false, otp: false });
//     //format email
//     const formatEmail = (email) => {
//       const a = email.split("@");
//       let newEmail = "";
//       for (let i = 0; i < a[0].length; i++) {
//         if (i === 0 || i === a[0].length - 1) {
//           newEmail += a[0][i];
//           continue;
//         }
//         newEmail += "*";
//       }
//       return (newEmail + "@").concat(a[1]);
//     };

//     // submit handler
//     const submitUserNameHandler = (e) => {
//       e.preventDefault();
//       setIsLoading({ ...isLoading, userName: true });
//       axios
//         .post("/email/send-otp-forgot-password", { userName: userName })
//         .then((res) => {
//           setEmail({
//             email: res.data.info.accepted[0],
//             emailFormat: formatEmail(res.data.info.accepted[0]),
//           });

//           setIsOTP(true);
//           setErr({ ...err, userName: false });
//           setTimeout(() => {
//             setIsLoading({ ...isLoading, userName: false });
//           }, 120000);
//         })
//         .catch((err) => {
//           setErr({ ...err, userName: true });
//           setIsLoading({ ...isLoading, userName: false });
//         });
//     };

//     const submitSendOTP = (e) => {
//       e.preventDefault();

//       setIsLoading({ ...isLoading, otp: true });

//       const data = { otp: OTP, email: email.email };
//       axios
//         .post("/email/validate-otp", data)
//         .then((res) => {
//           setErr({ ...err, otp: false });
//           setNewPassPage(true);
//           setIsLoading({ ...isLoading, otp: false });
//           setEmailUser(email.email);
//         })
//         .catch((err) => {
//           setErr({ ...err, otp: true });
//           setIsLoading({ ...isLoading, otp: false });
//         });
//     };
//     return (
//       <>
//         <FormData submitHandler={submitUserNameHandler}>
//           <Input
//             title="UserName"
//             changeData={(e) => setUserName(e.target.value)}
//             type="text"
//           />
//           {err.userName && (
//             <p className={classes.error}>Username does not exist</p>
//           )}

//           {!isLoading.userName && (
//             <button className={classes["btn-otp"]}>
//               {isOTP ? "Send OTP back" : "Send OTP"}
//             </button>
//           )}
//           {isLoading.userName && <Loading />}
//         </FormData>
//         {isOTP && (
//           <FormData submitHandler={submitSendOTP}>
//             <p className={classes["paragraph-email"]}>
//               Please check your email: {email.emailFormat}
//             </p>
//             <Input
//               title="OTP..."
//               changeData={(e) => setOTP(e.target.value)}
//               type="text"
//             />
//             {err.otp && <p className={classes.error}>OTP is wrong!</p>}

//             {!isLoading.otp && (
//               <button className={classes["btn-otp"]}>Submit OTP</button>
//             )}
//             {isLoading.otp && <Loading />}
//           </FormData>
//         )}
//       </>
//     );
//   };

//   return (
//     <Layout>
//       <span></span>
//       {newPassPage && <GetOTP />}
//       {!newPassPage && <ChangePassword />}
//       <span></span>
//     </Layout>
//   );
// }

export default function ForgotPassword() {
  const navigate = useNavigate();
  const defaultAlert = {
    status: false,
    msg: "",
    severity: "",
    actions: () => {},
    close: () => closeHandler(),
  };
  const [changePassword, setChangePassword] = useState(false);
  const [alert, setAlert] = useState(defaultAlert);
  const [email, setEmail] = useState("exam@gmail.com");

  const userNameRef = useRef();
  const passwordRef = useRef();
  const passwordComfirmRef = useRef();
  const otpRef = useRef();

  function closeHandler() {
    setAlert(defaultAlert);
  }
  //format email
  const formatEmail = (email) => {
    const a = email.split("@");
    let newEmail = "";
    for (let i = 0; i < a[0].length; i++) {
      if (i === 0 || i === a[0].length - 1) {
        newEmail += a[0][i];
        continue;
      }
      newEmail += "*";
    }
    return (newEmail + "@").concat(a[1]);
  };
  //submit username
  const submitUserNameHandler = (e) => {
    e.preventDefault();
    const userName = userNameRef.current.value;
    if (!userName) {
      setAlert({
        ...defaultAlert,
        status: true,
        msg: "UserName is empty!",
        severity: "error",
      });
      return;
    }

    axios
      .post("/email/send-otp-forgot-password", { userName: userName })
      .then((res) => {
        setEmail(res.data.info.accepted[0]);
        setChangePassword(true);
      })
      .catch((err) => {
        setAlert({
          ...defaultAlert,
          status: true,
          msg: err?.response?.data?.msg,
          severity: "error",
        });
      });
  };
  const validatePassword = (password, comfirmPassword, otp) => {
    if (!password) {
      setAlert({
        ...alert,
        status: true,
        severity: "error",
        msg: "Password is empty!",
      });
      return false;
    }
    if (!comfirmPassword) {
      setAlert({
        ...alert,
        status: true,
        severity: "error",
        msg: "Comfirm password is empty!",
      });
      return false;
    }
    if (!otp) {
      setAlert({
        ...alert,
        status: true,
        severity: "error",
        msg: "OTP is empty!",
      });
      return false;
    }
    if (comfirmPassword !== password) {
      setAlert({
        ...alert,
        status: true,
        severity: "error",
        msg: "Confirm password and password are not the same",
      });
      return false;
    }
    if (password.length < 8) {
      setAlert({
        ...alert,
        status: true,
        severity: "error",
        msg: "Password length is less than eight",
      });
      return false;
    }
    return true;
  };
  const submitPasswordHandler = (e) => {
    e.preventDefault();
    const password = passwordRef.current.value;
    const passwordComfirm = passwordComfirmRef.current.value;
    const otp = otpRef.current.value;
    const val = validatePassword(password, passwordComfirm, otp);
    if (!val) return;
    axios
      .post("/new-password", {
        password: password,
        passwordComfirm: passwordComfirm,
        otp: otp,
        email: email,
      })
      .then((res) => {
        setAlert({
          status: true,
          close: () => {
            navigate("/login");
          },
          severity: "success",
          msg: res.data.msg,
        });
      })
      .catch((err) => {
        setAlert({
          status: true,
          severity: "error",
          msg: err?.response?.data?.msg,
        });
      });
  };

  return (
    <div className={classes.container}>
      {alert.status && (
        <Alerts
          severity={alert.severity}
          msg={alert.msg}
          close={alert.close}
          actionHandler={alert.actions}
        />
      )}
      <main className={classes.content}>
        {changePassword && (
          <IoIosArrowBack onClick={() => setChangePassword(false)} />
        )}
        <h2 className={classes.title}>Forgot Password</h2>
        {!changePassword && (
          <form
            onSubmit={submitUserNameHandler}
            className={classes["form-username"]}
          >
            <p>User Name:</p>
            <input type="text" placeholder="User Name" ref={userNameRef} />
            <button className={classes.btn}>Submit</button>
          </form>
        )}
        {changePassword && (
          <form
            className={classes["form-username"]}
            onSubmit={submitPasswordHandler}
          >
            <p>Password:</p>
            <input
              type="password"
              placeholder="Password"
              required
              ref={passwordRef}
            />
            <p>Comfirm password:</p>
            <input
              type="password"
              placeholder="Comfirm password"
              required
              ref={passwordComfirmRef}
            />
            <p>OTP: (Please check your email: {formatEmail(email)})</p>
            <input type="text" placeholder="OTP" required ref={otpRef} />
            <button className={classes.btn}>Submit</button>
          </form>
        )}
      </main>
    </div>
  );
}
