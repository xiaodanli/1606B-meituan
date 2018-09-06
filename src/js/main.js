require.config({
    baseUrl: '/js/',
    paths: {
        'jquery': './libs/jquery-2.1.1.min',
        'swiper': './libs/swiper.min',
        'bscroll': './libs/bscroll',
        'handlebars': './libs/handlebars-v4.0.11',

        'index': './page/index',
        'render': './common/render'
    }
})

require(['index'])