export const getUserData = ({ username, attributes }: any) => ({
  username,
  email: attributes?.email,
})
