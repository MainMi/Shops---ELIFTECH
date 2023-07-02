const errorValidateMsg = (nameValue = '', value = 0) => {
    return {
        'emptyError': `${nameValue} is not empty`,
        'maxLength': `${nameValue} charcter is too much length`,
        'dataError': `${nameValue} ${value} - is not correct`,
        'emailError': `${nameValue} is incorrect`,
        'phoneError': `${nameValue} is not correct phone number`
    }
}



export default errorValidateMsg;