import React from 'react'

const ProfileImage = ({ image, userName }) => {
    return (
        <div className="inline-block relative">
            <img
                src={image}
                alt={userName}
                className='rounded-full h-24 w-24 object-cover'
            />
        </div>
    )
}

export default ProfileImage