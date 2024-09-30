import React from "react";
import Swal from "sweetalert2";
import { useEffect } from "react";

export const nicksetting = async (setNick) => {
  const { value } = await Swal.fire({
    title: "닉네임입력",
    icon: "warning",
    input: "text",
    inputPlaceholder: "이름 안 적으면 못 들어가염",
    confirmButtonText: "확인",
    allowOutsideClick: false,
    preConfirm: (value) => {
      if (value.trim() === "") {
        Swal.showValidationMessage("어허");
        return false;
      }
      return value;
    },
  });
  if (value) {
    setNick(value);
  }
};

const NickInput = ({ setNick }) => {
  useEffect(() => {
    nicksetting(setNick);
  }, []);
};

export default NickInput;
