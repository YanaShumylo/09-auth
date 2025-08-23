import css from "./ProfilePage.module.css";
import { Metadata } from "next";
import { getMeServer } from "../../../lib/api/serverApi";
import Image from "next/image";
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Profile',
  description: 'User Profile Information',
};

const Profile = async () => {
  const user = await getMeServer();

  if (!user) {
    return <main className={css.mainContent}>
      <p>You are not logged in. <Link href="/login">Login here</Link>.</p>
    </main>;
  }
    return (
    <main className={css.mainContent}>
  <div className={css.profileCard}>
      <div className={css.header}>
	     <h1 className={css.formTitle}>Profile Page</h1>
	     <Link href="/profile/edit" className={css.editProfileButton}>
	       Edit Profile
	     </Link>
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