import React, {
    Component,
    Fragment
} from "react";
import Header from '../components/Header';
import Leftnav from '../components/Leftnav';
import Rightchat from '../components/Rightchat';
import Appfooter from '../components/Appfooter';
import Popupchat from '../components/Popupchat';

import Profiledetail from '../components/Profiledetail';
import Profilephoto from '../components/Profilephoto';
import ProfilecardOne from '../components/ProfilecardOne';
import Createpost from '../components/Createpost';
import Events from '../components/Events';
import Postview from '../components/Postview';
import Load from '../components/Load';


class Grouppage extends Component {
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
            div className = "col-xl-4 col-xxl-3 col-lg-4 pe-0" >
            <
            ProfilecardOne / >
            <
            Profiledetail / >
            <
            Profilephoto / >
            <
            Events / >
            <
            /div> <
            div className = "col-xl-8 col-xxl-9 col-lg-8 mt-3" >
            <
            Createpost / >
            <
            Postview id = "32"
            postvideo = ""
            postimage = "t-10.jpg"
            avater = "user-7.png"
            user = "Surfiya Zakir"
            time = "22 min ago"
            des = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi nulla dolor, ornare at commodo non, feugiat non nisi. Phasellus faucibus mollis pharetra. Proin blandit ac massa sed rhoncus." / >
            <
            Postview id = "31"
            postvideo = ""
            postimage = ""
            avater = "user-8.png"
            user = "David Goria"
            time = "22 min ago"
            des = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi nulla dolor, ornare at commodo non, feugiat non nisi. Phasellus faucibus mollis pharetra. Proin blandit ac massa sed rhoncus." / >
            <
            Postview id = "33"
            postvideo = "v-2.mp4"
            postimage = ""
            avater = "user-11.png"
            user = "Anthony Daugloi"
            time = "2 hour ago"
            des = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi nulla dolor, ornare at commodo non, feugiat non nisi. Phasellus faucibus mollis pharetra. Proin blandit ac massa sed rhoncus." / >
            <
            Postview id = "35"
            postvideo = "v-1.mp4"
            postimage = ""
            avater = "user-12.png"
            user = "Victor Exrixon"
            time = "3 hour ago"
            des = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi nulla dolor, ornare at commodo non, feugiat non nisi. Phasellus faucibus mollis pharetra. Proin blandit ac massa sed rhoncus." / >
            <
            Postview id = "36"
            postvideo = ""
            postimage = "t-31.jpg"
            avater = "user-12.png"
            user = "Victor Exrixon"
            time = "12 hour ago"
            des = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi nulla dolor, ornare at commodo non, feugiat non nisi. Phasellus faucibus mollis pharetra. Proin blandit ac massa sed rhoncus." / >
            <
            Load / >
            <
            /div> <
            /div> <
            /div> <
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

export default Grouppage;