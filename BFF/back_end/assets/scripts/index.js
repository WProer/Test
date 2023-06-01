
$(function () {
    // 加载图书信息
    getListBook();
    function getListBook() {
        $.ajax({
            url: "/books",
            type: 'get',
            dataType: "json",
            success(msg) {
                // console.log(msg);
                let html = template('template', {
                    data: msg
                });
                $('#tbody').html(html);
                editBook();
            },
            error(err) {
                console.log(err);
            }
        })
    }


    $('#add').click(function () {
        $('#myModal').modal('show');
        // 添加图书
        $('#btn_submit').off('click').click(function () {
            let data = $('#form').serialize();
            $.ajax({
                url: '/books/book',
                type: 'post',
                data: data,
                dataType: "json",
                success(msg) {
                    console.log(msg);
                    if (msg.code == 0) {
                        getListBook();
                        toastr.success('提交成功！', 'Success');
                    } else {
                        toastr.error('提交失败！', 'Error');
                    }
                },
                error(err) {
                    console.log(err);
                    toastr.error('提交失败！', 'Error');
                }
            })

            $('#myModal').modal('hide');
        })
    })




    function editBook() {
        // 修改图书信息
        $('.edit').on('click', "a:eq(0)", function () {
            $('#myModal').modal('show');
            let id = $(this).parent().siblings().eq(0).text();
            $.ajax({
                url: "/books/book/" + id,
                type: 'get',
                dataType: "json",
                success(msg) {
                    $('form').find('input[name=name]').val(msg.data.name);
                    $('form').find('input[name=author]').val(msg.data.author);
                    $('form').find('input[name=category]').val(msg.data.category);
                    $('form').find('input[name=description]').val(msg.data.description);
                },
                error(err) {
                    console.log(err);
                }
            })
            $('#btn_submit').off('click').click(function () {
                let data = $('#form').serialize();
                data += `&id=${id}`;
                $.ajax({
                    url: '/books/book',
                    type: 'put',
                    data: data,
                    dataType: "json",
                    success(msg) {
                        console.log(msg);
                        if (msg.code == 0) {
                            getListBook();
                            toastr.success('提交成功！', 'Success');
                        } else {
                            toastr.error('提交失败！', 'Error');
                        }
                    },
                    error(err) {
                        console.log(err);
                        toastr.error('提交失败！', 'Error');
                    }
                })

                $('#myModal').modal('hide');
            })
        })

        // 删除图书
        $('.edit').on('click', "a:eq(1)", function () {
            let id = $(this).parent().siblings().eq(0).text();
            let flag = confirm(`您确定要删除 id 为 ${id} 的这条数据吗？`);
            if (flag) {
                $.ajax({
                    url: '/books/book/' + id,
                    type: 'delete',
                    dataType: "json",
                    success(msg) {
                        console.log(msg);
                        if (msg.code == 0) {
                            getListBook();
                            toastr.success('删除成功！', 'Success');
                        } else {
                            toastr.error('删除失败！', 'Error');
                        }
                    },
                    error(err) {
                        console.log(err);
                        toastr.error('删除失败！', 'Error');
                    }
                })
            }

        })
    }


    $('#close').click(function () {
        $('#myModal').modal('hide')
    })

    $('#myModal').on('hidden.bs.modal', function (e) {
        // 重置表单
        $('form')[0].reset();
    })


    // 提交数据函数封装
    function submitData(url, id) {
        // console.log(data);
        let data = $('#form').serialize();
        data += id ? `&id=${id}` : ''
        $.ajax({
            url: url,
            type: 'post',
            data: data,
            dataType: "json",
            success(msg) {
                console.log(msg);
                if (msg.code == 0) {
                    getListBook();
                    toastr.success('提交成功！', 'Success');
                } else {
                    toastr.error('提交失败！', 'Error');
                }
            },
            error(err) {
                console.log(err);
                toastr.error('提交失败！', 'Error');
            }
        })

        $('#myModal').modal('hide');
    }
})