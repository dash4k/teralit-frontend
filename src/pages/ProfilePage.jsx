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
        <div>
          <div className="flex items-center gap-sm mb-xs">
            <Heading>Profile</Heading>
          </div>
          <p className="text-label-md font-label-md text-on-surface-variant dark:text-inverse-on-surface">Manage your account details</p>
        </div>
        <div className="flex items-center gap-md bg-surface-container dark:bg-inverse-surface rounded-lg px-md py-sm">
          <div className="w-13 h-13 rounded-full bg-primary flex items-center justify-center text-on-primary dark:text-primary dark:bg-inverse-primary font-headline-md text-headline-md shrink-0">
            {authedUser.name?.charAt(0).toUpperCase()}
          </div>
          <div>
            <p className="text-body-md font-medium text-on-surface dark:text-inverse-on-surface">{authedUser.name}</p>
            <p className="text-label-md text-on-surface-variant dark:text-inverse-on-surface">{authedUser.email}</p>
          </div>
        </div>
        <div className="border border-outline rounded-lg overflow-hidden bg-surface dark:bg-inverse-surface">
          <div className="bg-surface-container-low dark:bg-primary px-md py-xs border-b border-outline flex items-center gap-sm">
            <p className="text-label-bold font-label-bold text-primary dark:text-inverse-on-surface uppercase tracking-widest py-2">Personal Info</p>
          </div>
          <div className="p-md flex flex-col gap-md">
            <Input
              id='name'
              type='text'
              value={name}
              setValue={setName}
              label='Name'
              placeholder=''
            />
            <Button
              loading={editLoading}
              disabled={editLoading}
              fullWidth
              onClick={onEditProfile}
            >
              Save Changes
            </Button>
            <div className="border-t border-outline pt-md flex flex-col gap-xs">
              <Input
                id='email'
                type='email'
                value={authedUser.email}
                setValue={() => {}}
                label='Email'
                placeholder=''
                disabled
              />
              <p className="text-label-md font-label-md text-on-surface-variant dark:text-inverse-on-surface">Email cannot be changed</p>
            </div>
          </div>
        </div>
        <div className="border border-error rounded-lg overflow-hidden bg-surface dark:bg-inverse-surface">
          <div className="bg-error-container px-md py-xs border-b border-error dark:bg-error flex items-center gap-sm">
            <p className="text-label-bold font-label-bold text-on-error-container dark:text-inverse-on-surface uppercase tracking-widest py-2">Danger Zone</p>
          </div>
          <div className="p-md flex flex-col gap-md">
            <div>
              <p className="text-body-md font-medium text-on-surface dark:text-inverse-on-surface mb-xs">Delete your account</p>
              <BodyText>Permanently removes your account and all associated data. This action cannot be undone.</BodyText>
            </div>
            <Button
              loading={deleteLoading}
              disabled={deleteLoading}
              onClick={onDeleteAccount}
              fullWidth={false}
              color="error"
            >
              Delete Account
            </Button>
          </div>
        </div>

      </div>
    </section>
  );
};

export default ProfilePage;
