import React, {
    Component
} from 'react';
import Slider from "react-slick";

const memberList = [{
        bgUrl: 'u-bg.jpg',
        imageUrl: 'user-11.png',
        name: 'Aliqa Macale ',
        email: 'support@gmail.com',
    },
    {
        bgUrl: 's-2.jpg',
        imageUrl: 'user-2.png',
        name: 'Seary Victor ',
        email: 'support@gmail.com',
    },
    {
        bgUrl: 's-6.jpg',
        imageUrl: 'user-3.png',
        name: 'John Steere ',
        email: 'support@gmail.com',
    },
    {
        bgUrl: 'bb-16.png',
        imageUrl: 'user-4.png',
        name: 'Mohannad Zitoun ',
        email: 'support@gmail.com',
    },
    {
        bgUrl: 'e-4.jpg',
        imageUrl: 'user-7.png',
        name: 'Studio Express ',
        email: 'support@gmail.com',
    },
    {
        bgUrl: 'coming-soon.png',
        imageUrl: 'user-5.png',
        name: 'Hendrix Stamp ',
        email: 'support@gmail.com',
    },
    {
        bgUrl: 'bb-9.jpg',
        imageUrl: 'user-6.png',
        name: 'Mohannad Zitoun ',
        email: 'support@gmail.com',
    },
]

class Memberslider extends Component {
    render() {
        const membersettings = {
            arrows: false,
            dots: false,
            infinite: true,
            speed: 300,
            slidesToShow: 1,
            centerMode: false,
            variableWidth: true,
        };
        return ( <
            Slider { ...membersettings
            } > {
                memberList.map((value, index) => ( <
                    div key = {
                        index
                    }
                    className = "card w200 d-block border-0 shadow-xss rounded-xxl overflow-hidden mb-3 me-3" >
                    <
                    div className = "card-body position-relative h100 bg-image-cover bg-image-center"
                    style = {
                        {
                            backgroundImage: `url("assets/images/${value.bgUrl}")`
                        }
                    } > < /div> <
                    div className = "card-body d-block w-100 ps-4 pe-4 pb-4 text-center" >
                    <
                    figure className = "avatar overflow-hidden ms-auto me-auto mb-0 mt--6 position-relative w75 z-index-1" > < img src = {
                        `assets/images/${value.imageUrl}`
                    }
                    alt = "avater"
                    className = "float-right p-1 bg-white rounded-circle w-100" / > < /figure> <
                    div className = "clearfix" > < /div> <
                    h4 className = "fw-700 font-xsss mt-2 mb-1" > {
                        value.name
                    } < /h4> <
                    p className = "fw-500 font-xsssss text-grey-500 mt-0 mb-2" > {
                        value.email
                    } < /p> <
                    span className = "live-tag mt-2 mb-0 bg-danger p-2 z-index-1 rounded-3 text-white font-xsssss text-uppersace fw-700 ls-3" > LIVE < /span> <
                    div className = "clearfix mb-2" > < /div> <
                    /div> <
                    /div>
                ))
            } <
            /Slider>
        );
    }
}

export default Memberslider;