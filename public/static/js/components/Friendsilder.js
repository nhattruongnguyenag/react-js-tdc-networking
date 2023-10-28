import React, {
    Component
} from 'react';
import Slider from "react-slick";

const memberList = [{
        bgUrl: 'u-bg.jpg',
        imageUrl: 'user-11.png',
        name: 'Aliqa Macale ',
        email: '@AliqaMacale',
    },
    {
        bgUrl: 's-2.jpg',
        imageUrl: 'user-2.png',
        name: 'Seary Victor ',
        email: '@SearyVictor',
    },
    {
        bgUrl: 's-6.jpg',
        imageUrl: 'user-3.png',
        name: 'John Steere ',
        email: '@JohnSteere',
    },
    {
        bgUrl: 'bb-16.png',
        imageUrl: 'user-4.png',
        name: 'Mohannad Zitoun ',
        email: '@MohannadZitoun',
    },
    {
        bgUrl: 'e-4.jpg',
        imageUrl: 'user-7.png',
        name: 'Studio Express ',
        email: '@StudioExpress',
    },
    {
        bgUrl: 'coming-soon.png',
        imageUrl: 'user-5.png',
        name: 'Hendrix Stamp ',
        email: '@HendrixStamp',
    },
    {
        bgUrl: 'bb-9.jpg',
        imageUrl: 'user-6.png',
        name: 'Mohannad Zitoun ',
        email: '@MohannadZitoun',
    },
]

class Friendsilder extends Component {
    render() {
        const friendsettings = {
            arrows: false,
            dots: false,
            infinite: true,
            speed: 300,
            slidesToShow: 1,
            centerMode: false,
            variableWidth: true,
        };
        return ( <
            Slider { ...friendsettings
            } > {
                memberList.map((value, index) => ( <
                    div key = {
                        index
                    }
                    className = "card w150 d-block border-0 shadow-xss rounded-3 overflow-hidden mb-3 me-3 " >
                    <
                    div className = "card-body d-block w-100 ps-3 pe-3 pb-4 text-center" >
                    <
                    figure className = "overflow-hidden avatar ms-auto me-auto mb-0 position-relative w65 z-index-1" > < img src = {
                        `assets/images/${value.imageUrl}`
                    }
                    alt = "avater"
                    className = "float-right p-0 bg-white rounded-circle w-100 shadow-xss" / > < /figure> <
                    div className = "clearfix" > < /div> <
                    h4 className = "fw-700 font-xssss mt-3 mb-1 d-block w-100" > {
                        value.name
                    } < /h4> <
                    p className = "fw-500 font-xsssss text-grey-500 mt-0 mb-3 lh-2" > {
                        value.email
                    } < /p> <
                    a href = "/"
                    className = "text-center p-2 lh-20 w100 ms-1 ls-3 d-inline-block rounded-xl bg-success font-xsssss fw-700 ls-lg text-white" > FOLLOW < /a> <
                    /div> <
                    /div>
                ))
            } <
            /Slider>
        );
    }
}

export default Friendsilder;