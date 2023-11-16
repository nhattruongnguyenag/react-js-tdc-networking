import React from 'react'
import Skeleton from 'react-loading-skeleton'

export default function CustomizeSkeletonUserProfile() {
    return (
        <div style={{ position: 'relative' }}>
            {/* Header */}
            <div className='d-flex justify-content-between align-items-center'>
                <Skeleton containerClassName='w-100 mr-1' height={400} />
                <Skeleton
                    width={150}
                    height={150}
                    borderRadius={150}
                    style={{
                        position: 'absolute',
                        bottom: 70,
                        left: 15,
                        boxShadow: '0 0 10px rgba(0, 0, 0, 0.5)'
                    }}
                />
            </div>
            {/* Content */}
            <div className='mb-3 mt-5'>
                <Skeleton className='w-100' height={45} />
            </div>
        </div>

    )
}
