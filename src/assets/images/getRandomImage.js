function getRandomImage () {
    let images = [
        'https://cdn.images.express.co.uk/img/dynamic/25/590x/secondary/Google-Maps-Street-View-has-captured-a-close-up-of-a-very-confused-and-very-cute-cat-1423729.jpg?r=1532353596872',
        'https://iruntheinternet.com/lulzdump/images/stoned-looking-cat-close-up-picture-13849018563.jpg',
        'https://i.pinimg.com/564x/2a/c1/d6/2ac1d69e8948129160842716ba1a8683.jpg',
        'https://lh3.googleusercontent.com/proxy/nAz0VALCyGcxzWiBEr3eDeTA10vu7v1EsF5pkpKJj5gVaJ-wPFtS6-WEdZf934qEP-R7Jpw9q9XI-U486Rb09B9T07qTLMrbdV8qWQl0A49JAgVtEHeSUZa_Q6adw7fb4So807ISnyqdiHW08RRHLw',
        'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSm_fOn75B7WzCl9gIhBqAqjiSmCIqwdQrDEHzf0HTIfCqCq1Vj71iszAMirZc4alSA0ygIgWxOAY5fiSypsQTCvd6r4uNmGqjt70ueivg&usqp=CAU&ec=45725303',
        'https://i.pinimg.com/564x/f1/23/05/f1230501d33cb2c6055b2d6ea221a22d.jpg',
        'https://media.tenor.com/images/c50ba1f5c34496af4f9eb2a805ef29ea/tenor.gif',
        'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRB_mt5A7b2-UR_9NKmESs-1OJ9-daZW9xaeg&usqp=CAU',
        'https://pbs.twimg.com/media/C5AmsxoWIAAWlfS.jpg',
        'https://img.webmd.com/dtmcms/live/webmd/consumer_assets/site_images/article_thumbnails/slideshows/people_foods_cats_can_eat_slideshow/1800x1200_people_foods_cats_can_eat_slideshow.jpg',
        'https://www.newshub.co.nz/dam/form-uploaded-images-ordered/2019/08/08/KNOWYOURMEME-sad-cat-crying-1120.JPG',
        'https://i.pinimg.com/originals/2f/66/ab/2f66abb007554ade8d4ee784259c1322.jpg',
        'https://i.imgflip.com/3aun8x.jpg',
        'https://cnet2.cbsistatic.com/img/S8WsucQh6wWeUG1yrQi66jKNtto=/940x0/2020/09/22/ad4bd31b-cf8c-46f5-aa70-231df9acc041/longcat.jpg',
        'https://i.pinimg.com/originals/3c/43/79/3c43793225d7167513691eb2a525df2e.jpg',
        'https://www.cathealth.com/images/how_to_take_cat_on_plane.jpg',
        'https://sadanduseless.b-cdn.net/wp-content/uploads/2018/11/funny-cat-closeup17.jpg',
        'https://i2.wp.com/metro.co.uk/wp-content/uploads/2020/02/PRI_142383130.jpg?quality=90&strip=all&zoom=1&resize=480%2C304&ssl=1',
        'https://www.cybersalt.org/images/stories/cleanlaugh/cats/catmousenightmare.jpg',
        'https://img-9gag-fun.9cache.com/photo/a7WVB9b_460s.jpg'
    ];

    let rand = Math.floor(Math.random() * images.length);

    return images[rand];
}

export default getRandomImage;

