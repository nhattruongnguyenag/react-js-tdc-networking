import React, { useState } from 'react'

export default function UserItem() {

    return (
        <div className='card shadow-xs mb-2 border-0 bg-white p-0' style={{ flexDirection: 'row', height: 90, alignItems: 'center' }}>
            <img style={{ width: 65, height: 65, marginLeft: 30, marginRight: 20, borderRadius: 50, borderWidth: 1, borderColor: 'primary', backgroundSize:'cover' }} src='https://vnn-imgs-a1.vgcloud.vn/image1.ictnews.vn/_Files/2020/03/17/trend-avatar-1.jpg'/>
            <div className="name" style={{ width: '50%' }}><p style={{ fontSize: 17, fontWeight: 'bold' }}>Bảo Lâm</p></div>
            <div style={{ position: 'absolute', right: 0, marginRight: 30 }}>
                <button type='button' className='btn btn-outline-primary text-dark' style={{ width: 150,fontSize: 13 }}>Theo dõi</button>
            </div>
        </div>
    )
}
