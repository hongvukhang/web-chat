import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { notDisplay } from "../redux/showAlertSlice";
export default function useNavigateCustom() {
  const dispath = useDispatch();

  const naviagte = useNavigate();

  return (path, options) => {
    dispath(notDisplay());
    naviagte(path, options);
  };
}
