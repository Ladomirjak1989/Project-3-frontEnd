import * as yup from 'yup';

// Об'єкт із локалізованими повідомленнями про помилки
const validationErrors = {
    en: {
        required: 'This field is required',
        min: (min) => `Field must be at least ${min} characters`,
        max: (max) => `Field must be at most ${max} characters`,
        passwordUppercase: 'Password must contain at least one uppercase letter',
        passwordLowercase: 'Password must contain at least one lowercase letter',
        passwordDigit: 'Password must contain at least one digit',
        passwordMatch: 'Passwords must match',
    },
    ua: {
        required: 'Це поле є обов’язковим',
        min: (min) => `Поле повинно містити щонайменше ${min} символів`,
        max: (max) => `Поле повинно містити не більше ${max} символів`,
        passwordUppercase: 'Пароль повинен містити хоча б одну велику літеру',
        passwordLowercase: 'Пароль повинен містити хоча б одну малу літеру',
        passwordDigit: 'Пароль повинен містити хоча б одну цифру',
        passwordMatch: 'Паролі повинні співпадати',
    },
};

// Функція для отримання схеми валідації з потрібною локалізацією
export const getUserSchema = (language = 'en') => {
    const errors = validationErrors[language] || validationErrors.en;

    return yup.object().shape({
        password: yup
            .string()
            .required(errors.required)
            .min(8, errors.min(8))
            .matches(/[A-Z]/, errors.passwordUppercase)
            .matches(/[a-z]/, errors.passwordLowercase)
            .matches(/[0-9]/, errors.passwordDigit),
        confirmPassword: yup
            .string()
            .required(errors.required)
            .oneOf([yup.ref('password')], errors.passwordMatch),
    });
};
