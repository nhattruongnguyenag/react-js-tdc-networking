import React from 'react'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

export default function CustomizeSkeleton() {
    return (
        <div>
            {/* Header */}
            <div className="d-flex justify-content-between align-items-center">
                <Skeleton width={45} height={45} borderRadius={45} />
                <Skeleton height={25} containerClassName='w-100 ps-3 pe-3' />
                <Skeleton height={25} width={50} />
            </div>
            {/* Content */}
            <div className='mt-3 mb-3'>
                <Skeleton count={4} />
            </div>
            {/* Images */}
            <div className="mb-4 d-flex justify-content-between align-items-center">
                <Skeleton containerClassName='w-50 mr-1' height={200} />
                <Skeleton containerClassName='w-50' height={200} />
            </div>
            {/* Bottom */}
            <Skeleton className='w-100' height={45} />
        </div>
    )
}
