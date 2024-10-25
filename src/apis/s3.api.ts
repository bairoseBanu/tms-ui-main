export const uploadfiletoS3 = async (
  signedUrl: string,
  file: File,
  contentType: string
) => {
  return fetch(signedUrl, {
    method: "PUT",
    body: file,
    headers: {
      "Content-Type": contentType,
    },
  });
};
