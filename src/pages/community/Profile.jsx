import React, { useContext, useEffect, useState } from 'react'
import { useLocation, useParams } from 'react-router-dom';
import { ConnectedUserContext } from '../../contexts/ConnectedUser.context';
import ProfileImage from '../../components/profiles/ProfileImage';

const Profile = () => {

    const { connectedUser, setConnectedUser } = useContext(ConnectedUserContext);
    const { id } = useParams();
    const [user, setUser] = useState();
    const [myProfile, setMyProfile] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {

        const fetchUserProfile = async () => {
            try {
                if(connectedUser.id === String(id)) {
                    setUser(connectedUser);
                    setMyProfile(true);
                    return;
                }

                const response = await fetch(`http://localhost:3000/api/users/${id}`);

            } catch (error) {
                setError(true);
            } finally {
                setLoading(false);
            }
        }

    }, []);

    return (
        <>
            <div>
                <ProfileImage image={user?.profileImage} userName={user?.name} />
            </div>
            <div>

            </div>
        </>
    )
}

export default Profile