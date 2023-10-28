import React, {
    Component,
    Fragment
} from "react";
import Header from '../components/Header';
import Leftnav from '../components/Leftnav';
import Rightchat from '../components/Rightchat';
import Pagetitle from '../components/Pagetitle';
import Appfooter from '../components/Appfooter';
import Popupchat from '../components/Popupchat';

const storyList = [{
        imageUrl: 'user-12.png',
        name: 'Aliqa Macale',
        email: 'support@gmail.com',
        bgImage: 's-1.jpg',
    },
    {
        imageUrl: 'user-8.png',
        name: 'Hendrix Stamp',
        email: 'support@gmail.com',
        bgImage: 's-2.jpg',
    },
    {
        imageUrl: 'user-7.png',
        name: 'Stephen Grider',
        email: 'support@gmail.com',
        bgImage: 's-5.jpg',
    },
    {
        imageUrl: 'user-6.png',
        name: 'Mohannad Zitoun',
        email: 'support@gmail.com',
        bgImage: 's-6.jpg',
    },
    {
        imageUrl: 'user-5.png',
        name: 'Aliqa Macale',
        email: 'support@gmail.com',
        bgImage: 's-7.jpg',
    },
    {
        imageUrl: 'user-4.png',
        name: 'Surfiya Zakir',
        email: 'support@gmail.com',
        bgImage: 's-8.jpg',
    },
    {
        imageUrl: 'user-22.png',
        name: 'Aliqa Macale',
        email: 'support@gmail.com',
        bgImage: 's-1.jpg',
    },
    {
        imageUrl: 'user-24.png',
        name: 'Surfiya Zakir',
        email: 'support@gmail.com',
        bgImage: 's-2.jpg',
    },
    {
        imageUrl: 'user-2.png',
        name: 'Aliqa Macale',
        email: 'support@gmail.com',
        bgImage: 's-9.jpg',
    },
    {
        imageUrl: 'user-3.png',
        name: 'Surfiya Zakir',
        email: 'support@gmail.com',
        bgImage: 's-10.jpg',
    },
    {
        imageUrl: 'user-4.png',
        name: 'Aliqa Macale',
        email: 'support@gmail.com',
        bgImage: 's-11.jpg',
    },
    {
        imageUrl: 'user-6.png',
        name: 'Surfiya Zakir',
        email: 'support@gmail.com',
        bgImage: 's-12.jpg',
    },

]

class Storie extends Component {

    render() {
        return ( <
            Fragment >
            <
            Header / >
            <
            Leftnav / >
            <
            Rightchat / >

            <
            div className = "main-content right-chat-active" >
            <
            div className = "middle-sidebar-bottom" >
            <
            div className = "middle-sidebar-left pe-0" >
            <
            div className = "row" >
            <
            div className = "col-xl-12" >

            <
            Pagetitle title = "Stories" / >

            <
            div className = "row ps-2 pe-1" > {
                storyList.map((value, index) => (

                    <
                    div key = {
                        index
                    }
                    className = "col-md-3 col-xss-6 pe-2 ps-2" >
                    <
                    div className = "card h300 d-block border-0 shadow-xss rounded-3 bg-gradiant-bottom overflow-hidden mb-3 bg-image-cover"
                    style = {
                        {
                            backgroundImage: `url("assets/images/${value.bgImage}")`
                        }
                    } >
                    <
                    div className = "card-body d-block w-100 position-absolute bottom-0 text-center" >
                    <
                    figure className = "avatar ms-auto me-auto mb-0 position-relative w50 z-index-1" > < img src = {
                        `assets/images/${value.imageUrl}`
                    }
                    alt = "avater"
                    className = "float-right p-0 bg-white rounded-circle w-100 shadow-xss" / > < /figure> <
                    div className = "clearfix" > < /div> <
                    h4 className = "fw-600 position-relative z-index-1 ls-3 font-xssss text-white mt-2 mb-1" > {
                        value.name
                    } < /h4> <
                    /div> <
                    /div> <
                    /div>

                ))
            }


            <
            /div> <
            /div>                <
            /div> <
            /div>

            <
            /div> <
            /div>

            <
            Popupchat / >
            <
            Appfooter / >
            <
            /Fragment>
        );
    }
}

export default Storie;