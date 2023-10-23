import React, {
    Component
} from 'react';

class ProfilecardOne extends Component {
    render() {
        return ( <
            div className = "card w-100 shadow-xss rounded-xxl overflow-hidden border-0 mb-3 mt-3 pb-3" >
            <
            div className = "card-body position-relative h150 bg-image-cover bg-image-center"
            style = {
                {
                    backgroundImage: `url("assets/images/bb-9.jpg")`
                }
            } > < /div> <
            div className = "card-body d-block pt-4 text-center" >
            <
            figure className = "avatar mt--6 position-relative w75 z-index-1 w100 z-index-1 ms-auto me-auto" > < img src = "assets/images/pt-1.jpg"
            alt = "avater"
            className = "p-1 bg-white rounded-xl w-100" / > < /figure> <
            h4 className = "font-xs ls-1 fw-700 text-grey-900" > Surfiya Zakir < span className = "d-block font-xssss fw-500 mt-1 lh-3 text-grey-500" > @surfiyazakir22 < /span></h
            4 >
            <
            /div> <
            div className = "card-body d-flex align-items-center ps-4 pe-4 pt-0" >
            <
            h4 className = "font-xsssss text-center text-grey-500 fw-600 ms-2 me-2" > < b className = "text-grey-900 mb-1 font-xss fw-700 d-inline-block ls-3 text-dark" > 456 < /b> Posts</h
            4 >
            <
            h4 className = "font-xsssss text-center text-grey-500 fw-600 ms-2 me-2" > < b className = "text-grey-900 mb-1 font-xss fw-700 d-inline-block ls-3 text-dark" > 2.1 k < /b> Followers</h
            4 >
            <
            h4 className = "font-xsssss text-center text-grey-500 fw-600 ms-2 me-2" > < b className = "text-grey-900 mb-1 font-xss fw-700 d-inline-block ls-3 text-dark" > 32 k < /b> Follow</h
            4 >
            <
            /div> <
            div className = "card-body d-flex align-items-center justify-content-center ps-4 pe-4 pt-0" >
            <
            a href = "/defaultmember"
            className = "bg-success p-3 z-index-1 rounded-3 text-white font-xsssss text-uppercase fw-700 ls-3" > Add Friend < /a> <
            a href = "/defaultemailbox"
            className = "bg-greylight btn-round-lg ms-2 rounded-3 text-grey-700" > < i className = "feather-mail font-md" > < /i></a >
            <
            a href = "/home"
            className = "bg-greylight theme-white-bg btn-round-lg ms-2 rounded-3 text-grey-700" > < i className = "ti-more font-md" > < /i></a >
            <
            /div> <
            /div>
        );
    }
}

export default ProfilecardOne;