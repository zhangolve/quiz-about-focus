// A function that you can enact on an instance of a quiz object. This function is called add_question() and takes in a Question object which it will add to the questions field.


$(function(){
    var loading = $('#loadbar').hide();  //loading bar 在打开界面后是没有的，后来有一个动画刷入这个loading bar
    $(document)                 //通过它构建了一个动画效果
    .ajaxStart(function () {  //https://api.jquery.com/ajaxStart/
        loading.show();      //显示loadbar界面。
    }).ajaxStop(function () {   //https://api.jquery.com/ajaxStop/
    	loading.hide();      //隐藏loadbar界面。
    });
        var score=0;
        var clickNum=0;
        var allQuestion=['你有多常忘记约会或应做的事？','你有多常在家里或单位将东西随手一放然后又找不到了？','要做一件费心思考的工作时，你有多常逃避或拖延去做？','要执行一个枯燥或困难的计划时，你有多常因粗心而犯错？','做枯燥而重复的工作时，你多常体验到难以持续专注？','跟别人说话时，你多常感到难以专注听清对方和你讲的内容？','一旦完成计划中最富挑战的部分你多常感到很难把收尾细节做好？','你有多常觉得很难井然有序地做一个需要好好组织规划的任务？','你有多常因为身边的活动或声音而分心？'];
        var qustionNum=['1','2','3','4','5','6','7','8','9'];       
        // add qustion 
        //$('#qid').text(qustionNum[0]);
        $('#quiz').hide();
        $('#question').hide();
        $('#testAgain').hide();
        $('#start-quiz').on('click',function(){
            $('#question').show();
            $('#quiz-start').fadeOut();
            $('#quiz').show();
        });


        $('#question').html('<span class="label label-info" id="qid"></span >'+ allQuestion[0]);
        $("#qid").html(qustionNum[0]);


    $("label.btn").on('click',function () {   //label.btn 指的是选择了某一个选项，这个时候的动作过程。
    	var theScore=$(this).find('input:radio').val();   //这里的this还是label.btn，find()查找方法，找到input中的取值。
    	    theScore=parseInt(theScore);
        score+=theScore;                                      //score分数总是成倍增加，很奇怪。
        clickNum++;
        
        
        if(clickNum>17||clickNum==17)
        {   
            
            setTimeout(function()
            { 
                $('#quiz').fadeOut();
                $('#question').fadeOut();  
            },500);
            
                
            score=score/2;
            var message;
            if(score>24||score==24)
            {
            message='非常可能有注意力缺失症（ ADHD ）';
            }
            else if(score<16||score==16)
            {
            message='不太可能有注意力缺失症(ADHD)';
            }
            else{
            message='可能有注意力缺失症(ADHD)';
            }
            $('#quiz-results-message').text(message);   //将信息显示出来。
            $('#quiz-results-score').html('你得到了<b>' + score + '</b> 分');
            $('#quiz-results').slideDown();
            $('#testAgain').show();
            $('#testAgain').on('click',function(){
                window.location.reload();
                
            });

            var shareWeibo='http://v.t.sina.com.cn/share/share.php?title=经过测试我'+message+','+'你也来测试一下吧！http://hktkdy.com/quiz-about-focus';
            var shareTwitter='http://twitter.com/home/?status=经过测试我'+message+','+'你也来测试一下吧！http://hktkdy.com/quiz-about-focus';

            $("#share").html('<p>分享到 <a href='+shareWeibo+"  target='_blank'><i class='fa fa-weibo fa-3x' aria-hidden='true'></i></a>  <a href="+shareTwitter+"  target='_blank'><i class='fa fa-twitter fa-3x' aria-hidden='true'></i></a></p>");
               

            score=0;

         }
        
        else
        {
            $('#question').slideUp();
           
            $('#loadbar').show();                             //按动按钮之后展示loadbar，loadbar就是那个转圈的动态效果。
            $('#quiz').fadeOut();                              //这时候展示的测试内容消失。
            $('#question').html('<span class="label label-info" id="qid"></span >'+ allQuestion[clickNum/2]);
            
            $("#qid").html(clickNum/2+1);
            
            setTimeout(function()
            {                             //启动一个延时函数，来重新导入相关内容。时间为1.5秒。
                $('#question').show();
                $('#quiz').show();
                $('#loadbar').fadeOut();
                                                /* something else */
            }, 500);


        }


    });

   

   
});
