import React from 'react'

interface DefaultAvatarType {
    name: string,
    size: number,
    styleBootstrap: string | undefined
}

export default function DefaultAvatar(props: Readonly<DefaultAvatarType>) {

    return (
        <div
            style={{ width: props.size, height: props.size }}
            className={`avatar-default-user-header-post rounded-full shadow-sm bg-greylight ${props.styleBootstrap}`}
        >
            <span>{props.name[0]}</span>
        </div>
    )
}
