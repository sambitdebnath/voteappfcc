(function(){
    //console.log('first line bhai');
    var apiUrl="https://voteappfcc-sambitdebnath.c9users.io/api/:id";
    //console.log('panga');
    $(document).ready(function(){
        //console.log("yes");
        $.ajax({
            url:apiUrl,
            method:'GET',
            success:function(data){
                //console.log('double yes!');
                $("#display-name").html(data.displayname);
            }
        });
    });
})();