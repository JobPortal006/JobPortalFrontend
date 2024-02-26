import validation from "../Json/login.json";

const mailOne = validation.email.one;
const mailTwo = validation.email.two;
const mailThree = validation.email.three;
const passOne = validation.password.one;


export const emailBlur = (email, setEmailError, setPasswordError) => {
  const trimmedEmail = email.trim();
  if (!trimmedEmail) {
    setEmailError(mailOne);
  } else if (!trimmedEmail.endsWith(mailThree)) {
    setEmailError(mailTwo);
    setPasswordError("");
  } else {
    setEmailError("");
  }
};

export const handlePasswordBlur = (email, setEmailError) => {
  const trimmedEmail = email.trim();
  if (!trimmedEmail) {
    setEmailError(mailTwo);
  }
};

export const handleSubmit = async (
  event,
  email,
  password,
  setEmailError,
  setPasswordError,
  outputData,
  setOutputData
) => {
  event.preventDefault();

  const trimmedEmail = email.trim();
  if (!trimmedEmail && !password) {
    setEmailError(mailOne);
    setPasswordError(passOne);
  } else if (!trimmedEmail) {
    setEmailError(mailTwo);
    setPasswordError("");
  } else if (!trimmedEmail.endsWith(mailThree)) {
    setEmailError(mailTwo);
    setPasswordError("");
  } else if (!password) {
    setEmailError("");
    setPasswordError(passOne);
  } else {
    setEmailError("");
    setPasswordError("");
  }
};
