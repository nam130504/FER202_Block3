// src/components/UserProfile.js
const UserProfile = ({ user }) => (
  <div>
    <p style={{display: "flex", justifyContent: "center"}}>Hello, {user.name}, {user.age} tuổi</p>
  </div>
);
export default UserProfile;
