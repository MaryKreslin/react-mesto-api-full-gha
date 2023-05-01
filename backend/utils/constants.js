const urlRegex = /http[s]?:\/\/(www\.)?[-a-zA-Z0-9:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9():%_+.~#?&//=]*)/;
const passwordRegex = /^[a-zA-Z0-9]{3,30}$/;

module.exports = { urlRegex, passwordRegex };
