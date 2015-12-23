(function(){
    //console.log('first line bhai');
    var apiUrl="https://voteappfcc-sambitdebnath.c9users.io";
    //console.log('panga');
    $(document).ready(function(){
        //console.log("yes");
        $.ajax({
            url:apiUrl+"/api/:id",
            method:'GET',
            success:function(data){
                //console.log('double yes!');
                $("#display-name").html(data.displayname);
            }
        });
        var choices=2;
        $("#choice-add").on("click",function(){
            var choiceHtml="<div><label>Choice</label><input type=\"text\" name=\"choice"+choices+"\"></div>";
            $("#more-choices").append(choiceHtml);
        });
        $("#add-poll").on("click",function(){
            var bodyData={},n=1;
            bodyData.polltopic=$('input[name="polltopic"').val();
            while($('input[name="choice'+n+'"]').length)
                bodyData['choice'+n]=$('input[name="choice'+n++ +'"]').val();
            //alert("yes?");
            $.ajax({
                url:apiUrl+"/home",
                method:"POST",
                data:JSON.stringify(bodyData),
                contentType:'application/json',
                success:function(data){
                    console.log(JSON.stringify(data));
                    $.ajax({
                        url:apiUrl+"/api/polls/"+data.pid,
                        method:"GET",
                        success:function(dat){
                            console.log(JSON.stringify(dat));
                        }
                    });
                }
            });
        });
    });
})();