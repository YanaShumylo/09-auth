import css from "./ProfilePage.module.css";
import { Metadata } from "next";
import { getMe } from "../../../lib/clientApi";
import Image from "next/image";

export const metadata: Metadata = {
  title: 'Profile',
  description: 'User Profile Information',
};

const Profile = async () => {
  const user = await getMe();

    return (
    <main className={css.mainContent}>
  <div className={css.profileCard}>
      <div className={css.header}>
	     <h1 className={css.formTitle}>Profile Page</h1>
	     <a href="/profile/edit" className={css.editProfileButton}>
	       Edit Profile
	     </a>
	   </div>
     <div className={css.avatarWrapper}>
      <Image
        src={user.avatar || "/default-avatar.svg"}
        alt="User Avatar"
        width={120}
        height={120}
        className={css.avatar}
      />
    </div>
    <div className={css.profileInfo}>
      <p>
        Username: {user.username}
      </p>
      <p>
        Email: {user.email}
      </p>
    </div>
  </div>
</main>
    )
}

export default Profile;