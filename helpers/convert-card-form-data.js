export default function convertCardFormData(data) {
  const formData = new FormData();

  formData.append("en_word", data.en_word);
  formData.append("vn_word", data.vn_word);
  formData.append("meaning", data.meaning);
  formData.append("type", data.type);

  formData.append(
    "vn_choice",
    JSON.stringify(
      Array.isArray(data.vn_choice) ? data.vn_choice : data.vn_choice.split(",")
    )
  );
  formData.append(
    "en_choice",
    JSON.stringify(
      Array.isArray(data.en_choice) ? data.en_choice : data.en_choice.split(",")
    )
  );
  formData.append("ex", JSON.stringify(data.ex || []));

  formData.append("collectionId", String(data.collectionId));

  if (data.image_file) {
    formData.append("image_file", data.image_file); // data.image_file là File object
  } else if (data.image_url) {
    formData.append("image_url", data.image_url);
  }

  return formData;
}
