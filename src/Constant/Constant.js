export const ROUTELINKHOME = "/";
export const ROUTELINKPRODUCT = "/product/";
export const ROUTELINKFAVORITES = "/favorites";
export const ROUTELINKFAQ = "/faq";
export const FORMOBJECT =  Object.freeze({required: "Обязательное поле",
 email: { pattern: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  message: "Email не соотвествует формату электронной почты"},

 password: { pattern: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
message: "Пароль должен содержать минимум восемь символов, одну букву латинского алфавита и одну цифру"}
});