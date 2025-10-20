export default function getErrorMessage(error, mes = "Unexpected Error") {
  let message = "";
  if (typeof error === "string") {
    message = error;
  } else if (error instanceof Error) {
    message = error.message;
  } else if (error?.message) {
    message = error.message;
  } else {
    message = mes;
  }

  return message;
}
