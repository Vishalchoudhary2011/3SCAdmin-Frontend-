// /*
// Form fields validations like:
// -- Email
// -- Mobile
// -- Truncation extra string
// -- Password
// */

// // To validate Mobile number with 10 digits
// export const numberValidation = (num) => {
//   if (num) {
//     return /^(?:[0-9]●?){9,12}[0-9]$/g.test(num);
//   }
// };

// // To validate te email format like abc@exmaple.com
// export const emailValidation = (email) => {
//   let regx =  "/^(?=[^@]*[A-Za-z])([a-zA-Z0-9])(([a-zA-Z0-9])*([\.-_+])?([a-zA-Z0-9]))*@(([a-zA-Z0-9\-])+(\.))+([a-zA-Z]{2,3})+$/i";
//   return regx.test(String(email).toLowerCase());
// };

// // To Validate Passowrd having atleast 8 alpha numeric digits
// export const passwordValidation = (password) => {
//   return /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]).{8,}/.test(
//     password
//   );
// };

// // To handle string length (If string length exceeds the given limit, then it truncate the string with ...)
// export const truncate = (text, textLimit) => {
//   return text.slice(0, textLimit).concat("...");
// };

// export const convertBase64 = (file) => {
//   return new Promise((resolve, reject) => {
//     const fileReader = new FileReader()
//     fileReader.readAsDataURL(file)

//     fileReader.onload = () => {
//       resolve(fileReader.result)
//     }

//     fileReader.onerror = (error) => {
//       reject(error)
//     }
//   })
// }

