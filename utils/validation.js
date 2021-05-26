let required = (propertyType) => {
    return v => v && v.length > 0 || `Pole ${propertyType} jest wymagane`
}

let minLength = (propertyType, minLength) => {
    return v => v && v.length >= minLength || `${propertyType} musi mieć co najmniej ${minLength} znaków`
}

let emailFormat = () => {
    let regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return v => v && regex.test(v) || "Nieprawidłowy format email"
}

let phoneNumberFormat = () => {
    let regex = /(?<!\w)(\(?(\+|00)?48\)?)?[ -]?\d{3}[ -]?\d{3}[ -]?\d{3}(?!\w)/;
    return v => v && regex.test(v) || "Nieprawidłowy format numeru telefonu"
}

let minAge = () => {
    return v => v && v >= 18 || "Musisz mieć ukończone 18 lat"
}

export default {
    required,
    minLength,
    emailFormat,
    phoneNumberFormat,
    minAge
}