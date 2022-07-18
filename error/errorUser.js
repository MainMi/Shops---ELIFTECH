/* eslint-disable max-len */

module.exports = {
    NOT_VALID_ID: {
        en: 'Not Valid ID',
        ua: 'Неправильно підібраний ID'
    },
    NOT_VALID_NAME: {
        en: [
            'The name is incorrect.',
            'The name must contain only letters and numbers',
            'Name must be between 3 and 20 characters'
        ],
        ua: [
            "Ім'я неправильне.",
            "Ім'я повинно мати лише літери та цифри",
            "Ім'я має бути від 3 до 20 символів"
        ]
    },
    NOT_VALID_PASSWORLD: {
        en: [
            'The password is incorrect or there is no password.',
            'Password must contain numbers and letters',
            'Password must contain at least 8 characters',
            'Password must contain small and large letters',
            'The password must not have special characters "@$!%*#?&"'
        ],
        ua: [
            'Пароль неправильний або пароль відсутній.',
            'Пароль повинен містити цифри та літери',
            'Пароль має містити від 8 символів',
            'Пароль повинен містити маленькі та великі літери',
            'Пароль не повинен мати спеціальних символів "@$!%*#?&"'
        ]
    },
    NOT_VALID_EMAIL: {
        en: ['Email address is not correct. Example of a valid email: test@gmail.com'],
        ua: ['Адреса електронної пошти неправильна. Приклад дійсної електронної пошти: test@gmail.com']
    },
    NOT_VALID_PHONE: {
        en: ['The number is incorrect or the number field is missing. An example of a valid number is +12124567890 or 12124567890'],
        ua: ['Номер неправильний або поле номера відсутнє. Приклад правильного номера +12124567890 або 12124567890']
    },
    USER_AUTHORIZED: {
        en: 'this user is already registered',
        ua: 'Цей юзер вже зареєстрований'
    },
    BAD_REQUEST: {
        en: 'Bad reguest',
        ua: 'Поганий запит'
    }
};
