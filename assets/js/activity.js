
//删除活动
function deleteActivity(e){
    //询问框

    layer.confirm('您确定删除吗？', {
        btn: ['确定','取消'] //按钮
    }, function(){
        layer.msg('删除成功');
        $(e).parent().parent().remove();
        return ;
    });

    //询问框
    // layer.confirm('您确定删除本条记录？', {
    //     btn: ['确定','取消'] //按钮
    // }, function(){
    //     $(e).parent().parent().remove();
    // });
}
layui.use('upload', function(){
    var $ = layui.jquery
        ,upload = layui.upload;

    //普通图片上传
    var uploadInst = upload.render({
        elem: '#test1'
        ,url: 'http://192.168.2.173/apis/activity/activity/upload_image',
        accept: 'file'
        ,before: function(obj){
            //预读本地文件示例，不支持ie8
            obj.preview(function(index, file, result){
                $('#demo1').attr('src', result); //图片链接（base64）
            });
        }
        ,done: function(res){
            //如果上传失败
            if(res.code > 0){
                return layer.msg('上传失败');
            }
            //上传成功
        }
        ,error: function(){
            //演示失败状态，并实现重传
            var demoText = $('#demoText');
            demoText.html('<span style="color: #FF5722;">上传失败</span> <a class="layui-btn layui-btn-xs demo-reload">重试</a>');
            demoText.find('.demo-reload').on('click', function(){
                uploadInst.upload();
            });
        }
    });

    //同时绑定多个元素，并将属性设定在元素上
    upload.render({
        elem: '.demoMore'
        ,before: function(){
            layer.tips('接口地址：'+ this.url, this.item, {tips: 1});
        }
        ,done: function(res, index, upload){
            var item = this.item;
            console.log(item); //获取当前触发上传的元素，layui 2.1.0 新增
        }
    })

    //多文件列表示例
    var demoListView = $('#demoList')
        ,uploadListIns = upload.render({
        elem: '#testList'
        ,url: '/upload/'
        ,accept: 'file'
        ,multiple: true
        ,auto: false
        ,bindAction: '#testListAction'
        ,choose: function(obj){
            var files = this.files = obj.pushFile(); //将每次选择的文件追加到文件队列
            //读取本地文件
            obj.preview(function(index, file, result){
                var tr = $(['<tr id="upload-'+ index +'">'
                    ,'<td>'+ file.name +'</td>'
                    ,'<td>'+ (file.size/1014).toFixed(1) +'kb</td>'
                    ,'<td>等待上传</td>'
                    ,'<td>'
                    ,'<button class="layui-btn layui-btn-xs demo-reload layui-hide">重传</button>'
                    ,'<button class="layui-btn layui-btn-xs layui-btn-danger demo-delete">删除</button>'
                    ,'</td>'
                    ,'</tr>'].join(''));

                //单个重传
                tr.find('.demo-reload').on('click', function(){
                    obj.upload(index, file);
                });

                //删除
                tr.find('.demo-delete').on('click', function(){
                    delete files[index]; //删除对应的文件
                    tr.remove();
                    uploadListIns.config.elem.next()[0].value = ''; //清空 input file 值，以免删除后出现同名文件不可选
                });

                demoListView.append(tr);
            });
        }
        ,done: function(res, index, upload){
            if(res.code == 0){ //上传成功
                var tr = demoListView.find('tr#upload-'+ index)
                    ,tds = tr.children();
                tds.eq(2).html('<span style="color: #5FB878;">上传成功</span>');
                tds.eq(3).html(''); //清空操作
                return delete this.files[index]; //删除文件队列已经上传成功的文件
            }
            this.error(index, upload);
        }
        ,error: function(index, upload){
            var tr = demoListView.find('tr#upload-'+ index)
                ,tds = tr.children();
            tds.eq(2).html('<span style="color: #FF5722;">上传失败</span>');
            tds.eq(3).find('.demo-reload').removeClass('layui-hide'); //显示重传
        }
    });
});
//日期选择
layui.use('laydate', function() {
    var laydate = layui.laydate;
    laydate.render({
        elem: '#test13'
        ,format: 'yyyy/MM/dd'
    });
})
layui.use('laydate', function() {
    var laydate = layui.laydate;
    laydate.render({
        elem: '#test12'
        ,format: 'yyyy/MM/dd'
    });
})