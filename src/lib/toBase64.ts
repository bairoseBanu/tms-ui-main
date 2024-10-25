export const toBase64: (file: File) => Promise<string> = (file: File) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      resolve(reader.result.toString());
    };
    reader.onerror = (error) => reject(error);
    reader.readAsDataURL(file);
  });
