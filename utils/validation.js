let required = (propertyType) => {
    return v => v && v.length > 0 || `${propertyType} wasn't provided`
}

let minLength = (propertyType, minLength) => {
    return v => v && v.length >= minLength || `${propertyType} must be at least ${minLength}`
}

let emailFormat = () => {
    let regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return v => v && regex.test(v) || "Email is not valid"
}

let phoneNumberFormat = () => {
    let regex = /(?<!\w)(\(?(\+|00)?48\)?)?[ -]?\d{3}[ -]?\d{3}[ -]?\d{3}(?!\w)/;
    return v => v && regex.test(v) || "Phone number is not valid"
}

export default {
    required,
    minLength,
    emailFormat,
    phoneNumberFormat
}