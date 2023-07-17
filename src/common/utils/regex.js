export const validPassword = /^.*(?=.{12,})(?=.*[a-zA-Z])(?=.*\d)(?=.*[!#$%&?@ "]).*$/;
export const validNumberOfCharacter = /^.*(?=.{12,}).*$/;
export const validLowerCharacter = /^.*(?=.*[a-z]).*$/;
export const validUpperCharacter = /^.*(?=.*[A-Z]).*$/;
export const validNumber = /^.*(?=.*\d).*$/;
export const validSpecialCharacter = /^.*(?=.*[!#$%&?@ "]).*$/;
export const validEmail = /^.*[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}.*$/