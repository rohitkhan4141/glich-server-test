import bcrypt from "bcrypt";

const isPasswordMatched = async(givenPassword,savedPassword) => {
    return await bcrypt.compare(givenPassword, savedPassword)
}

export default isPasswordMatched;