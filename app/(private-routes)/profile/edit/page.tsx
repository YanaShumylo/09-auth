import css from '../edit/EditProfilePage.module.css';
import { useState, useEffect } from 'react';
import { getMe, updateMe } from '../../../../lib/clientApi';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

const EditProfilePage = () => {
    const [userName, setUserName] = useState('');
const [email, setEmail] = useState('');
    const [avatar, setAvatar] = useState('/default-avatar.png');
    
    const router = useRouter();

    useEffect(() => {
        getMe().then((user) => {
            setUserName(user.username ?? '');
            setEmail(user.email ?? '');
      if (user.avatar) setAvatar(user.avatar);
  });
}, []);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserName(event.target.value);  };

  const handleSaveUser = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      await updateMe({ username: userName });
      router.push('/profile');
    } catch (error) {
      console.error('Update failed', error);
    }
  };
const handleCancel = () => {
    router.push('/profile');
};
    
    return (
        <main className={css.mainContent}>
            <div className={css.profileCard}>
                <h1 className={css.formTitle}>Edit Profile</h1>

                <Image src={avatar}
                    alt="User Avatar"
                    width={120}
                    height={120}
                    className={css.avatar} />

                <form onSubmit={handleSaveUser} className={css.profileInfo}>
                    <div className={css.usernameWrapper}>
                        <label htmlFor="username">Username:</label>
                        <input id="username"
                            type="text" value={userName} onChange={handleChange} 
                            className={css.input} required />
                    </div>

                    <p>Email: {email}</p>

                    <div className={css.actions}>
                        <button  type="submit" className={css.saveButton}>
                            Save
                        </button>
                        <button type="button" onClick={handleCancel} className={css.cancelButton}>
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </main>
    );
};

export default EditProfilePage;