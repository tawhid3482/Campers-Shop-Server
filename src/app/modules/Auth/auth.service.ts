import config from '../../config'
import AppError from '../../errors/AppError'
import { TLoginUser } from './auth.interface'
import httpStatus from 'http-status'
import { JwtPayload } from 'jsonwebtoken'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import { sendEmail } from '../../utils/sendEmail'
import { createToken } from './auth.utils'
import { User } from '../users/user.model'

const loginUserFromClientSite = async (payload: TLoginUser) => {
  const userData = await User.isUserExistByEmail(payload.email)
  if (!userData) {
    throw new AppError(httpStatus.NOT_FOUND, 'this user is not found!')
  }
  if (userData?.isDeleted) {
    throw new AppError(httpStatus.FORBIDDEN, 'this user is already deleted!')
  }
  //   // checking if the user is block
  if (userData.status === 'blocked') {
    throw new AppError(httpStatus.FORBIDDEN, 'this user is already blocked!')
  }

  // checking if the password is correct

  if (!(await User.isPasswordMatched(payload?.password, userData?.password))) {
    throw new AppError(httpStatus.FORBIDDEN, 'Password do not matched!')
  }

  console.log(userData)

  const jwtPayload = {
    userEmail: userData?.email,
    role: userData?.role,
  }

  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expires_in as string,
  )
  const refreshToken = createToken(
    jwtPayload,
    config.jwt_refresh_secret as string,
    config.jwt_refresh_expires_in as string,
  )

  return {
    accessToken,
    refreshToken,
    needsPasswordChange: userData?.needsPasswordChange,
  }
}

const changePasswordIntoDB = async (
  user: JwtPayload,
  payload: { oldPassword: string; newPassword: string },
) => {
  const userData = await User.isUserExistByEmail(user.userEmail)
  if (!userData) {
    throw new AppError(httpStatus.NOT_FOUND, 'this user is not found!')
  }
  if (userData?.isDeleted) {
    throw new AppError(httpStatus.FORBIDDEN, 'this user is already deleted!')
  }
  //   // checking if the user is block
  if (userData.status === 'blocked') {
    throw new AppError(httpStatus.FORBIDDEN, 'this user is already blocked!')
  }

  // checking if the password is correct

  if (
    !(await User.isPasswordMatched(payload?.oldPassword, userData?.password))
  ) {
    throw new AppError(httpStatus.FORBIDDEN, 'Password do not matched!')
  }
  // hash new password
  const newHashedPassword = await bcrypt.hash(
    payload.newPassword,
    Number(config.bcrypt_salt_rounds),
  )

  await User.findOneAndUpdate(
    {
      email: user.userEmail,
      role: user.role,
    },
    {
      password: newHashedPassword,
      needsPasswordChange: false,
      passwordChangeAt: new Date(),
    },
  )
  return null
}

const refreshTokenFrom = async (token: string) => {
  // check if the token is valid
  const decoded = jwt.verify(
    token,
    config.jwt_refresh_secret as string,
  ) as JwtPayload

  const { userEmail, role, iat } = decoded

  // check the user is exist
  const userData = await User.isUserExistByEmail(userEmail)
  if (!userData) {
    throw new AppError(httpStatus.NOT_FOUND, 'this user is not found!')
  }

  // checking if the user is deleted
  if (userData?.isDeleted) {
    throw new AppError(httpStatus.FORBIDDEN, 'this user is already deleted!')
  }

  //   // checking if the user is block
  if (userData.status === 'blocked') {
    throw new AppError(httpStatus.FORBIDDEN, 'this user is already blocked!')
  }

  if (
    userData.passwordChangeAt &&
    User.isJWTIssuedBeforePasswordChanged(
      userData.passwordChangeAt,
      iat as number,
    )
  ) {
    throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized!')
  }

  // access granted;send accessToken, refreshToken
  // create token and sent to the client
  const jwtPayload = {
    userEmail: userData?.email,
    role: userData.role,
  }

  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expires_in as string,
  )
  return { accessToken }
}

const forgetPasswordFrom = async (userEmail: string) => {
  // check the user is exist
  const userData = await User.isUserExistByEmail(userEmail)
  if (!userData) {
    throw new AppError(httpStatus.NOT_FOUND, 'this user is not found!')
  }

  // checking if the user is deleted
  if (userData?.isDeleted) {
    throw new AppError(httpStatus.FORBIDDEN, 'this user is already deleted!')
  }

  //   // checking if the user is block
  if (userData.status === 'blocked') {
    throw new AppError(httpStatus.FORBIDDEN, 'this user is already blocked!')
  }

  const jwtPayload = {
    userEmail: userData?.email,
    role: userData.role,
  }

  const resetToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    '10m',
  )

  const resetUILink = `${config.reset_pass_ui_link}?email=${userData.email}&token=${resetToken}`

  sendEmail(userData.email, resetUILink)
  console.log(resetUILink)
}

const resetPasswordFrom = async (
  payload: { email: string; newPassword: string },
  token: string,
) => {
  // check the user is exist
  const userData = await User.isUserExistByEmail(payload?.email)
  if (!userData) {
    throw new AppError(httpStatus.NOT_FOUND, 'this user is not found!')
  }
  // checking if the user is deleted
  if (userData?.isDeleted) {
    throw new AppError(httpStatus.FORBIDDEN, 'this user is already deleted!')
  }
  //   // checking if the user is block
  if (userData.status === 'blocked') {
    throw new AppError(httpStatus.FORBIDDEN, 'this user is already blocked!')
  }

  const decoded = jwt.verify(
    token,
    config.jwt_access_secret as string,
  ) as JwtPayload

  console.log(payload.email, decoded.userEmail)

  if (payload.email !== decoded.userEmail) {
    throw new AppError(httpStatus.FORBIDDEN, 'You are forbidden!')
  }
  // hash new password
  const newHashedPassword = await bcrypt.hash(
    payload.newPassword,
    Number(config.bcrypt_salt_rounds),
  )

  await User.findOneAndUpdate(
    {
      email: decoded.userEmail,
      role: decoded.role,
    },
    {
      password: newHashedPassword,
      needsPasswordChange: false,
      passwordChangeAt: new Date(),
    },
  )
}


export const authServices = {
  loginUserFromClientSite,
  changePasswordIntoDB,
  refreshTokenFrom,
  forgetPasswordFrom,
  resetPasswordFrom,
}
