require(['jquery', 'swiper', 'bscroll', 'render'], function($, swiper, bscroll, render) {


    $.ajax({
        url: '/api/swiper',
        dataType: 'json',
        success: function(res) {
            console.log(res);
            if (res.code === 1) {
                render('#swiper-tpl', res.data, '.swiper-wrapper')
                new swiper('.swiper-container');
            }
        },
        error: function(error) {
            console.warn(error)
        }
    })

    var pagenum = 1,
        limit = 10,
        total = 0;

    var conScroll = new bscroll('.con', {
        probeType: 2,
        click: true
    })

    function getList(pagenum) {
        $.ajax({
            url: '/api/list',
            dataType: 'json',
            data: {
                pagenum: pagenum,
                limit: limit
            },
            success: function(res) {
                if (res.code === 1) {
                    render('#list-tpl', res.data, '.list-wrap', true);

                    conScroll.refresh();

                    total = res.total;

                }
            },
            error: function(error) {
                console.warn(error)
            }
        })
    }
    getList(pagenum);



    conScroll.on('scroll', function() {
        if (this.y < this.maxScrollY - 44) {
            if (pagenum < total) {
                $('.inner-con').attr('up', "释放加载更多")
            } else {
                $('.inner-con').attr('up', "暂无更多")
            }

        } else if (this.y < this.maxScrollY - 22) {
            if (pagenum < total) {
                $('.inner-con').attr('up', "上拉加载")
            } else {
                $('.inner-con').attr('up', "暂无更多")
            }
        } else if (this.y > 44) {
            $('.inner-con').attr('down', "释放刷新")
        }
    })

    conScroll.on('touchEnd', function() {
        if ($('.inner-con').attr('up') === "释放加载更多") {
            console.log("加载更多");
            if (pagenum < total) {
                pagenum++;
                getList(pagenum);
                $('.inner-con').attr('up', "上拉加载")
            } else {
                $('.inner-con').attr('up', "暂无更多")
            }

        } else if ($('.inner-con').attr('down') === "释放刷新") {
            location.reload();
        }
    })
})