import * as yup from 'yup';


// Локалізовані повідомлення для різних мов
const messages = {
    en: {
        mixed: {
            required: ({ path }) => `${path} is required`,
        },
        string: {
            email: 'Enter a valid email address',
            min: ({ min }) => `Field must be at least ${min} characters`,
            max: ({ max }) => `Field must be at most ${max} characters`,
        },
    },
    ua: {
        mixed: {
            required: ({ path }) => `${path} є обов'язковим`,
        },
        string: {
            email: 'Введіть дійсну електронну адресу',
            min: ({ min }) => `Поле повинно містити щонайменше ${min} символів`,
            max: ({ max }) => `Поле повинно містити не більше ${max} символів`,
        },
    },
};

// Функція для встановлення локалізації
export const setLocaleForYup = (language) => {
    yup.setLocale(messages[language] || messages.en);
};

// Використання схеми
export const getUserSchema = (language) => {
    // Встановлюємо мову
    setLocaleForYup(language);
    // Повертаємо схему
    return yup.object().shape({
        name: yup.string().required().min(3).max(20),
        email: yup.string().email().required(),
        password: yup
            .string()
            .required()
            .min(8)
            .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
            .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
            .matches(/[0-9]/, 'Password must contain at least one digit'),
        confirmPassword: yup
            .string()
            .required()
            .oneOf([yup.ref('password')], 'Passwords must match'),
    });
}