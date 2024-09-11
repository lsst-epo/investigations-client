/**
 * the following queries are just stashed here until needed in the application
 * */

// https://graphql-authentication.jamesedmonston.co.uk/usage/user-details#viewer
// const ViewerQuery = graphql(`
//   query Viewer {
//     viewer {
//       ...UserFragment
//     }
//   }
// `);

// // https://graphql-authentication.jamesedmonston.co.uk/usage/authentication#refresh-jwt
// const RefreshMutation = graphql(`
//   mutation RefreshToken($refreshToken: String!) {
//     refreshToken(refreshToken: $refreshToken) {
//       ...AuthFragment
//     }
//   }
// `);

// // https://graphql-authentication.jamesedmonston.co.uk/usage/user-details#update-viewer
// const UpdateViewerMutation = graphql(`
//   mutation UpdateViewer {
//     updateViewer(input: UserInterface) {
//       ...UserFragment
//     }
//   }
// `);

// // https://graphql-authentication.jamesedmonston.co.uk/usage/user-details#update-password
// const UpdatePasswordMutation = graphql(`
//   mutation UpdatePassword(
//     $currentPassword: String!
//     $newPassword: String!
//     $confirmPassword: String!
//   ) {
//     updatePassword(
//       currentPassword: $currentPassword
//       newPassword: $newPassword
//       confirmPassword: $confirmPassword
//     )
//   }
// `);
