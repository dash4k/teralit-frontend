import { useState } from 'react';
import { editProfile, removeAccount } from '../utils/api/user.js';
import useInput from '../hooks/useInput.js';
import Heading from '../components/Heading.jsx';
import Input from '../components/Input.jsx';
import Button from '../components/Button.jsx';
import BodyText from '../components/BodyText.jsx';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const ProfilePage = ({ authedUser, logout }) => {
  const navigate = useNavigate();
  const [name, setName] = useInput(authedUser.name);
  const [editLoading, setEditLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const onEditProfile = () => {
    setEditLoading(true);

    if (!name) {
      setEditLoading(false);
      toast.error('Please fill the name input');
      return;
    }

    toast.promise(editProfile({ name }), {
      loading: 'Trying to edit name',
      success: 'Name edited successfully!',
      error: (err) => err?.message ?? 'Error while trying to edit name',
    })
      .finally(() => setEditLoading(false));
  };

  const onDeleteAccount = () => {
    setDeleteLoading(true);
    toast((t) => (
      <div className="flex flex-col gap-2">
        <h2 className="text-title-md font-display font-bold text-error">Delete your account?</h2>
        <BodyText>This action cannot be undone.</BodyText>
        <div className="flex justify-between items-center gap-5">
          <Button
            size="sm"
            color="error"
            onClick={() => {
              toast.dismiss(t.id);
              proceedDeleteAccount();
            }}
            className="grow"
          >
                        Confirm
          </Button>
          <Button
            size="sm"
            variant="outlined"
            color="primary"
            onClick={() => {
              setDeleteLoading(false);
              toast.dismiss(t.id);
            }}
            className="grow"
          >
                        Cancel
          </Button>
        </div>
      </div>
    ), { duration: Infinity });
  };

  const proceedDeleteAccount = () => {
    toast.promise(removeAccount(), {
      loading: 'Deleting account',
      success: 'Account deleted successfully',
      error: (err) => err?.message ?? 'Error while trying to delete account',
    })
      .finally(() => {
        toast.loading('Redirecting you to home...', {
          duration: 500,
        });

        setTimeout(() => {
          setDeleteLoading(false);
          logout();
          navigate('/');
        }, 500);
      });
  };

  return (
    <section className="w-full min-h-dvh lg:h-auto px-container-margin mx-auto flex flex-col justify-center items-center lg:items-start">
      <div className="flex flex-col gap-lg">
        <Heading>Profile</Heading>

        <div className="flex flex-col gap-4 p-4 rounded-xl border border-outline bg-surface dark:bg-inverse-surface">
          <h2 className="text-title-md font-display font-bold text-on-surface dark:text-inverse-on-surface">
                        Personal Info
          </h2>
          <Input
            id='name'
            type='text'
            value={name}
            setValue={setName}
            label='Name'
            placeholder=''
          />
          <div className="w-full">
            <Button
              loading={editLoading}
              disabled={editLoading}
              fullWidth
              onClick={onEditProfile}
            >Change Name</Button>
          </div>
          <Input
            id='email'
            type='email'
            value={authedUser.email}
            setValue={() => {}}
            label='Email'
            placeholder=''
            disabled
          />
        </div>

        <div className="flex flex-col gap-4 p-4 rounded-xl border border-error bg-surface dark:bg-inverse-surface">
          <h2 className="text-title-md font-display font-bold text-error">
                        Danger Zone
          </h2>
          <BodyText>Permanently delete your account and all associated data. This action cannot be undone.</BodyText>
          <div>
            <Button
              loading={deleteLoading}
              disabled={deleteLoading}
              onClick={onDeleteAccount}
              fullWidth={false}
              color="error"
            >Delete Account</Button>
          </div>
        </div>

      </div>
    </section>
  );
};

export default ProfilePage;
