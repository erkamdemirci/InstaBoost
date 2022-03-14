import React from 'react'
import { Colors , FontFamilies, FontSizes } from '../../../constants'
import { View } from 'react-native'
import { SvgXml } from "react-native-svg"


export const likeData = {
    data: [
        {
        id: 1,
        postType: 'video',
        total: 100,
        done: 10,
        postUri: 'https://static.independent.co.uk/s3fs-public/thumbnails/image/2020/07/01/12/shutterstock-editorial-5886247bz.jpg?crop=61:55,smart&width=640'
        },
        {
        id: 2,
        postType: 'photo',
        total: 55,
        done: 30,
        postUri: 'https://hips.hearstapps.com/esquireuk.cdnds.net/15/37/2048x2730/2048x2730-benedict-cumberbatch-promo-43-jpg-12bdcc59.jpg?resize=480:*'
        },
        {
        id: 3,
        postType: 'video',
        total: 60,
        done: 60,
        postUri: 'https://media.giphy.com/media/DPzT8yEUKZxPG/giphy.gif'
        },
        {
        id: 4,
        postType: 'photo',
        total: 1520,
        done: 1520,
        postUri: 'https://i2.milimaj.com/i/milliyet/75/0x410/5c8e6bc345d2a02a34e7d1d2.jpg'
        },
        {
        id: 5,
        postType: 'photo',
        total: 20,
        done: 20,
        postUri: 'https://images.bursadabugun.com/haber/2019/12/09/1219552-fahriye-evcen-i-uzen-haber-5dee4cad3caf2.jpg'
        },
        {
        id: 6,
        postType: 'photo',
        total: 55,
        done: 30,
        postUri: 'https://hips.hearstapps.com/esquireuk.cdnds.net/15/37/2048x2730/2048x2730-benedict-cumberbatch-promo-43-jpg-12bdcc59.jpg?resize=480:*'
        },
        {
        id: 7,
        postType: 'video',
        total: 60,
        done: 60,
        postUri: 'https://media.giphy.com/media/DPzT8yEUKZxPG/giphy.gif'
        },
        {
        id: 8,
        postType: 'photo',
        total: 1520,
        done: 1520,
        postUri: 'https://i2.milimaj.com/i/milliyet/75/0x410/5c8e6bc345d2a02a34e7d1d2.jpg'
        },
        {
        id: 9,
        postType: 'photo',
        total: 20,
        done: 20,
        postUri: 'https://images.bursadabugun.com/haber/2019/12/09/1219552-fahriye-evcen-i-uzen-haber-5dee4cad3caf2.jpg'
        }
    ]
};

export const collectionData = {
    data: [
        {
        id: 1,
        postType: 'photo',
        total: 55,
        done: 23,
        postUri: 'https://image.winudf.com/v2/image1/Y29tLnByb2ZpbGVwaWN0dXJlcy5wcm9maWxlcGljdHVyZXMuZ2lybHNfc2NyZWVuXzNfMTU1MDU0NDk3OV8wODc/screen-3.jpg?fakeurl=1&type=.jpg'
        },
        {
        id: 2,
        postType: 'video',
        total: 35,
        done: 5,
        postUri: 'https://cdn.fastly.picmonkey.com/contentful/h6goo9gw1hh6/2sNZtFAWOdP1lmQ33VwRN3/24e953b920a9cd0ff2e1d587742a2472/1-intro-photo-final.jpg?w=800&q=70'
        },
        {
        id: 3,
        postType: 'photo',
        total: 60,
        done: 60,
        postUri: 'https://whatsappquote.com/wp-content/uploads/2020/08/nice-profile-pic-for-girl.jpg'
        },
        {
        id: 4,
        postType: 'photo',
        total: 15500,
        done: 15500,
        postUri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSM1q99ZLLIiDZYf8MAogmyxW8q_Y4wXC127w&usqp=CAU'
        },
        {
        id: 5,
        postType: 'video',
        total: 5,
        done: 20,
        postUri: 'https://monteluke.com.au/wp-content/gallery/linkedin-profile-pictures/3.JPG'
        }
    ]
};

export const followData = {
    data: [
        {
        id: 1,
        total: 15120,
        done: 2530
    },
        {
        id: 2,
        total: 55,
        done: 30
    },
        {
        id: 3,
        total: 60,
        done: 60
    },
        {
        id: 4,
        total: 1520,
        done: 1520,
    },
        {
        id: 5,
        total: 20,
        done: 20
        },
    ]
};

export const commentData = {
    data: [
        {
        id: 1,
        postType: 'photo',
        total: 5,
        done: 3,
        postUri: 'https://st2.depositphotos.com/8359710/11111/i/950/depositphotos_111117108-stock-photo-guy-is-taking-a-selfie.jpg',
        comments: [
                {key:1, comment:"I saw six men kicking and punching the mother-in-law. My neighbor said “Are you going to help?” I said, “No, Six should be enough.”😊", isDone:false},
                {key:2, comment:"Sorry, I can't hangout. 👌 My uncle's cousin's sister in law's best friend's insurance agent's roommate's pet goldfish died. Maybe next time.", isDone:true},
                {key:3, comment:"From this day on I shall be known as Bob. For Bob is a good name and I am good. But if you want you can just call me Sally.", isDone:true},
            ] 
        },
        {
        id: 2,
        postType: 'video',
        total: 3,
        done: 1,
        postUri: 'https://res.cloudinary.com/twenty20/private_images/t_watermark-criss-cross-10/v1449402418000/photosp/e56816c9-8720-4d3f-9042-784f8e549efd/stock-photo-nature-photography-portrait-walking-morning-fog-girl-selfie-lips-e56816c9-8720-4d3f-9042-784f8e549efd.jpg',
        comments: [
                {key:1, comment:"I like to say things twice, say things twice. It can get annoying though, annoying though.", isDone:false},
                {key:2, comment:"I like to wax my legs and stick the hair on my back. Why? Because it keeps my back warm. There's method in my madness.", isDone:false},
                {key:3, comment:"Buddy you're a young man hard man Shoutin' in the street gonna take on the world some day You got blood on yo' face You big disgrace Wavin' your banner all over the place.", isDone:false},
            ] 
        },
        {
        id: 3,
        postType: 'photo',
        total: 3,
        done: 3,
        postUri: 'https://tr.web.img2.acsta.net/r_640_360/newsv7/19/12/27/12/04/4513102.jpg',
        comments: [
                {key:1, comment:'Chicken Biryani', isDone:false},
                {key:2, comment:'Mutton Biryani', isDone:false},
                {key:3, comment:'Prawns Biryani', isDone:false},
            ] 
        },
        {
        id: 4,
        postType: 'photo',
        total: 20,
        done: 20,
        postUri: 'https://i2.milimaj.com/i/milliyet/75/0x410/5c8e6bc345d2a02a34e7d1d2.jpg',
        comments: [
                {key:1, comment:"Girls have an unfair advantage over men: If they can't get what they want by being smart, they can get it by being dumb.", isDone:false},
                {key:2, comment:"Life is full of temporary situations, ultimately ending in a permanent solution.", isDone:false},
                {key:3, comment:"Thank you Facebook, I can now farm without going outside, cook without being in my kitchen, feed fish I don't have & waste an entire day without having a life.", isDone:false},
            ] 
        },
        {
        id: 5,
        postType: 'photo',
        total: 2,
        done: 2,
        postUri: 'https://images.bursadabugun.com/haber/2019/12/09/1219552-fahriye-evcen-i-uzen-haber-5dee4cad3caf2.jpg',
        comments: [
                {key:1, comment:"Don't you find it Funny that after Monday(M) and Tuesday(T), the rest of the week says WTF?", isDone:false},
                {key:2, comment:"Microsoft bought Skype for 8,5 billion!.. what a bunch of idiots! I downloaded it for free!", isDone:false},
                {key:3, comment:"Sorry, I can't hangout. My uncle's cousin's sister in law's best friend's insurance agent's roommate's pet goldfish died. Maybe next time.", isDone:false},
            ] 
        }
    ]
};